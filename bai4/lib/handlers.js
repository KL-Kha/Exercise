exports.newsletter = (req, res) => {
  res.render("newsletter", { csrf: "CSRF token goes here" });
};

exports.vacationPhotoContestAjax = (req, res) => {
  res.render("vacation-photo-ajax");
};

exports.api = {
  // newsletterSignup: (req, res) => {
  //   console.log(req.body);
  //   console.log(req.params);
  //   console.log("CSRF token (from hidden form field): " + req.body._csrf);
  //   console.log("Name (from visible form field): " + req.body.name);
  //   console.log("Email (from visible form field): " + req.body.email);
  //   res.send({ result: "success" });
  // },
  // vacationPhotoContest: (req, res, fields, files) => {
  //   console.log("field data: ", fields);
  //   console.log("files: ", files);
  //   res.send({ result: "success" });
  // },
  uploadedImages: (req, res, fields, files) => {
    console.log("field data: ", fields);
    console.log("files: ", files);

    files = files["image-uploaded"];
    fields = fields['image-note'];
    const fs = require("fs");
    const path = require("path");

    const directoryPath = path.join(__dirname, "../public/upload/img");

    const scanDir_Promise = new Promise( (resolve, reject)=>{
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          reject(console.log("Unable to scan directory: " + err.message));
        }
        
        let max_current_img_ID = 0;

        files.forEach(function (file) {
          const file_name = path.parse(file).name;
          if ( parseInt(file_name.split('_')[1]) > max_current_img_ID ){
            max_current_img_ID = parseInt(file_name.split('_')[1]);
          }
        });

        resolve(max_current_img_ID);
      });
    });
    
    scanDir_Promise.then( max_current_img_ID =>{
      for (let i = 0; i < files.length; i++) {
        const path_file_name = path.parse(files[i].originalFilename);
        
        if (!isFileImage(path_file_name.ext)) {
          res.send({
            code: -1,
            status: false,
            result:
              "Failed to upload images ! Unsupported file extension found !",
          });
          return;
        }
        console.log("Max id in for loop :" + max_current_img_ID);
        max_current_img_ID = max_current_img_ID + 1;
        
        const new_img_name = './public/upload/img/image_' + max_current_img_ID + path_file_name.ext;
        const new_txt_name = './public/upload/notes/image_' + max_current_img_ID + '.txt';
        
        fs.writeFile(new_txt_name, fields[i], function (err) {
          if (err) return console.log(err);
          console.log('Hello World > helloworld.txt');
        });
        
        fs.copyFile(files[i].path, new_img_name, err=>{
          if ( err ){
            console.log(err);
          } else {
            fs.unlink(files[i].path, ()=>{
              return;
            });
            console.log("Rename and move image to folder successfully !!");
          }
          
        });
      }
    }).catch (err =>{
      console.log(err)
    });

    

    res.send({
      code: 0,
      status: true,
      result: "Upload images successfully !!!",
    });
  },
  uploadedImagesError: (req, res, error) => {
    res.send({ code: -1, status: false, result: "failed to upload images" });
  },
};

function isFileImage(file) {
  const acceptedImageTypes = [".gif", ".jpg", ".png", ".bmp",".jpeg"];

  return acceptedImageTypes.includes(file);
}
