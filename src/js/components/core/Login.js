const React = require('react');

const remote = window.electron.remote;
const {dialog} = remote;
const CoreActions = require('../../actions/CoreActions.js');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const Grid = require('react-bootstrap/lib/Grid.js');
const Row = require('react-bootstrap/lib/Row.js');
const Col = require('react-bootstrap/lib/Col.js');
const style = require('../../styles/loginStyle');
const gogs = require('./GogsApi.js');
const Registration = require('./Registration');

class Login extends React.Component {
  constructor() {
    super();
    this.state = {userName: "", password: "", register: false};
  }
  handleSubmit(event) {
    var userdata = {
      username: this.state.userName,
      password: this.state.password
    };
    var newuser = gogs().login(userdata).then(function(userdata) {
      CoreActions.login(userdata);
      CoreActions.updateLoginModal(false);
      CoreActions.updateButtonStatus(true);
    }).catch(function(reason) {
      console.log(reason);
      if (reason.status === 401) {
        dialog.showErrorBox('Login Failed', 'Incorrect username or password');
      } else if (reason.hasOwnProperty('message')) {
        dialog.showErrorBox('Login Failed', reason.message);
      } else if (reason.hasOwnProperty('data')) {
        let errorMessage = JSON.parse(reason.data);
        dialog.showErrorBox('Account Creation Error', errorMessage.message);
      } else {
        dialog.showErrorBox('Login Failed', 'Unknown Error');
        console.log(reason);
      }
    });
  }
  handleUserName(e) {
    this.setState({userName: e.target.value});
  }
  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  showRegistration() {
    this.setState({register: true});
  }

  render() {
    if (this.state.register === true) {
      return (
        <Registration />
      );
    } else {
      return (
        <Grid>
          <Row className="show-grid">
            <Col md={3} sm={5} xs={12} style={style.loginGridLeft}>
                <FormGroup controlId="login-form">
                  <ControlLabel>Door43 Account</ControlLabel>
                    <FormControl type="text" placeholder="Door43 Account"
                    style={style.loginbox.input} onChange={this.handleUserName.bind(this)}/>
                    <FormControl type="password" placeholder="Password"
                    style={style.loginbox.input} onChange={this.handlePassword.bind(this)}/>
                </FormGroup>
                <Button bsStyle="primary" type="submit"
                onClick={this.handleSubmit.bind(this)}
                style={style.footer.button}>Sign In</Button>
            </Col>
            <Col md={3} sm={4} xs={12} style={style.loginGridRight}>
              <Button onClick={this.showRegistration.bind(this)} bsStyle="primary">Register</Button>
            </Col>
           </Row>
        </Grid>
      );
    }
  }
}

module.exports = Login;
