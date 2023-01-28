module.exports = {
  saveFile: async (req, res, next) => {
    let file = req.files.file.name;
    let filename = new Date().valueOf() + "_" + file;
    req.files.file.mv(`./uploads/${filename}`);
    req.body["image"] = filename;
    next();
  },

  saveFiles: async (req, res, next) => {
    let files = req.files.files;
    let fileNames = [];
    files.forEach((file) => {
      let filename = new Date().valueOf() + "_" + file.name;
      fileNames.push(filename);
      file.mv(`./uploads/${filename}`);
    });
    req.body["images"] = fileNames.join(",");
    next();
  },
};
