
var FM = (function() {
  const fs = require('fs');

  return {
    uploadedFile: null,
    uploadedFileContent: null,

/**
 * @description: This function reads a file and returns the text that is
 *               contained within the file.
 * @author: Ian Hoegen
 * @param {string} file - A filepath that is chosen by a user
 * @param {function} callback - A callback function to be executed after reading
 * @param {string} source - The file path that the file is from
 ******************************************************************************/
    readFile: function(file, callback, source) {
      var inputFile = fs.readFileSync(file).toString();
      callback(inputFile, source);
    }
  };
}
)();
module.exports = FM;
