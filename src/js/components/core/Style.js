var style = {
  pane: {
    content: {
      maxWidth: '45vh',
      overflowY: 'scroll',
      height: '250px',
      padding:0
    },
    header: {
      maxWidth: '45vh',
      textAlign: 'center',
      padding:0
    }
  },
  dropzone: {
    active: {
      border: '2px solid #727272',
      backgroundColor: '#f5f5f5'
    },
    text: {
      lineHeight: '200px',
      verticalAlign: 'middle'
    },
    main: {
      color: '#212121',
      height: '200px',
      border: '2px dashed #727272',
      borderRadius: '5px',
      fontSize: '25px'
    }
  },
  menuItem: {
    text: {
      cursor: 'pointer'
    },
    flag: {
      enabled: {
        color: '#CC0000',
        visibility: 'visible'
      },
      disabled: {
        visibility: 'hidden'
      }
    },
    statusIcon: {
      retained: {
        color: 'green',
        display: 'initial'
      },
      replaced: {
        color: 'gold',
        display: 'initial'
      },
      wrong: {
        color: 'red',
        display: 'initial'
      },
      unchecked: {
        display: 'none'
      }
    }
  }
};

module.exports = style;
