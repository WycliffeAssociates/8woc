const RB = require('react-bootstrap');
const {Grid, Row, Col} = RB;
const React = require('react');
const ScriptureDisplay = require('./subcomponents/ScriptureDisplay');
const ConfirmDisplay = require('./subcomponents/ConfirmDisplay');
const FlagDisplay = require('./subcomponents/FlagDisplay');
const NextButton = require('./subcomponents/NextButton');
const Menu = require('./subcomponents/Menu');
const Loader = require('./subcomponents/Loader');
const Fetcher = require('./FetchData');
const AbstractCheckModule = require('../../AbstractCheckModule');
const CheckActions = require('../../../actions/CheckActions.js');


class PhraseChecker extends AbstractCheckModule{
  constructor(){
    super();

    this.setSelectedText = this.setSelectedText.bind(this);
    this.setFlagState = this.setFlagState.bind(this);
    this.appendReturnObject = this.appendReturnObject.bind(this);
    this.setNote = this.setNote.bind(this);
    this.setRef = this.setRef.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.onParserCompletion = this.onParserCompletion.bind(this);
  }
  setSelectedText(e){
    this.setState({selectedText: e});
    CheckActions.changeCheckProperty("selectedText", e);
  }
  setFlagState(e){
    this.setState({flagState: e});
  }
  setNote(e){
    this.setState({note: e});
  }
  setRef(e){
    this.setState({ref: e});
  }
  setProgress(e){
    this.setState({progress: e});
    if(this.state.progress >= 100){
      this.setState({isLoading: false});
    }
  }
  onParserCompletion(object){
      console.log(object);
      this.setState({chapterData: object});
  }
  componentWillMount(){
    this.setState({
      toCheck: "",
      ref: "",
      note: "",
      chapterData: {},
      tlVerse: "This is selectable placeholder text. Eventually the target language text will appear here",
      selectedText: "",
      flagState: "",
      returnObject: [],
      progress:  0,
      isLoading: true
    });
    var data = Fetcher('eph', this.setProgress, this.onParserCompletion);
  }
  appendReturnObject(){
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
  }
  render() {
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
                phraseInfo={super.getCurrentCheck().checkStatus}
                phrase={super.getCurrentCheck().comments}
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
}

module.exports = PhraseChecker;
