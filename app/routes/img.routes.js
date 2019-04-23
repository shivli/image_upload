module.exports=(app)=>{
    const upload_img=require('../controllers/img.controllers.js');
    app.post('/upload', upload_img.busboy_upload);
    app.post('/base64', upload_img.upload_64);
}