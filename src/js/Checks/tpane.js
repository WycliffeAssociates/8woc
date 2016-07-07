/**
 * @author Ian Hoegen
 * @description This component displays the Original Language, Gateway Language,
 *              and the Target Language. It takes it's input from uploads.
 ******************************************************************************/
const Col = require('react-bootstrap/lib/Col.js');
const Row = require('react-bootstrap/lib/Row.js');
const Grid = require('react-bootstrap/lib/Grid.js');
const Well = require('react-bootstrap/lib/Well.js');
const React = require('react');
const FileActions = require('../FileActions');

var Pane = React.createClass({
  render: function() {
    return (
      <div>
          <h3>{this.props.title}</h3>
         <Well className="tpane" >{this.props.content}</Well>
      </div>
    );
  }

});
var TPane = React.createClass({
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
      <Row >
          <Col xs={3} md={3}><Pane title="Original Language" content={this.state.ol}/></Col>
          <Col xs={3} md={3}><Pane title="Gateway Language" content={this.state.gl}/></Col>
          <Col xs={3} md={3}><Pane title="Target Language" content={this.state.tl}/></Col>
      </Row>
      </Grid>
  );
  }
});
module.exports = TPane;
