/**
 * @author Evan "Vegan and Proud" Wiederspan
 * This function will generate and display a report when called. It first opens
 * a local report template HTML file, reads that text into a Node object, then renders
 * the gathered JSX from the Report class into that page and saves it to another file in the root
 * directory of the project. Using electron-remote, that file is then opened in a new window
 * where the user can then save the rendered report. The main reason it was done this way is
 * that I wanted the report to be displayed in a new Browser window, but browser windows live in
 * separate threads and do not have access to each other's data without a lot of hacky code. Originally
 * I wanted the new window to open and then populate itself, but it did not have access to any of the
 * stores or modules from the other thread. Doing it this way, the data was able to be generated from the
 * main renderer process while still being able to be displayed in a separate window.
**/

const React = require("react");
const ReactDOM = require("react-dom");
const ReactBootstrap = ModuleApi.ReactBootstrap;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const fs = require('fs');
const {BrowserWindow} = require('electron').remote;
const {ipcRenderer} = require('electron');
const path = require('path');
// listener event from the main process listening for the report window closing
ipcRenderer.on("report-closed", (event, path) => {
  reportOpened = false;
});
// boolean to keep track of if a report window is currently open
let reportOpened = false;

class Report extends React.Component {
  constructor() {
    super();
  }

  render() {
    // get all of the checks associated with this project
    const listOfChecks = ModuleApi.getDataFromCommon("arrayOfChecks");
    const targetLang = ModuleApi.getDataFromCommon("targetLanguage");
    if (!listOfChecks) {
      return (<div>{"No project data for checks found"}</div>);
    }
    if (!targetLang) {
      return (<div>{"No target language found"}</div>);
    }
    // array of the functions in the ReportView.js's for the project
    let reportViews = [];
    for (let i in listOfChecks){
      let check = listOfChecks[i];
      try {
        let reportView = require(path.join(check.location, "ReportView"));
        if (typeof reportView == "function") {
          reportViews.push(reportView);
        }
      }
      catch(e) {
        // silently fail, this will probably happen a lot
      }
    }
    if (reportViews.length == 0) {
      return (<div>{"No report views found"}</div>);
    }
    // array of JSX to be rendered
    // loop through all verses and chapters in the target language
    // and pass them into the ReportView functions
    let output = [];
    let bookName = "-bookName-";
    let authors = "-authors-";
    let manifest = ModuleApi.getDataFromCommon("tcManifest");
    if (manifest && manifest.ts_project) {
      bookName = manifest.ts_project.name || "-bookName-";
    }
    // This isn't working yet I think, so it pretty much always returns "various checkers"
    if (manifest && manifest.checkers) {
      if (manifest.checkers.length > 1) {
        authors = manifest.checkers.reduce((prev, cur, i) => {
          return (i == 0 ? "" : prev + ", ") + cur.username;
        });
      }
      else if (manifest.checkers.length == 1) {
        authors = manifest.checkers[0].username;
      }
      else {
        authors = "various checkers";
      }
    }
    // render report header data from reportViews
    for (let view in reportViews) {
      let viewResult = reportViews[view](0,0);
      if (viewResult) {
        output.push(<span key={`0-0-${view}`}>{viewResult}</span>);
      }
    }
    for (let ch in targetLang) {
      // skip if its not a chapter (key should be a number)
      if (/^[0-9]+$/.test(ch) == false) {
        continue;
      }
      // create chapter header
      output.push(<h3 key={`${ch}-header`}>{`${bookName} ${ch}`}</h3>);
      for (let view in reportViews) {
        let viewResult = reportViews[view](ch, 0);
        if (viewResult) {
          output.push(<span key={`${ch}-header-${view}`}>{viewResult}</span>);
        }
      }
      // now start getting data for each verse in the chapter
      for (let v in targetLang[ch]) {
        let reports = [];
        for (let view in reportViews) {
          let viewResult = reportViews[view](ch, v);
          if (viewResult) {
            reports.push(<span key={`${ch}-${v}-${view}`}>{viewResult}</span>);
          }
        }
        // only display a row for this verse if it has report view data
        if (reports.length > 0) {
          output.push(<Row key={`${ch}-${v}`}><Col xs={3}><h4>{`${ch}:${v}`}</h4></Col><Col xs={9}>{reports}</Col></Row>);
        }
      }
    }
    // TODO: Get name of book and authors
    return (
      <div className="page-header">
      <h1>{`Report for ${bookName} `}<small>{"By " + authors + ", created on " + new Date().toDateString()}</small></h1>
      {output}
      </div>
    );
  }
}

module.exports = function(callback = (err) => {}) {
  // don't run if a report is already open
  if (reportOpened) {
    ipcRenderer.send('open-report', "");
    return;
  }
  fs.readFile("./src/js/components/core/reports/report-template.html", 'utf-8', (err, data) => {
    if (err) {
      // These errors should not happen
      console.log(err, "Report template seems to be missing");
      callback(err);
      return;
    }
    // create a new html fragment in memory based on report-template.html
    let reportHTML = document.createElement("html");
    reportHTML.innerHTML = data;
    // render the ReportView output to new file report.html
    ReactDOM.render(<Report />, reportHTML.getElementsByTagName('div')[0]);
    let reportPath = path.join(__dirname, 'report.html');
    fs.writeFile(reportPath, reportHTML.innerHTML, 'utf-8', (err) => {
      if (err) {
        const alert = {
          title: 'Error writing rendered report to disk',
          content: err.message,
          leftButtonText: 'Ok'
        }
        api.createAlert(alert);
        callback(err);
        return;
      }
      // send the file path to the main process to be opened in a new window
      ipcRenderer.send('open-report', reportPath);
      reportOpened = true;
      callback();
    });
  });

}
