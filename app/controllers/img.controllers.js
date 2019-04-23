var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var image=require('../model/img.model')
var RandomString = require('randomstring');

exports.busboy_upload = (req, res) => {
    var busboy = new Busboy({ headers:req.headers });
    
    busboy.on('file', (fieldname, file, filename) => {
        file_name=RandomString.generate(7)+".png"
        var filepath = path.join('./image', file_name);
        console.log('Uploading your file to: ' + filepath);
        file.pipe(fs.createWriteStream(filepath));
        const data = new image({
            url:filepath,
            fileName:file_name
     
         })
         data.save().then((response)=>
         {
             res.json(" upload done")
         }).catch((err)=>
         {
             res.json({message:err})
         })
         
    });
    busboy.on('finish', function() {
        console.log('Upload complete');
      });
    return req.pipe(busboy);

}
exports.upload_64=function(req, res){
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var filename = RandomString.generate(7)
    let extension, lowerCaseData = base64Data.toLowerCase();
    if(lowerCaseData.indexOf('png') !== -1){
        extension = '.png'
    }else if(lowerCaseData.indexOf('jpg') !== -1){
        extension = '.jpg'
    }else if(lowerCaseData.indexOf('jpeg') !== -1){
        extension = '.jpeg'
    }
    fs.writeFile('./image/' + filename + extension, base64Data, 'base64', function (err) {
        
        const data = new image({
            url:'/image/' + filename + extension,
            fileName:filename
     
         })   
                
      

        data.save(function(err){
            if(err){
                res.json(err);
            }
        else
        {
            res.json('file uploaded using base64')
        }
        });
    });
}
