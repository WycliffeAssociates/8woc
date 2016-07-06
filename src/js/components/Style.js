var style = {
  pane: {
    content: {
      overflowY: 'scroll',
      width: '100%',
      height: '250px'
    },
    header: {
      textAlign: 'center'
    }
  },
  dropzone: {
    active: {
      border: '2px solid #727272',
      backgroundColor: '#f5f5f5'
    },
    text: {
      lineHeight: '200px',
      verticalAlign: 'middle',
      width: '100%'
    },
    main: {
      width: '100%',
      color: '#212121',
      height: '200px',
      border: '2px dashed #727272',
      borderRadius: '5px',
      fontSize: '25px'
    }
  },
  menu_item_text: {
    cursor: 'pointer'
  },
  menu_item_flag_enabled: {
    color: 'blue',
    display: 'initial'
  },
  menu_item_flag_disabled: {
    color: 'grey'
  },
  menu_item_status_icon_retained: {
    color: 'green',
    display: 'initial'
  },
  menu_item_status_icon_replaced: {
    color: 'gold',
    display: 'initial'
  },
  menu_item_status_icon_wrong: {
    color: 'red',
    display: 'initial'
  },
  menu_item_status_icon_unchecked: {
    display: 'none'
  }
};

module.exports = style;
