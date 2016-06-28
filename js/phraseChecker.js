var Remarkable = require('remarkable');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Well = ReactBootstrap.Well;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;

var App = React.createClass({
  getInitialState: function(){
    return {toCheck: "to establish the faith",
            ref: "tit 1 1",
            note: "AT: 'I work to establish the faith' or 'I work to build up the faith.'",
            tlVerse: "神 的 僕 人 ， 耶 穌 基 督 的 使 徒 保 羅 ， 憑 著 神 選 民 的 信 心 與 敬 虔 真 理 的 知 識 ，",
            selectedText: "",
            flagState: "",
            returnObject: []}
  },
  setSelectedText: function(e){
    this.setState({selectedText: e});
  },
  setFlagState: function(e){
    this.setState({flagState: e});
  },
  appendReturnObject: function(){
    var object = this.state.returnObject;
    object.push(
      {
        ref: this.state.ref,
        selectedText: this.state.selectedText,
        flag: this.state.flagState
      }
    );
    this.setState({returnObject: object});
  },
  getTN: function(){
    var html = new HTMLScraper();
    var book;
    html.downloadEntireBook('tit',
                            function(dbook,tbook){
                              console.log(dbook/tbook*100 + "%");
                            },
                            function(){
                              book = html.getBook('tit');
                              console.dir(book);
                            }
                          );
  },
  componentWillMount: function(){
    this.getTN();
  },
  render: function(){
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <ScriptureDisplay
              scripture={this.state.tlVerse}
              setSelectedText={this.setSelectedText}
            />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={6} className="confirm-area">
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
      </Grid>
    );
  }
});

var ScriptureDisplay = React.createClass({
  getSelectedText: function(){
    this.props.setSelectedText(window.getSelection().toString());
  },
  render: function(){
    return (
      <div className="ScriptureDisplay">
        <h1>TITUS<small>1:1</small></h1>
        <Well>
          <p onClick={this.getSelectedText}>{this.props.scripture}</p>
        </Well>
      </div>
    );
  }
});

var ConfirmDisplay = React.createClass({
  render: function(){
    return (
      <form>
        <label>{this.props.toCheck}</label>
        <label>{this.props.note}</label>
        <FormControl type="text"
        placeholder="Highlited text appears here"
        value={this.props.selectedText} />
      </form>
    );
  }
});

var FlagDisplay = React.createClass({
  render: function(){
    var _this = this;
    return (
      <ButtonGroup vertical block>
        <Button bsStyle="success" onClick={
          function() {
            _this.props.setFlagState("Retained")
          }
          }>&#10003; Retain</Button>
        <Button bsStyle="warning" onClick={
          function() {
            _this.props.setFlagState("Changed")
          }
          }>&#9872; Changed</Button>
        <Button bsStyle="danger" onClick={
          function() {
            _this.props.setFlagState("Wrong")
          }
        }>&#10060; Wrong</Button>
      </ButtonGroup>
    );
  }
});

var NextButton = React.createClass({
  render: function(){
    return (
      <Button onClick={this.props.nextItem}>Next &#8594;</Button>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('module'));
