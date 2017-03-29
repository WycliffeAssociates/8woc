const React = require('react');
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const Dropzone = require('react-dropzone');
const Button = require('react-bootstrap/lib/Button.js');

const style = {
  div: {
    paddingTop: '15%',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dropzone: {
    active: {
      border: '2px solid #0277BD',
      backgroundColor: '#747474'
    },
    main: {
      width: '100%',
      color: '#FFFFFF',
      height: '200px',
      border: '2px dashed #0277BD',
      borderRadius: '10px',
      fontStyle: 'italic',
      padding: "5px",
    },
    inner: {
      fontSize: '15px'
    },
    welcome: {
      width: '100%',
      color: '#212121',
      height: '200px',
      borderRadius: '5px',
      fontSize: '25px'
    }
  }
};

class DragDrop extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.isWelcome) {
      this.mainStyle = style.dropzone.welcome;
    } else {
      this.mainStyle = style.dropzone.main;
    }
  }

  onDrop(files) {
    if (files !== undefined) {
      this.props.sendFilePath(files[0].path);
    }
  }

  render() {
    return (
      <div>
        <div style={style.div} onClick={() => this.props.dragDropOnClick(this.props.dialogOpen, this.props.properties)} >
          <Dropzone onDrop={this.onDrop.bind(this)}
            disableClick={true} multiple={false} style={this.mainStyle}
            activeStyle={style.dropzone.active}>
            <div style={this.props.styles}>
              <center>
                <h4 style={{ marginTop: '60px' }}>Drag files here to upload, or click to select a file</h4>
                <h4>(local projects, USFM projects, etc)</h4>
                <span style={style.dropzone.inner}> {this.props.filePath} </span>
              </center>
            </div>
          </Dropzone>
        </div>
        {this.props.validFile ? <Button bsStyle="primary" onClick={this.props.loadProject} style={{ marginLeft: '45%', marginTop: 20 }}>
          <Glyphicon glyph="folder-open" />
          <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>Load</span>
        </Button> : null}
      </div>
    );
  }
}

module.exports = DragDrop;
