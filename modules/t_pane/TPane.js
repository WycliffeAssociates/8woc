/**
 * @author Ian Hoegen
 * @description This component displays the Original Language, Gateway Language,
 *              and the Target Language. It takes it's input from uploads.
 ******************************************************************************/


const api = window.ModuleApi;
const React = api.React;

const Grid = api.ReactBootstrap.Grid;
const Row = api.ReactBootstrap.Row;
const Pane = require('./Pane');



//string constants
const TARGET_LANGUAGE_ERROR = "Unable to load target language from CheckStore",
    ORIGINAL_LANGUAGE_ERROR = "Unable to load original language from CheckStore",
    GATEWAY_LANGUAGE_ERROR = "Unable to load gateway language from CheckStore";

class TPane extends React.Component {
  constructor() {
      super();
      var originalLanguage = api.getDataFromCommon('originalLanguage');
      var targetLanguage = api.getDataFromCommon('targetLanguage');
      var gatewayLanguage = api.getDataFromCommon('gatewayLanguage');
      this.state = {
          "originalLanguage": !originalLanguage ? "" : originalLanguage,
          "targetLanguage": !targetLanguage ? "" : targetLanguage,
          "gatewayLanguage": !gatewayLanguage ? "" : gatewayLanguage,
      }

      this.updateOriginalLanguage = this.updateOriginalLanguage.bind(this);
      this.updateGatewayLanguage = this.updateGatewayLanguage.bind(this);
      this.updateTargetLanguage = this.updateTargetLanguage.bind(this);
  }

  componentWillMount() {
      api.registerEventListener("updateOriginalLanguage", this.updateOriginalLanguage);
      api.registerEventListener("updateTargetLanguage", this.updateTargetLanguage);
      api.registerEventListener("updateGatewayLanguage", this.updateGatewayLanguage)
  }

  componentWillUnmount() {
    api.removeEventListener("updateOriginalLanguage", this.updateOriginalLanguage);
    api.removeEventListener("updateTargetLanguage", this.updateTargetLanguage);
    api.removeEventListener("updateGatewayLanguage", this.updateGatewayLanguage);
  }

  updateTargetLanguage() {
    var targetLanguage = api.getDataFromCommon("targetLanguage");
    if (targetLanguage) {
        this.setState({
            targetLanguage: targetLanguage
        });
    }
    else {
        console.error(TARGET_LANGUAGE_ERROR);
    }
  }

  updateOriginalLanguage() {
    var originalLanguage = api.getDataFromCommon("originalLanguage");
    if (originalLanguage) {
        this.setState({
            originalLanguage: originalLanguage
        });
    }
    else {
        console.error(ORIGINAL_LANGUAGE_ERROR);
    }
  }

  updateGatewayLanguage() {
    var gatewayLanguage = api.getDataFromCommon("gatewayLanguage");
    if (gatewayLanguage) {
        this.setState({
            gatewayLanguage: gatewayLanguage
        });
    }
    else {
        console.error(GATEWAY_LANGUAGE_ERROR);
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Pane title="Original Language" content={this.state.originalLanguage}/>
          <Pane title="Gateway Language" content={this.state.gatewayLanguage}/>
          <Pane title="Target Language" content={this.state.targetLanguage}/>
        </Row>
      </Grid>
    );
  }
}

 module.exports = TPane;
