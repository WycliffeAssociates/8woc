const React = require('react');

const api = window.ModuleApi;
const loadOnline = require('../LoadOnline.js');
const Upload = require('../UploadMethods.js');
const Button = require('react-bootstrap/lib/Button.js');
const CoreActions = require('../../../actions/CoreActions.js');

class Projects extends React.Component {
  render() {
    return (
      <div style={{height: '419px', overflowY: 'auto'}}>
        <div style={{marginBottom: '15px'}}>
          <span style={{fontSize: '20px'}}>Your Door43 Projects</span>
          <Button bsStyle='primary' style={{display: this.props.showBack}} onClick={this.props.back} className={'pull-right'} bsSize='sm'>Back</Button>
        </div>
        {this.props.onlineProjects}
      </div>
    );
  }
}

module.exports = Projects;
