import React from 'react';
import { connect  } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap/lib';
// components
import Login from '../components/core/login/Login';
import Profile from '../components/core/login/Profile';
import Licenses from '../components/core/licenses/Licenses';
// Actions
import * as LoginActions from '../actions/LoginActions';
import * as SettingsActions from '../actions/SettingsActions';
import * as modalActions from '../actions/ModalActions';
import * as PopoverActions from '../actions/PopoverActions';

class ApplicationModalContainer extends React.Component {

  render() {
    let { loggedInUser } = this.props;
    let accountDisplay;
    if (loggedInUser){
      accountDisplay = <Profile {...this.props}/>
    } else {
      accountDisplay = <Login {...this.props}/>
    }
    return (
      <div>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example"
              bsStyle="pills"
              style={{borderBottom: "none", backgroundColor: "var(--accent-color)", color: 'var(--text-color)', width: "100%"}}>
          <Tab eventKey={1} title="Account">
              {accountDisplay}
          </Tab>
          <Tab eventKey={2} title="Licenses" style={{backgroundColor: "var(--reverse-color)"}}>
              <Licenses />
          </Tab>
        </Tabs>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.loginReducer,
    ...state.settingsReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSwitchToLoginPage: (displayLoginBool) => {
      dispatch(LoginActions.displayLogin(displayLoginBool));
    },
    handleSubmit: (userDataSumbit) => {
      dispatch(LoginActions.loginUser(userDataSumbit));
    },
    onHandleLogout: () => {
      dispatch(LoginActions.logoutUser());
    },
    onSettingsChange: (field, value) => {
      dispatch(SettingsActions.setSettings(field, value));
    },
    feedbackChange: (e) => {
      dispatch(LoginActions.feedbackChange(e.target.value));
    },
    subjectChange: (e) => {
      dispatch(LoginActions.subjectChange(e.target.value));
    },
    submitFeedback: () => {
      dispatch(LoginActions.submitFeedback());
    },
    loginLocalUser: (localUsername) => {
      dispatch(LoginActions.loginLocalUser(localUsername));
    },
    goToProjectsTab: () => {
      dispatch(modalActions.selectModalTab(2, 1, true));
    },
    showPopover: (title, bodyText, positionCoord) => {
      dispatch(PopoverActions.showPopover(title, bodyText, positionCoord));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationModalContainer);
