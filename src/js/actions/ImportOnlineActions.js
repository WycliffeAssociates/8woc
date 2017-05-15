import consts from './CoreActionConsts';
import Gogs from '../components/core/login/GogsApi';
import rimraf from 'rimraf';
import * as getDataActions from './GetDataActions';
import { openAlertDialog } from '../actions/AlertModalActions'
// constant declaration
const loadOnline = require('../components/core/LoadOnline');

export function changeShowOnlineView(val) {
    return ((dispatch, getState) => {
        var user = getState().loginReducer.userdata
            dispatch({
                type: consts.CHANGED_IMPORT_VIEW,
                view: val,
                user:user
            });
            dispatch(this.updateRepos());
    });
}

export function updateRepos() {
    return ((dispatch, getState) => {
        var user = getState().loginReducer.userdata;
        if (user) {
            var _this = this;
            Gogs().retrieveRepos(user.username).then((repos) => {
                dispatch({
                    type: consts.RECIEVE_REPOS,
                    repos: repos
                });
                dispatch({type: consts.GOGS_SERVER_ERROR, err: null}); //Equivalent of saying "there is no error, successfull fetch"
            }).catch((e)=>{
              console.log(e)
              dispatch({
                type: consts.GOGS_SERVER_ERROR,
                err: e
              })
            });
        }
    })
}

export function importOnlineProject(link) {
    return ((dispatch) => {
        dispatch({ type: consts.SHOW_LOADING_CIRCLE });
        loadOnline(link, function (err, savePath, url) {
            if (err) {
                var errmessage = "An unknown problem occurred during import";

                if (err.toString().includes("fatal: unable to access")) {
                    errmessage = "Unable to connect to the server. Please check your Internet connection.";
                } else if (err.toString().includes("fatal: The remote end hung up")) {
                    errmessage = "Unable to connect to the server. Please check your Internet connection.";
                } else if (err.toString().includes("Failed to load")) {
                    errmessage = "Unable to connect to the server. Please check your Internet connection.";
                } else if (err.toString().includes("fatal: repository")) {
                    errmessage = "The URL does not reference a valid project";
                } else if (err.type && err.type === "custom") {
                    errmessage = err.text;
                }

                // If the import fails for any reason except for the project already existing,
                // we need to remove the partial project folder that may have been created
                // rimraf works best when deleting a folder with subfolders
                // It's in a try-catch because sometimes there isn't a folder created and then rimraf fails
                if (!err.text || !err.text.includes("project already exists")) {
                    try {
                        rimraf(savePath, function () {});
                    } catch (e) {}
                }

                dispatch(openAlertDialog(errmessage));
                dispatch({ type: "LOADED_ONLINE_FAILED" });
                dispatch({ type: consts.HIDE_LOADING_CIRCLE });
            } else {
                dispatch(clearLink());
                dispatch(getDataActions.openProject(savePath, url));
                dispatch({ type: consts.HIDE_LOADING_CIRCLE });
            }
        });
    })
}

export function getLink(e) {
  return {
    type: consts.IMPORT_LINK,
    importLink: e.target.value
  };
}

export function clearLink() {
    return {
        type: consts.IMPORT_LINK,
        importLink: ""
    };
}

