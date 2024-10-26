const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CoworkingSpaces',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  },
});

const customCloudinaryStorage = (folder = 'DefaultFolder') => {
  const storage = new CloudinaryStorage({
      cloudinary,
      params: {
          folder: folder, // Carpeta dinámica
          allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      },
  });

  return multer({ storage });
};

const upload = multer({ storage });

module.exports = { upload, customCloudinaryStorage }
