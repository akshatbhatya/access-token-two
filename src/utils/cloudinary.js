import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

const fileUploder = async (uploadLocalFile) => {
  try {
    const response = await cloudinary.uploader.upload(uploadLocalFile, {
      resource_type: 'auto',
    });
    fs.unlinkSync(uploadLocalFile);
    return response;
  } catch (error) {
    fs.unlinkSync(uploadLocalFile);
  }
};

export default fileUploder;
