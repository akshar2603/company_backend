import multer from 'multer';
import path from 'path';

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize file name
    cb(null, `${Date.now()}-${cleanFileName}`); // Use timestamp + sanitized name
  },
});

// Create multer instance with file size limit and file filter options
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
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
    }
    cb(null, true);
  },
});

// Function to handle form submission
const submitCareerApplication = (req, res) => {
  // Access the form data
  const { role } = req.body;

  // Check if role and file are provided
  if (!role || !req.file) {
    return res.status(400).json({ error: 'Role and resume are required.' });
  }

  // Log role and uploaded file details
  console.log('Role:', role);
  console.log('Uploaded File:', req.file);
  console.log("its done to upload ")
  console.log(req.file.filename)
  // Respond with success message
  return res.status(200).json({
    message: 'Resume submitted successfully!',
    filePath: req.file.path,
    fileName: req.file.filename,
  });
};

// Function to handle file download request
const downloadResume = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error downloading the file.' });
    }
  });
};

export { upload, submitCareerApplication, downloadResume };
