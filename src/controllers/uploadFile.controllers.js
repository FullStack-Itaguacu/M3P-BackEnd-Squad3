require("dotenv").config();
const { S3 } = require("aws-sdk");
const config = require("../config/config.server");

const s3 = new S3({
  accessKeyId:config.awsAccessKeyId,
  secretAccessKey: config.awsSecretAccessKey,
});

class UploadFilesController {
  uploadFile = async (req, res) => {
    try {

        // Obtem array de arquivos do request
        const files = req.files;
        
        // Array para guardar URLs dos arquivos uploadados
        const uploaded = [];
  
        // Loop em cada arquivo
        for(let file of files) {
  
          // Gera nome único para o arquivo
          const fileName = `${Date.now()}-${file.originalname}`;
  
          // Parameters para upload no S3
          const params = {
            Bucket: config.bucket,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
          };
  
          // Faz upload para o S3
          const data = await s3.upload(params).promise();
  
          // Salva URL do arquivo no array
          uploaded.push(data.Location);
  
        }
  
        // Retorna array com URLs dos arquivosuploadados
        res.json({
          links: uploaded
        });
  
      } catch(err) {
        console.error(err);
        res.sendStatus(500);
      }
  
    
  };
}

const uploadFilesController = new UploadFilesController();

module.exports = uploadFilesController;
