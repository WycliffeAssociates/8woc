var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Well = ReactBootstrap.Well;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Label = ReactBootstrap.Label;
var Glyph = ReactBootstrap.Glyphicon;
var ProgressBar = ReactBootstrap.ProgressBar;

var App = React.createClass({
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
  parseTn: function(){
    var http = new TNHTMLScraper();
    var _this = this;
    http.downloadEntireBook(
      'psa',
      function(done, total){
        _this.setState({progress: done/total*100});
      },
      function(){
        var book = http.getBook('psa');
        var parsedBook = TNParser(book, 'psa', function(a){console.log(a*100+"%")});
        _this.setState({chapterData: parsedBook,
                        isLoading: false});
      }
    );
  },
  componentWillMount: function(){
    this.parseTn();
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
              <TempMenu verses={this.state.chapterData}
                        setNote={this.setNote}
                        setRef={this.setRef}/>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
});

var ScriptureDisplay = React.createClass({
  getInitialState: function(){
    return {selectedPos: [],
            selectedVals: []};
  },
  getSelectedText: function(){
    var selection = window.getSelection();
    var newPos = this.state.selectedPos;
    var newVals = this.state.selectedVals;
    var startPoint = parseInt(selection.anchorNode.parentElement.attributes["data-pos"].value);
    var endPoint = parseInt(selection.focusNode.parentElement.attributes["data-pos"].value)+1;
    for(var i = startPoint; i < endPoint; i++){newPos.push(i);}
    newVals.push(selection.toString());
    this.setState({selectedPos: newPos,
                   selectedVals: newVals});
    this.returnSelection();
  },
  returnSelection: function(){
    var returnString = this.state.selectedVals.join(" ... ");
    this.props.setSelectedText(returnString);
  },
  clearSelection: function(){
    this.setState({selectedPos: [],
                   selectedVals: []});
  },
  render: function(){
    var wordArray = this.props.scripture.split(' ');
    var spannedArray = [];
    var highlightedStyle = {backgroundColor: 'yellow'};
    for(var i = 0; i < wordArray.length; i++){
      if(this.state.selectedPos.includes(i)){
        spannedArray.push(
          <span style={{backgroundColor: 'yellow'}}
                data-pos={i}
                key={i}>
            {wordArray[i] + " "}
          </span>
        );
      }else{
        spannedArray.push(
          <span key={i} data-pos={i}>
            {wordArray[i] + " "}
          </span>
        );
      }
    }
    var verseDisplay = this.props.currentVerse.split(" ");
    return (
      <div className="ScriptureDisplay">
        <h1>{verseDisplay[0].toUpperCase()}<small>{verseDisplay[1]}</small></h1>
        <Glyph
          glyph="remove"
          style={{float: 'right'}}
          onClick={this.clearSelection}
        />
        <Well>
          <p onClick={this.getSelectedText}>{spannedArray}</p>
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

var TempMenu = React.createClass({
  getInitialState: function(){
    return {current: 0}
  },
  passInfo: function(k, j, i){
    this.props.setNote(k);
    this.props.setRef(j);
    this.setState({current: i});
  },
  render: function(){
    var verseList = [];
    var scripture = this.props.verses;
    var _this = this;
    let i = 0;
    for(let type in scripture){
      verseList.push(
        <h3 className="listhead" key={type}>{type}</h3>
      );
      for(let verse in scripture[type].verses){
        let Book = scripture[type].verses[verse].book;
        let Chapter = scripture[type].verses[verse].chapter;
        let thisVerse = scripture[type].verses[verse].verse;
        let referenceString = Chapter + ":" + thisVerse;
        verseList.push(
          <a
            key={i++}
            num={i}
            className="verseReference"
            onClick={
              function(){
                _this.passInfo(
                  scripture[type].verses[verse].phrase,
                  referenceString,
                  i
                )
              }
            }
            >
            {scripture[type].verses[verse].book + " " + referenceString}<br />
          </a>
        );
      }
    }
    return (
      <div>
        {verseList}
      </div>
    );
  }
});

/* This would eventually replace the anchor tags in the TempMenu however I do
   not want to waste time writing a new component if lance is working on a be
   tter menu anyways. Placing this on hold for now.
*/
// var MenuElement = React.createClass({
//   getInitialState: function(){
//     return {type: "",
//             verse: "",
//             index: 0}
//   },
//   render: function(){
//     var i = 0;
//     var _this = this;
//     return (
//       <a
//         key={i++}
//         index={i}
//         className="verseReference"
//         onClick{
//           function(){
//             _this.props.passInfo()
//           }
//         }
//
//     );
//   }
// });

var Loader = React.createClass({
  render: function(){
    return (
      <ProgressBar
        now={this.props.progress}
        style={{verticaAlign: 'middle'}}
      />
    );
  }
});

ReactDOM.render(<App />, document.getElementById('module'));
