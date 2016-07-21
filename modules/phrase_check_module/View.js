
const api = window.ModuleApi;

const RB = api.ReactBootstrap;
const {Row, Col} = RB;
const React = api.React;
const ScriptureDisplay = require('./subcomponents/ScriptureDisplay');
const ConfirmDisplay = require('./subcomponents/ConfirmDisplay');
const FlagDisplay = require('./subcomponents/FlagDisplay');

class PhraseChecker extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount() {
    this.TPane = api.getModule('TPane');
    this.TADisplay = api.getModule('TADisplay');
    this.ProposedChanges = api.getModule('ProposedChanges');

  }

  updateRender() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    var PhraseObj = api.getDataFromCheckStore("PhraseCheck");
    /**
     * PhrasesObj should be structed like this:
     {
      [
        {
          group: "figs..."
          checks: [
            {
              ...
            }
            ...
          ]
        }...
      ]
     }
     */
     if (PhraseObj) {
    var currentGroupIndex = PhraseObj["currentGroupIndex"];
    var currentCheckIndex = PhraseObj['currentCheckIndex'];
    var currentCheck = PhraseObj["groups"][currentGroupIndex]["checks"][currentCheckIndex];
    var targetLanguage = api.getDataFromCommon('targetLanguage');
    var currentVerse = targetLanguage[currentCheck.chapter][currentCheck.verse];
      return (
        <div>
        <this.TPane />
        <Row className="show-grid">
          <Col md={12}>
            <ScriptureDisplay
              scripture={currentVerse}
              currentVerse={currentCheck.book
                            + " " + currentCheck.chapter
                            + ":" + currentCheck.verse}
            />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={6} className="confirm-area">
            <ConfirmDisplay
              phraseInfo={currentCheck.phraseInfo}
              phrase={currentCheck.phrase}
            />
          </Col>
          <Col md={6}>
            <FlagDisplay
            />
          </Col>
        </Row>
        <br />
        <this.ProposedChanges />
        <this.TADisplay />
        </div>
      );
    } else {
      return(<div></div>)
    }
  }
}

module.exports = PhraseChecker;
