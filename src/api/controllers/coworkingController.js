// controllers/coworkingController.js
const { deleteFile } = require("../../utils/deleteFile");
const Coworking = require('../models/coworkingSpace');

// Obtener todos los coworkings
const getAllCoworkings = async (req, res) => {
    try {
        const coworkings = await Coworking.find();
        res.status(200).json(coworkings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un coworking por ID
const getCoworkingById = async (req, res) => {
    try {
        const coworking = await Coworking.findById(req.params.id);
        if (!coworking) return res.status(404).json({ message: 'Coworking not found' });
        res.status(200).json(coworking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo coworking
const createCoworking = async(req, res, next) => {
    const coworking = new Coworking(req.body);
    try {
  
      if (req.file) {
          coworking.image = req.file.path; 
      }
  
      const savedCoworking = await coworking.save();
        res.status(201).json(savedCoworking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  }
  

// Actualizar un coworking por ID
const updateCoworking = async (req, res) => {
    try {
        const coworking = await Coworking.findById(req.params.id);
        if (!coworking) return res.status(404).json({ message: 'Coworking not found' });

        // Si hay una nueva imagen en la solicitud
        if (req.file) {
            // Elimina la imagen anterior si existe
            if (coworking.image) {
                deleteFile(coworking.image);
            }

            // Guarda la nueva URL de la imagen en el campo `image`
            coworking.image = req.file.path;
        }

        // Actualiza los otros campos en el documento
        Object.assign(coworking, req.body);

        const updatedCoworking = await coworking.save();
        res.status(200).json(updatedCoworking);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el espacio de coworking", error: error.message });
    }
};

// Eliminar un coworking por ID
const deleteCoworking = async (req, res) => {
    try {
        const deletedCoworking = await Coworking.findByIdAndDelete(req.params.id);

        if (!deletedCoworking) {
            return res.status(404).json({ message: 'Coworking not found' });
        }

        // Elimina la imagen de Cloudinary si existe una URL
        if (deletedCoworking.image) {
            deleteFile(deletedCoworking.image);
        }

        res.status(204).json(); // Respuesta sin contenido, ya que se ha eliminado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCoworkings,
    getCoworkingById,
    createCoworking,
    updateCoworking,
    deleteCoworking
}
