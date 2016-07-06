var RB = require('react-bootstrap');
var {Grid, Row, Col} = RB;
var React = require('react');
var ScriptureDisplay = require('./subcomponents/ScriptureDisplay');
var ConfirmDisplay = require('./subcomponents/ConfirmDisplay');
var FlagDisplay = require('./subcomponents/FlagDisplay');
var NextButton = require('./subcomponents/NextButton');
var Menu = require('./subcomponents/Menu');
var Loader = require('./subcomponents/Loader');
var Fetcher = require('./FetchData');


var PhraseChecker = React.createClass({
  getInitialState: function(){
    return {toCheck: "",
            ref: "",
            note: "",
            chapterData: {},
            tlVerse: "This is selectable placeholder text. Eventually the target language text will appear here",
            selectedText: "",
            flagState: "",
            returnObject: [],
            progress:  0,
            isLoading: true}
  },

  setSelectedText: function(e){
    this.setState({selectedText: e});
  },
  setFlagState: function(e){
    this.setState({flagState: e});
  },
  setNote: function(e){
    this.setState({note: e});
  },
  setRef: function(e){
    this.setState({ref: e});
  },
  setProgress: function(e){
    this.setState({progress: e});
    if(this.state.progress >= 100){
      this.setState({isLoading: false});
    }
  },
  onParserCompletion: function(object){
      console.log(object);
      this.setState({chapterData: object});
  },
  componentWillMount: function(){
    var data = Fetcher('eph', this.setProgress, this.onParserCompletion);
  },
  appendReturnObject: function(){
    var object = this.state.returnObject;
    object.push(
      {
        ref: this.state.ref,
        selectedText: this.state.selectedText,
        flag: this.state.flagState,
        note: this.state.note
      }
    );
    this.setState({returnObject: object});
    console.log(this.state.returnObject);
  },
  render: function(){
    return (
      <Grid>
        <Row
          className="progressBar"
          style={{
            display: this.state.isLoading ? "block" : "none"
          }}
        >
          <Col md={12}>
            <Loader progress={this.state.progress} />
          </Col>
        </Row>
        <div style={{display: this.state.isLoading ? "none" : "block"}}>
          <Row className="show-grid">
            <Col md={12}>
              <ScriptureDisplay
                scripture={this.state.tlVerse}
                setSelectedText={this.setSelectedText}
                currentVerse={this.state.ref}
                ref="ScriptureDisplay"
              />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={5} className="confirm-area">
              <ConfirmDisplay
                note={this.state.note}
                toCheck={this.state.toCheck}
                selectedText={this.state.selectedText}
              />
            </Col>
            <Col md={6}>
              <FlagDisplay
                setFlagState={this.setFlagState}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} className="next-button">
              <NextButton nextItem={this.appendReturnObject}/>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Menu verses={this.state.chapterData}
                        setNote={this.setNote}
                        setRef={this.setRef}/>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
});

module.exports = PhraseChecker;
