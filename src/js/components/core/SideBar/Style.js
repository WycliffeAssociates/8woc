
var style = {
  sideBarcontainer: {
    backgroundColor: "#333333",
    zIndex: "98",
    fontSize: "12px",
    overflowX: "hidden",
    height: "100%",
    padding: 0,
    position:"fixed",
    width:"300px"
  },

  container: {
    backgroundColor: "#333333",
    height: "100vh",
    display: "inline-block",
    zIndex: "99",
    fontSize: "12px",
    overflowY: "auto",
    width:"100%"
  },

  fixedChevrons: {
    zIndex: 1000,
    backgroundColor: '#333333',
  },

  ul: {
    margin: "0px",
    padding: "0px",
  },

  li: {
    display: "block",
    textAlign: "center",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "white",
    cursor: "pointer",
    userSelect: "none",
  },

  glyphicon: {
    fontSize: "25px",
    color: "white",
  },

  glyphiconHover: {
    fontSize: "29px",
    color: "#44C6FF",
  },

  hover: {
    backgroundColor: "#444444",
    color: "#0277BD",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    userSelect: "none",
    paddingTop: "13px",
    paddingBottom: "13px"

  },

  logo:{
    height: "90px",
    width: "90px",
    display: "block",
    padding: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer",
  },

  img: {
    width: "25px",
    height: "30px",
  },

  StatusBar: {
    backgroundColor: "#333333",
    height: "30px",
    width: "100%",
    fontSize: "16px",
    zIndex: "97",
  },

  slideButton: {
    float: "right",
    marginTop: "50vh",
    zIndex: "999",
    color: "#fff",
    backgroundColor: "#000",
    padding: "10px 0",
    marginRight: "-15px",
    borderRadius: "0 5px 5px 0"
  },

  slideButtonCollapsed: {
    float: "left",
    marginTop: "50vh",
    zIndex: "999",
    color: "#fff",
    backgroundColor: "#000",
    padding: "10px 0",
    marginRight: "-15px",
    borderRadius: "0 5px 5px 0"
  }

};

module.exports = style;
