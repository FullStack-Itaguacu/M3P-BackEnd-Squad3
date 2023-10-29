const {Router} = require("express")
const uploadFilesController = require("../../controllers/uploadFile.controllers")
const auth = require('../../middlewares/auth');
const acessControl = require('../../middlewares/accessControlMiddleware');
const multer = require('multer');
const typeUserEnum = require("../../constants/enums/typeUserEnum");

const upload = multer({storage: multer.memoryStorage() });








const router = Router()


router.post('/upload', 
  auth,
  acessControl(typeUserEnum.ADMIN),
  upload.array('image'), 
  uploadFilesController.uploadFile
);





module.exports = router

