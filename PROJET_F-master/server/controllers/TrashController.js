const Email = require('../models/Email');
const mongoose = require("mongoose");

const MoveToTrash = async (req, res) => {
    try {
      console.log("moveToTrash")
      const id = req.params.id;
  
      // Mettez à jour le champ inTrash de 0 à 1 dans le document Email
      const updatedEmail = await Email.findByIdAndUpdate(id, { trash: 1 }, { new: true });
  
      if (!updatedEmail) {
        return res.status(404).json({ message: 'E-mail introuvable' });
      }
  
      res.status(200).json({ message: 'Champ inTrash mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ inTrash :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };
  
  
  const getTrashes = async (req, res) => {
    try {
      const emails = await Email.find({ trash: 1 });
      res.status(200).json(emails);
    } catch (error) {
      console.error('Erreur lors de la récupération des brouillons :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };
const deleteEmail = async (req, res) => {
    try {
        const id = req.params.id;

        // Vérifier si l'e-mail existe dans la corbeille
        const email = await Email.findById(id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found in the trash' });
        }

        // Supprimer définitivement l'e-mail de la collection "trashes"
        await Email.findByIdAndDelete(id);

        res.json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getTrashPaginated = async (req, res, next) => {
    try {
        const { pageNumber = 1, pageSize = 10, emailSender = '' } = req.query;
        const { user } = req.session
        const filter = { email_sender: emailSender, trash: 1 }

        const totalPages = Math.ceil(
            (await Email.countDocuments(filter)) / pageSize
        );

        let emails = await Email.find(filter)
            .limit(pageSize * 1)
            .skip((pageNumber - 1) * pageSize)
            .sort({ sending_date: -1 });

        return res.status(200).send({
            totalPages,
            emails,
            page: pageNumber,
        });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
// Restaurer un email depuis la corbeille
const RestoreFromTrash = async (req, res) => {
    try {
      const emailId = req.params.id;
  
      // Mettez à jour le champ trash de 1 à 0 dans le document Email
      const updatedEmail = await Email.findByIdAndUpdate(emailId, { trash: 0 }, { new: true });
  
      if (!updatedEmail) {
        return res.status(404).json({ message: 'E-mail introuvable' });
      }
  
      res.status(200).json({ message: 'Champ trash mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ trash :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };

module.exports = {
    getTrashPaginated,
    getTrashes,
    deleteEmail,
    MoveToTrash,
    RestoreFromTrash
};
