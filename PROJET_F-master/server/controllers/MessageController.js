const mongoose = require("mongoose");
const Message = require("../models/Message");
const Group = require("../models/Group");
const User = require("../models/User");

const SendMessage = async (req, res) => {
  try {
      const msg = new Message(req.body);
      await msg.save();
      res.status(200).json(msg);
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
  }
}


// Permet d'envoyer un message instantané
const SendNoSocketMessage = async (req, res) => {
  try {
        const usr = new User(req.body);
        usr.save();
        res.status(200).json(usr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un message instantané
const DeleteMessage = async (req, res) => {
  try {
    console.log(req.params.id)
    const filter = { 
      _id: new mongoose.Types.ObjectId(req.params.id) 
    }
    await Message.findOneAnd(filter);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const DeleteAll = async (req, res) => {
  try {
    console.log(req.params.id)
    
    await Message.deleteMany({})
    res.status(200).send({message: "Success"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la conversation entre deux utilisateurs
const GetConversation = async (req, res) => {
  try {
    const filter = { conversation_id: req.query.conversation_id };         
    result = await Message.find(filter); 
    res.send(result);
  } catch (error) { 
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupérer la conversation entre deux utilisateurs
const GetAll = async (req, res) => {
  try {
    let result = await Message.find();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// Récupérer un utilisateur grâce à son identifiant de document
const GetOne = async (req, res) => {
  try {
    let filter = { _id: new mongoose.Types.ObjectId(req.params.id) };
    let result = await User.findOne(filter);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};






///////////////////////////////// GROUP ////////////////////////////////////
const SendMessageToGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const messageContent = req.body.messageContent;

    // Vérifier si le groupe existe en utilisant son ID
   if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ message: 'Invalid group ID format.' });
  }



    // Vérifier si le groupe existe en utilisant son ID
    const filter = {
      _id: new mongoose.Types.ObjectId(groupId),
    };

    const group = await Group.findOne(filter);

    if (!group) {
      return res.status(404).json({ message: 'Group not found.' });
    }

    // Créer le message pour le groupe
    const newMessage = new Message({
      sender_id: req.body.sender_id, // Utiliser l'expéditeur fourni dans la requête
      receiver_id: groupId, // L'identifiant du groupe sera le récepteur
      content: messageContent,
      // sender_name: sender.username,
      group_id: groupId, // Ajouter l'identifiant du groupe dans le message
    });
    console.log('Message créé');

    // Enregistrer le message dans la base de données
    await newMessage.save();

    // Ajouter ce message au groupe
    group.messages.push(newMessage);
    await group.save();

    res.status(200).json({ message: 'Message sent to the group successfully.' });
  } catch (error) {
    console.error('Error sending message to the group:', error);
    res.status(500).json({ message: 'Failed to send message to the group.' });
  }
};

const GetOneGroup = async (req, res) => {
  try {
    console.log("je suis ici")
    const groupId = req.params.id;
    console.log(groupId)
    
    // Vérifier si l'ID du groupe est valide
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      console.log("id erroné")
      return res.status(400).json({ message: 'ID de groupe invalide.' });
    }

    const filter = { 
      _id: new mongoose.Types.ObjectId(groupId) 
    };

    const result = await Group.findOne(filter);
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};



const CreateGroup = async (req, res) => {
  try {
    console.log(req.session.user.username);
    const { groupName, members } = req.body;

    // Assurez-vous que members est un tableau non vide
    if (!members || members.length === 0) {
      return res.status(400).json({ message: "Members array is required and should not be empty." });
    }
    const username = req.session.user.username; // Vous devez implémenter cette fonction pour obtenir l'ID de l'utilisateur à partir du token
    console.log(username)
    const membersArray = Array.isArray(members) ? members : [members];
    
    membersArray.push(username);
    console.log(membersArray)
    // Mappez les usernames aux IDs correspondants
    const membersIDs = await Promise.all(
      membersArray.map(async (username) => {
        const user = await User.findOne({ username }); // Supposons que votre modèle User est appelé User
        if (user) {
          return user.username; // Ajoutez l'ID de l'utilisateur au tableau
        } else {
          throw new Error("User with username '${username}' not found.");
        }
      })
    );

    // Créez le nouveau groupe avec les membres en utilisant leurs IDs
    const newGroup = new Group({ name: groupName, members: membersIDs });
    await newGroup.save();
    await User.updateMany({ username: { $in: membersArray  } }, { $push: { groups: newGroup._id } });

    res.status(200).json(newGroup);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  };
}
const RenameGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { newGroupName } = req.body;

    // Assurez-vous que newGroupName est fourni
    if (!newGroupName) {
      return res.status(400).json({ message: "Le nouveau nom du groupe est requis." });
    }

    // Vérifiez si le groupe existe
    const existingGroup = await Group.findById(groupId);
    if (!existingGroup) {
      return res.status(404).json({ message: "Le groupe n'existe pas." });
    }

    // Renommez le groupe
    // existingGroup.groupName = newGroupName;
    // await existingGroup.save();

    await Group.findByIdAndUpdate(groupId, { groupName: newGroupName });
    
    return res.json({ message: `Le groupe a été renommé "${newGroupName}"` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Récupération de tous les groupes
const GetAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Récupération des membres d'un groupe
const GetGroupMembers = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
     console.log(req.params.id)
    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé' });
    }

    res.status(200).json(group.members);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const GetUserGroups = async (req, res) => {
  try {
    const userId = req.session.user._id;
    

    // Récupérer l'utilisateur avec la liste des identifiants des groupes
    const user = await User.findById(userId).populate('groups');

    // Récupérer les détails de chaque groupe
    const groupDetails = await Promise.all(
      user.groups.map(async (groupId) => {
        const groupInfo = await Group.findById(groupId);
        return groupInfo;
      })
    );

    res.status(200).json(groupDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


const getGroupMessages = async (req, res) => {
  try {
    const groupId = req.params.id;
    console.log(req.params.id);
    console.log("messages")
    const groupMessages = await Message.find({ group_id: groupId });

    res.status(200).json({ messages: groupMessages });
  } catch (error) {
    console.error('Error getting group messages:', error);
    res.status(500).json({ message: 'Failed to get group messages.' });
  }
};

// Ajout d'un membre à un groupe
const AddMemberToGroup = async (req, res) => {
  try {
    console.log("heloooo")
    const groupId = req.params.id;
    const username = req.body.username;
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: 'Invalid group ID format.' });
      // console.log("groupNotFound");
    }
    console.log('Recherche du groupe avec ID :', groupId);
    const updatedGroup = await Group.findByIdAndUpdate(
      { _id: groupId },
      { $addToSet: { members: username } },
      { new: true }
    );  
    console.log(updatedGroup);
    

    if (!updatedGroup) {
      return res.status(404).json({ message: 'Groupe non trouvé' });
    }

    await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { groups: updatedGroup._id } ,}
      // groupId,
      // { $addToSet: { members: username }, $set: { lastJoinedMember: username } }, // Ajoutez le nouveau membre et mettez à jour le dernier membre rejoint
      // { new: true }
    );

    console.log("user add", User)

    console.log('Groupe mis à jour :', updatedGroup);
   
    res.status(200).json(updatedGroup.members);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// Fonction pour enregistrer le message dans la base de données MongoDB
// const saveMessageToDatabase = async (messageContent) => {
//   try {
//     const { messageContent } = req.body;
    
//     const message = new Message({
//       content: messageContent
//     });
//     await message.save();

//     res.status(201).json({ message: 'Message enregistré avec succès.' });
//   } catch (error) {
//     console.error('Erreur lors de l\'enregistrement du message :', error.message);
//     res.status(500).json({ message: 'Erreur interne du serveur lors de l\'enregistrement du message.' });
//   }
// };

// // Fonction pour récupérer le dernier message depuis la base de données MongoDB
// const getLastMessageFromDatabase = async (req, res) => {
//   try {
//     // Votre logique pour récupérer le dernier message depuis la base de données

//     const lastMessage = await Message.findOne().sort({ _id: -1 });
//     const content = lastMessage ? lastMessage.content : null;
//     res.status(200).json({ lastMessage: content });
//   } catch (error) {
//     console.error('Error fetching last message from database:', error.message);
//     res.status(500).json({ message: 'Erreur interne du serveur lors de la récupération du dernier message.' });
//   }
// };


// Suppression d'un message d'un groupe
const DeleteGroupMessage = async (req, res) => {
  try {
    console.log("heloooo");
    const messageId = req.params.id;
    const groupId = req.body.groupId;

    // Assurez-vous que le message appartient au groupe spécifié
    const deletedMessage = await Message.findByIdAndDelete({
      _id: messageId,
      group_id: groupId
    });

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message non trouvé ou ne fait pas partie du groupe spécifié' });
    }
    console.log("msg deleted");
    res.status(200).json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    console.log('Erreur lors de la suppression du message :', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const removeMemberFromGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const username = req.body.username;
    console.log('hiiiii');
    

    const group = await Group.findById(groupId);
 console.log(group)
    if (!group) {
      return res.status(404).json({ message: 'Groupe non trouvé' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
console.log('helloo')
    // Vérifier si l'utilisateur est membre du groupe
    if (!group.members.includes(username)) {
      return res.status(400).json({ message: 'Utilisateur non membre du groupe' });
    }
    const userGroupIndex = user.groups.indexOf(groupId);
    if (userGroupIndex !== -1) {
      user.groups.splice(userGroupIndex, 1);
    }
     // Enregistrer les modifications apportées à l'utilisateur dans la base de données
     await user.save();

         // Vérifier si l'utilisateur est membre du groupe
    if (!group.members.includes(username)) {
      return res.status(400).json({ message: 'Utilisateur non membre du groupe' });
    }

    // Supprimer l'utilisateur du groupe
    const index = group.members.indexOf(username);
    group.members.splice(index, 1);
    const updatedGroup = await group.save();
    console.log(group)
    res.status(200).json(updatedGroup.members);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur lors de la suppression du membre du groupe' });
  }
};





// Exporter les methodes du module
module.exports = {getGroupMessages,RenameGroup,SendMessage,GetOneGroup,SendMessageToGroup,removeMemberFromGroup,CreateGroup,GetAllGroups,GetGroupMembers,AddMemberToGroup, DeleteGroupMessage, DeleteMessage, GetConversation, GetOne, GetAll,GetUserGroups, DeleteAll};
