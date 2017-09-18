import React from 'react';
import path from 'path-extra';
import fs from 'fs-extra';
import AdmZip from 'adm-zip';
import { remote } from 'electron';
// actions
import * as AlertModalActions from './AlertModalActions';
import * as BodyUIActions from './BodyUIActions';
import * as ProjectSelectionActions from './ProjectSelectionActions';
import * as ProjectDetailsActions from './projectDetailsActions';
//helpers
import * as usfmHelpers from '../helpers/usfmHelpers';
import * as ProjectSelectionHelpers from '../helpers/ProjectSelectionHelpers';
// contstants
const { dialog } = remote;
const DEFAULT_SAVE = path.join(path.homedir(), 'translationCore', 'projects');
const ALERT_MESSAGE = (
  <div>
    No file was selected. Please click on the
    <span style={{ color: 'var(--accent-color-dark)', fontWeight: "bold" }}>
      &nbsp;Import Local Project&nbsp;
    </span>
    button again and select the project you want to load.
  </div>
);

/**
 * @description selects a project from the filesystem and loads it up to tC.
 */
export function selectLocalProjectToLoad() {
  return ((dispatch) => {
    dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }, (filePaths) => {
      dispatch(AlertModalActions.openAlertDialog(`Importing local project`, true));
      //no file path given
      if (!filePaths) dispatch(AlertModalActions.openAlertDialog('Project import cancelled', false));
      const sourcePath = filePaths[0];
      const fileName = path.parse(sourcePath).base.split('.')[0];
      // project path in ~./translationCore.
      let newProjectPath = path.join(DEFAULT_SAVE, fileName);
      let usfmFilePath = usfmHelpers.isUSFMProject(sourcePath)
      dispatch(BodyUIActions.toggleProjectsFAB());
      if (filePaths === undefined) {
        //need to break out of function here so that successfull import
        //dialog does not dispatch
        return dispatch(AlertModalActions.openAlertDialog(ALERT_MESSAGE));
      } else if (path.extname(sourcePath) === '.tstudio') {
        // unzip project to ~./translationCore folder.
        dispatch(ProjectDetailsActions.setProjectType('tS'));
        dispatch(unzipTStudioProject(sourcePath, fileName));
      } else if (verifyIsValidProject(sourcePath)) {
        // not tStudio ext project, checking for tC / tS (unzipped)
        dispatch(ProjectDetailsActions.setProjectType('tC'));
        if (!fs.existsSync(newProjectPath))
          fs.copySync(sourcePath, newProjectPath)
        dispatch(ProjectSelectionActions.selectProject(newProjectPath));
      } else if (usfmFilePath) {
        //If USFM file path found and not tS or tC project
        dispatch(ProjectDetailsActions.setProjectType('usfm'));
        //If the selected project is a USFM file or contains a usfm file in the folder 
        const { homeFolderPath, exists } = usfmHelpers.setUpUSFMFolderPath(usfmFilePath);
        if (!exists) dispatch(ProjectSelectionActions.selectProject(homeFolderPath));
        else {
          dispatch(AlertModalActions.openAlertDialog('The project you selected already exists.\
           Reimporting existing projects is not currently supported.'))
        }
      } else {
        debugger;
        let invalidProjectTypeError = ProjectSelectionHelpers.verifyProjectType(sourcePath);
        if (invalidProjectTypeError) {
          dispatch(AlertModalActions.openAlertDialog(
            <div>
              Project selection failed<br />
              {invalidProjectTypeError}<br />
            </div>
          ));
          dispatch(ProjectSelectionActions.clearLastProject());
          /** Need to re-run projects retreival because a project may have been deleted */
          return dispatch(MyProjectsActions.getMyProjects());
        }
        dispatch(AlertModalActions.openAlertDialog('Project imported successfully.', false));
      }
    });
  });
}

function unzipTStudioProject(projectSourcePath, fileName) {
  return ((dispatch) => {
    const zip = new AdmZip(projectSourcePath);
    const newProjectPath = path.join(DEFAULT_SAVE, fileName);
    if (!fs.existsSync(newProjectPath)) {
      zip.extractAllTo(DEFAULT_SAVE, /*overwrite*/true);
      dispatch(ProjectSelectionActions.selectProject(newProjectPath));
    } else {
      dispatch(AlertModalActions.openAlertDialog(
        `A project with the name ${fileName} already exists. Reimporting
         existing projects is not currently supported.`
      ));
    }
  });
}

function verifyIsValidProject(projectSourcePath) {
  const projectManifestPath = path.join(projectSourcePath, "manifest.json");
  if (fs.existsSync(projectManifestPath)) {
    const projectManifest = fs.readJsonSync(projectManifestPath);
    if (projectManifest.target_language && projectManifest.project) {
      return true;
    }
  }
  return false;
}