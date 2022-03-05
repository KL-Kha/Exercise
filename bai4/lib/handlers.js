exports.newsletter = (req, res) => {
  res.render("newsletter", { csrf: "CSRF token goes here" });
};

exports.api = {
  newsletterSignup: (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log("CSRF token (from hidden form field): " + req.body._csrf);
    console.log("Name (from visible form field): " + req.body.name);
    console.log("Email (from visible form field): " + req.body.email);
    res.send({ result: "success" });
  },
  vacationPhotoContest: (req, res, fields, files) => {
    console.log("field data: ", fields);
    console.log("files: ", files);
    res.send({ result: "success" });
  },
  uploadedImages: (req, res, fields, files) =>{
    console.log("field data: ", fields);
    console.log("files: ", files);
    res.send({ result: "success" });
  },
  uploadedImagesError: (req, res, error)=>{
    console.log("error: ", error);
    res.send({ result: "success" });
  }
};

exports.vacationPhotoContestAjax = (req, res) => {
  res.render("vacation-photo-ajax");
};
