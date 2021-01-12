/*
AUTHOR: Devin Davis
DATE: January 11th, 2021
FILE:uploadMiddleware.js
*/
import multer from 'multer';

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

export default upload;