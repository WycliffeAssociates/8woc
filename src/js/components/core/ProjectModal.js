const fs = require(window.__base + 'node_modules/fs-extra');
const React = require('react');
const Modal = require('react-bootstrap/lib/Modal.js');
const FormGroup = require('react-bootstrap/lib/FormGroup.js');
const ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
const FormControl = require('react-bootstrap/lib/FormControl.js');
const Button = require('react-bootstrap/lib/Button.js');
const ButtonGroup = require('react-bootstrap/lib/ButtonGroup.js');
const Checkbox = require('react-bootstrap/lib/Checkbox.js');
const CoreStore = require('../../stores/CoreStore.js');
const project = require('./CreateNewProject');
const manifest = require(window.__base + 'test_files/Import From TS/manifest');
const CoreActions = require('../../actions/CoreActions.js');
const CheckDataGrabber = require('./CheckDataGrabber');
const ENTER = 13;

const ProjectModal = React.createClass({
  getInitialState: function() {
    return {
      projectname:"",
      showModal: false,
      modalTitle:"Create Project",
      controlLabelTitle:"Name",
      placeHolderText:"Enter name of project",
      doneText:"Create",
      modalValue:"Create",
      FetchDataArray:[]      //FetchDataArray of checkmodules
    };
  },
  componentWillMount: function() {
    CoreStore.addChangeListener(this.showCreateProject);      //action to show create project modal
    CheckDataGrabber.addListner();      //action to change text in project modal
  },
  showCreateProject: function() {
    var modal = CoreStore.getShowProjectModal()
    if (modal === "Create") {
      this.setState({
        showModal: true,
        modalValue: modal,
        modalTitle:"Create Project",
        doneText:"Create"
      });
    } else if(modal === "Check") {
      this.setState({
        showModal: true,
        modalValue: modal,
        modalTitle:"Select Modules To Load",
        doneText:"Finished"
      });
    }
  },
  close: function() {
    this.setState({
      showModal: false,
      modalValue: null
    });
  },
  setProjectName: function (e) {
    this.setState({
      projectname: e.target.value
    });
    if (e.charCode == ENTER) {
      project.createProject(manifest, this.state.projectname);
    }
  },
  pushFetchDataArray: function(element) {
    this.state.FetchDataArray.push(element);
  },
  removeFromFetchDataArray: function(element) {
    var toRemove = this.props.FetchDataArray.indexOf(element);
    this.props.FetchDataArray.splice(toRemove, 1);
  },
  onClick: function () {
    var tempFetchDataArray = [];      //tempFetchDataArray to push checkmodule paths onto
    if (this.state.modalValue == "Check") {
      for (var element of this.state.FetchDataArray) {
        var pathOfCheck = this.makePathForChecks(element);
        tempFetchDataArray[element] = pathOfCheck;
      }
      if (Object.keys(tempFetchDataArray).length > 0) {
        CoreActions.getFetchData(tempFetchDataArray);
      }
      this.close();
    }
    else if (this.state.modalValue == "Create") {
      CoreActions.showCreateProject("Check");
    }
  },
  isModule: function(filepath, file){
    try {
      var stats = fs.lstatSync(filepath);
      if (stats.isDirectory()) {
        if (file.indexOf("module") > -1) {
          return true;
        }
      }
      else {
        return false;
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }
  },
  changeModalBody: function(modalBody) {
    if (modalBody == "Check") {
      var currentChecks = [];
      try {
        var file = fs.readdirSync(window.__base + 'src/js/components/modules');
        for (var element of file) {
          if (this.isModule((window.__base + 'src/js/components/modules/' + element), element)) {
            currentChecks.push(element);
          }
        }
      } catch (e) {
        console.log(e);
      }
      return (<SelectCheckType ref={this.state.modalValue} checks={currentChecks} modalTitle={this.state.modalTitle}
        controlLabelTitle={this.state.controlLabelTitle} placeHolderText={this.state.placeHolderText} FetchDataArray={this.state.FetchDataArray}
        pushFetchDataArray={this.pushFetchDataArray} removeFromFetchDataArray={this.removeFromFetchDataArray}/>)
      }
      else if (modalBody == "Create") {
        return (<CreateProjectForm modalTitle={this.state.modalTitle} ref={this.state.modalValue} controlLabelTitle={this.state.controlLabelTitle}
         placeHolderText={this.state.placeHolderText} setProjectName={this.setProjectName}/>)
      }
    },
    makePathForChecks: function(check) {
      var path = window.__base + 'src/js/components/modules/' + check;
      return path;
    },

    render: function() {
      return (
        <div>
          <Modal show={this.state.showModal} onHide={this.close}>
            {this.changeModalBody(this.state.modalValue)}
            <Modal.Footer>
              <Button type="button" onClick={this.onClick}>{this.state.doneText}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    });

    const CreateProjectForm = React.createClass({
      render: function() {
        return (
          <div>
            <Modal.Header>
              <Modal.Title>{this.props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FormGroup>
              <ControlLabel>{this.props.controlLabelTitle}</ControlLabel>
              <FormControl type="text" placeholder={this.props.placeHolderText} onKeyPress={this.setProjectName}  setProjectName={this.props.setProjectName}/>
            </FormGroup>
            </Modal.Body>
          </div>
        )}
      });

      const SelectCheckType = React.createClass({
        handleClick_: function(e) {
          //checks which modules user selects, removes if selects twice
          try {
            if (e.target.control.checked === false) {
              if (this.props.FetchDataArray.indexOf(e.target.control.id) == -1)
              {
                this.props.pushFetchDataArray(e.target.control.id);
              }

            }
            else {
              this.props.removeFromFetchDataArray(e.target.control.id);
            }
          } catch (e) {
          }
        },
        render: function() {
          var checkButtonComponents = this.props.checks.map(function(checks) {
            return (
              <div>
                <Checkbox id={checks} key={checks}>
                  {checks}
                </Checkbox>
              </div>
            )
          });
          return (
            <div>
              <Modal.Header>
              <Modal.Title>
                {this.props.modalTitle}
              </Modal.Title>
                </Modal.Header>
              <Modal.Body>
              <FormGroup onClick={this.handleClick_}>
                {checkButtonComponents}
              </FormGroup>
              </Modal.Body>
            </div>
          )
        }
      });

      module.exports = ProjectModal;