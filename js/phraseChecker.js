var Remarkable = require('remarkable');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Well = ReactBootstrap.Well;
var FormControl = ReactBootstrap.FormControl;
var Button = ReactBootstrap.Button;

var App = React.createClass({
  render: function(){
    return (
      <Grid>
        <Row>
          <Col md={12}><ScriptureDisplay /></Col>
        </Row>
        <Row>
          <Col md={6} className="confirm-area"><ConfirmDisplay /></Col>
          <Col md={6}><FlagDisplay /></Col>
        </Row>
      </Grid>
    );
  }
});

var ScriptureDisplay = React.createClass({
  render: function(){
    return (
      <div className="ScriptureDisplay">
        <h1>JOHN<small>3:16</small></h1>
        <Well>
          <p>神 愛 世 人 ， 甚 至 將 他 的 獨 生 子 賜 給 他 們 ， 叫 一 切 信 他 的 ， 不 至 滅 亡 ， 反 得 永 生 。</p>
        </Well>
      </div>
    );
  }
});

var ConfirmDisplay = React.createClass({
  render: function(){
    return (
      <form>
        <label>Phrase to select</label>
        <FormControl type="text"
        placeholder="Highlited text appears here" />
      </form>
    );
  }
});

var FlagDisplay = React.createClass({
  render: function(){
    return (
      <div class="col-md-6">
        <Button bsStyle="success">&#10003; Retain</Button>
        <br />
        <Button bsStyle="warning">&#9872; Changed</Button>
        <br />
        <Button bsStyle="danger">&#10060; Wrong</Button>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('module'));
