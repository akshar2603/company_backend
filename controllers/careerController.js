import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables from a `.env` file
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME, // Cloudinary cloud name from .env
  api_key: process.env.APIKEY, // Cloudinary API key from .env
  api_secret: process.env.APISECRETKEY, // Cloudinary API secret from .env
});

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lakhankiya-inovation-resumes', // Folder name in Cloudinary
    allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'], // Allowed file formats
    resource_type: 'raw', // Use 'raw' for non-image files
    public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`, // Custom file name
  },
});

// Create Multer instance with file size limit and file filter options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size: 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, and PNG are allowed.'));
    }
    cb(null, true);
  },
});

// Function to handle form submission
const submitCareerApplication = (req, res) => {
  
  const { role } = req.body;

  if (!role || !req.file) {
    return res.status(400).json({ error: 'Role and resume are required.' });
  }

  console.log(req.body)

  // console.log('Role:', role);
  // console.log('Uploaded File URL:', req.file.path); // Cloudinary file URL
  // console.log('Uploaded File Public ID:', req.file.filename);

  return res.status(200).json({
    message: 'Resume submitted successfully!',
    fileUrl: req.file.path, // URL to the file in Cloudinary
    publicId: req.file.filename, // Cloudinary public ID
  });
};

// Function to handle file download request
const downloadResume = async (req, res) => {
  const { publicId } = req.params;

  try {
    const fileUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      attachment: true, // Forces download
    });
    res.redirect(fileUrl); // Redirect to Cloudinary URL for download
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating download link.' });
  }
};

export { upload, submitCareerApplication, downloadResume };
