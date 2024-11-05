const Email = require('../models/Email');

const getDrafts = async (req, res) => {
    try {
      const emails = await Email.find({ draft: 1, sent:0 });
      res.status(200).json(emails);
    } catch (error) {
      console.error('Erreur lors de la récupération des brouillons :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };
  

const MarkAsDraft = async (req, res) => {
    try {
      // Créez une nouvelle instance de l'e-mail en définissant draft à 1
      const emails = new Email({ ...req.body, draft: 1, sent:0 });
      
      // Enregistrez l'e-mail
      await emails.save();
  
      res.status(200).json(emails);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
const updateDraft = async (req, res) => {
    try {
        const { id } = req.params; // Change 'emailId' to 'id'
        const updateDraft = await Drafts.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateDraft) {
            return res.status(404).json({ message: 'Brouillon non trouvé' });
        }
        res.json({ draft: updateDraft, message: 'Brouillon modifié avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification du brouillon', error: error.message });
    }
};

const getDraftsPaginated = async (req, res, next) => {
    try {
        const { pageNumber = 1, pageSize = 10, emailSender = '' } = req.query;
        const filter = {email_sender : emailSender, draft: 1, trash: 0, sent: 0}

        const totalPages = Math.ceil(
            (await Email.countDocuments(filter) / pageSize
        ));

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

module.exports = { getDrafts, updateDraft, getDraftsPaginated, MarkAsDraft };
