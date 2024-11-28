const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  });

  const uploadFile = async (fileName, bucketName) => {
    
    const fileContent = fs.readFileSync(fileName);
    const folderName = 'afw-abhijit';
    const fileNewName=`${new Date().getTime()}-${fileName}`;
    
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/${fileNewName}`,
      Body: fileContent,
    };
    
    await s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
      }
    });

  };
  const bucketName = process.env.AWS_BUCKET || 'afw-finaltsr-fs-bucket';
  const file="Men's all-around highlights _ Tokyo Replays.mp4";
  uploadFile(file, bucketName);