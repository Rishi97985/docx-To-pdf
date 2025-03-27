const express = require('express');
const multer = require('multer');
var docxToPDF = require('docx-pdf');


const app = express()
const port = 3000

//setting up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/profile', upload.single('file'),  (req, res, next) => {
    try {
        docxToPDF('./input.docx','./output.pdf',function(err,result){
            if(err){
              console.log(err);
            }
            console.log('result'+result);
          });

    } catch (error) {
        console.log(error);
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})