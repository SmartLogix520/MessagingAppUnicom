const mongoose = require("mongoose");
const Email = require("../models/Email");

  const MarkAsFavoris = async (req, res) => {
    try {
      console.log("markasfavoris")
      const id = req.params.id;
  
      // Mettez à jour le champ inTrash de 0 à 1 dans le document Email
      const updatedEmail = await Email.findByIdAndUpdate(id, { favoris: 1 }, { new: true });
  
      if (!updatedEmail) {
        return res.status(404).json({ message: 'E-mail introuvable' });
      }
  
      res.status(200).json({ message: 'Champ favoris mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champ favoris :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };
  const getFavoris = async (req, res) => {
    try {
      const emails = await Email.find({ favoris: 1, trash: 0 });
      res.status(200).json(emails);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error.message);
      res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
  };
  const getFavPaginated = async (req, res, next) => {
    try {
        const { pageNumber = 1, pageSize = 10, emailSender = '' } = req.query;
        const { user } = req.session
        const filter = { email_sender: emailSender, favoris: 1, trash:0 }

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
const DesMarkAsFavoris = async (req, res) => {
  try {
    console.log("desmarkasfavoris")
    const id = req.params.id;

    // Mettez à jour le champ inTrash de 0 à 1 dans le document Email
    const updatedEmail = await Email.findByIdAndUpdate(id, { favoris: 0 }, { new: true });

    if (!updatedEmail) {
      return res.status(404).json({ message: 'E-mail introuvable' });
    }

    res.status(200).json({ message: 'Champ favoris mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du champ favoris :', error.message);
    res.status(500).json({ message: 'Erreur Interne du Serveur' });
  }
};
  module.exports = { MarkAsFavoris, getFavoris, getFavPaginated, DesMarkAsFavoris  };
  