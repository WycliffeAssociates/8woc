/**
 * @author Ian Hoegen
 * @description This component displays the Original Language, Gateway Language,
 *              and the Target Language. It takes it's input from uploads.
 ******************************************************************************/
 const React = require('react');

const Grid = require('react-bootstrap/lib/Grid.js');
const Row = require('react-bootstrap/lib/Row.js');

const FileActions = require('./FileActions');
const Pane = require('./Pane');


const TPane = React.createClass({
  getInitialState: function() {
    return ({
      ol: "",
      tl: "",
      gl: ""
    });
  },
  componentWillMount: function() {
    FileActions.on('changeTL', this.updateTargetLanguage);
    FileActions.on('changeOL', this.updateOriginalLanguage);
  },
  updateTargetLanguage: function(text) {
    this.setState({
      tl: FileActions.tlText
    });
  },
  updateOriginalLanguage: function(text) {
    this.setState({
      ol: FileActions.olText
    });
  },
  render: function() {
    return (
      <Grid>
        <Row>
          <Pane title = "Original Language" content = {this.state.ol}/>
          <Pane title = "Gateway Language" content = {this.state.gl}/>
          <Pane title = "Target Language" content = {this.state.tl}/>
          </Row>
      </Grid>
  );
  }
});
module.exports = TPane;
