import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadonCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)return null
       const respone = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file has been uploaded succesfully
        console.log("file is uploaded on cloudinary",
        response.url);//after upload url
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the file
        return null;
    }
}
export {uploadonCloudinary}