// dependencies

const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname, "/../.data/");

lib.create = (dir, file, data, cb) => {
  // open file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // write data to file and close it

        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                cb(false);
              } else {
                cb("error closing the new file");
              }
            });
          } else {
            cb("error writing to new file");
          }
        });
      } else {
        cb("Could not create a new file . It may exists!");
      }
    }
  );
};

lib.read = (dir, file, cb) => {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      cb(err, data);
    }
  );
};

lib.update = (dir, file, data, cb) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);

        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            //  write to the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    cb(false);
                  } else {
                    cb("error closing the file");
                  }
                });
              } else {
                cb("error while updating to the file");
              }
            });
          } else {
            console.log("Error truncation file");
          }
        });
      } else {
        cd("Error while updating file.FIle may not exists");
      }
    }
  );
};
lib.delete = (dir, file, cb) => {
  fs.unlink(
    lib.baseDir + dir + "/" + file + ".json",

    (err) => {
      if (!err) {
        cb(false);
      } else {
        cb(true);
      }
    }
  );
};

module.exports = lib;
