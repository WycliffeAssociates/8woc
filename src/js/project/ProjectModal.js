const React = require('react');
const Modal = require('react-bootstrap/lib/Modal.js');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const CoreStore = require('../stores/CoreStore.js');
const project = require('./CreateNewProject');
const gogs = require('./GogsLogin')();
const manifest = require(window.__base + 'test_files/Import From TS/manifest');

const ProjectModal = React.createClass({

  getInitialState: function() {
    return {showModal: false,
            text:""
    };
  },
  componentWillMount: function() {
    CoreStore.addChangeListener(this.showCreateProject);
  },
  showCreateProject: function() {
    this.setState({showModal: CoreStore.getShowProjectModal()});
  },
  close: function() {
    this.setState({showModal: false});
    project.createProject(manifest, this.state.text);
  },
  createaccount: function() {

  },
  handleChange: function(e) {
    this.state.text = e.target.value;
  },
  open: function() {
    this.setState({showModal: true});
  },
  handleKeyPress: function(e) {
    if (e.charCode == 13) {
      this.setState({showModal: false});
      project.createProject(manifest, this.state.text);

    }
  },

  render: function() {
    return (
      <div>
      <Modal show={this.state.showModal} onHide={this.close} >
      <Modal.Header Create Project>
      <Modal.Title>Project Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <FormGroup>
      <ControlLabel>Title</ControlLabel>
      <FormControl type="text" placeholder="Enter name of Project" onKeyPress={this.handleKeyPress}  onChange={this.handleChange}/>
      </FormGroup>
      </Modal.Body>
      <Modal.Footer>
      <Button type="button" onClick={this.close}>Create</Button>
      </Modal.Footer>
      </Modal>
      </div>
    )}
  });

  module.exports = ProjectModal;
