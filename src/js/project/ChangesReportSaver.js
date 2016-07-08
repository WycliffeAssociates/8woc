const fs = require(window.__base + 'node_modules/fs-extra');

var Report = {
  saveChecks: function(report, checkName) {
    //console.log(report);
    var path = window.__base + 'project/' + checkName + '/checkdata.json';
    var data = JSON.stringify(report);
    var buffer = new Buffer(data);
    fs.open(path, 'w+', function(err, fd) {
      if (err) {
        throw 'error opening file: ' + err;
      };

      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
          console.log('file written');
        });
      });
    });
  }
};
module.exports = Report;
