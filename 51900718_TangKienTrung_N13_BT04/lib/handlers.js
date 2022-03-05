exports.api = {
  uploadedImages: (req, res, fields, files) => {
    files = files["image-uploaded"];
    fields = fields['image-note'];
    const fs = require("fs");
    const path = require("path");

    const directoryPath = path.join(__dirname, "../public/upload/img");

    const scanDir_Promise = new Promise((resolve, reject) => {
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          reject("Unable to scan directory: " + err.message);
        }

        let max_current_img_ID = 0;

        files.forEach(function (file) {
          const file_name = path.parse(file).name;
          if (parseInt(file_name.slice(3)) > max_current_img_ID) {
            max_current_img_ID = parseInt(file_name.slice(3));
          }
        });

        resolve(max_current_img_ID);
      });
    });

    scanDir_Promise.then(max_current_img_ID => {
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

        max_current_img_ID = max_current_img_ID + 1;

        const new_img_name = './public/upload/img/img' + max_current_img_ID + path_file_name.ext;
        const new_txt_name = './public/upload/notes/img' + max_current_img_ID + '.txt';

        fs.writeFile(new_txt_name, fields[i], function (err) {
          if (err) return console.log(err);
        });

        fs.copyFile(files[i].path, new_img_name, err => {
          if (err) {
            console.log(err);
          } else {
            fs.unlink(files[i].path, () => {
              return;
            });
            console.log("Rename and move image to folder successfully !!");
          }

        });
      }
    }).catch(err => {
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
  showImageGallery: () => {
    const fs = require("fs");
    const path = require("path");
    const directoryImagePath = path.join(__dirname, "../public/upload/img");
    const directoryNotesPath = path.join(__dirname, "../public/upload/notes");

    const readImage = new Promise((resolve, reject) => {
      fs.readdir(directoryImagePath, function (err, files) {
        if (err) {
          reject("Unable to scan directory: " + err.message);
        }
        resolve(files);
      });
    })

    const readNotes = new Promise((resolve, reject) => {
      fs.readdir(directoryNotesPath, function (err, files) {
        if (err) {
          reject("Unable to scan directory: " + err.message);
        }

        var notes = [];

        for (let i = 0; i < files.length; i++) {
          const file_name = directoryNotesPath + "/" + files[i];

          try {
            const data = fs.readFileSync(file_name, 'utf8')
            notes.push(data);
          } catch (err) {
            reject(err);
          }
        }

        resolve(notes);
      });
    })
    
    return Promise.all([readImage, readNotes]);
  }
};

function isFileImage(file) {
  const acceptedImageTypes = [".gif", ".jpg", ".png", ".bmp", ".jpeg"];

  return acceptedImageTypes.includes(file);
}
