const React = require('react');

const remote = window.electron.remote;
const {dialog} = remote;

const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const Token = require('./AuthToken');

const CoreActions = require('../../actions/CoreActions.js');

const GogsApi = require('./GogsApi');

const Registration = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      username: '',
      confirm: ''
    };
  },
  checkPass: function() {
    var password = this.state.password;
    var confirm = this.state.confirm;
    if (password === confirm && confirm.length > 0) {
      return 'success';
    } else if (password !== confirm && confirm.length > 0) {
      return 'error';
    }
  },
  handleUser: function(e) {
    this.setState({username: e.target.value});
  },
  handleEmail: function(e) {
    this.setState({email: e.target.value});
  },
  handlePass: function(e) {
    this.setState({password: e.target.value});
  },
  handleConfirm: function(e) {
    this.setState({confirm: e.target.value});
  },
  createUser: function() {
    var user = {
      login_name: this.state.username,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    var emailValid = this.validateEmail();
    var passwordMatch = this.checkPass();
    var unLen = user.username.length;
    if (emailValid === 'success' && passwordMatch === 'success' && unLen > 0) {
      GogsApi(Token)
      .createAccount(user)
      .then(function(data) {
        console.log(data);
        CoreActions.login(data);
        CoreActions.updateLoginModal(false);
      })
      .catch(function(reason) {
        console.log(reason);
        if (reason.hasOwnProperty('message')) {
          dialog.showErrorBox('Account Creation Error', reason.message);
        } else if (reason.hasOwnProperty('data')) {
          let errorMessage = JSON.parse(reason.data);
          console.log(errorMessage.message);
          dialog.showErrorBox('Account Creation Error', errorMessage.message);
        } else {
          dialog.showErrorBox('Account Creation Error', 'Unknown Error');
          console.log(reason);
        }
      });
    }
  },
  validateEmail: function() {
    var email = this.state.email;
    if (email.length > 0) {
      var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,9}(?:\.[a-z]{2})?)$/;
      if (reg.test(email)) {
        return 'success';
      } else {
        return 'error';
      }
    }
  },
  render: function() {
    return (
        <div>
          <FormGroup controlId="username">
            <FormControl type="text" placeholder="Username" onChange={this.handleUser}/>
          </FormGroup>
          <FormGroup controlId="email" validationState={this.validateEmail()}>
            <FormControl type="text" placeholder="Email" onChange={this.handleEmail}/>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="password" validationState={this.checkPass()}>
            <FormControl type="password" placeholder="Password" onChange={this.handlePass}/>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="confirm" validationState={this.checkPass()}>
            <FormControl type="password" placeholder="Confirm Password" onChange={this.handleConfirm}/>
            <FormControl.Feedback />
          </FormGroup>
          <Button onClick={this.createUser} bsStyle="primary">
            Create Account
          </Button>
        </div>
    );
  }
});

module.exports = Registration;
