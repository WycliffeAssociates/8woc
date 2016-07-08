const React = require('react');
const NextButton = require('../components/NextButton');
//const SideBar = require('../components/SideBar');
const CommentBox = require('../components/CommentBox');
const UploadModal = require('../components/UploadModal');
const Button = require('react-bootstrap/lib/Button.js');
const Grid = require('react-bootstrap/lib/Grid.js');
const Row = require('react-bootstrap/lib/Row.js');
const Col = require('react-bootstrap/lib/Col.js');
const RootStyles = require('./RootStyles')


var Root = React.createClass({
  render: function() {
    return (
      <div>
        <UploadModal />
        <Grid fluid>
        <Row>
        <Col style={RootStyles.SideMenu} xs={2} md={2}></Col>
        </Row>
        <Row>
        <Col style={RootStyles.CheckSection} xs={10} md={10} xsOffset={2} mdOffset={2}></Col>
        </Row>
        <Row >
        <Col style={RootStyles.AfterCheck} xs={10} md={10} xsOffset={2} mdOffset={2} >
        <CommentBox data={""}/>
        </Col>
        </Row>

        </Grid>
      </div>
    );
  }
});
module.exports = Root;
