import React from 'react'
import { connect } from 'react-redux'
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap'
// components
import Groups from '../components/groupMenu/Groups'
import * as style from '../components/SideBar/Style'
// actions
import {changeCurrentContextId} from '../actions/ContextIdActions.js'
import {toggleMenu} from '../actions/SideBarActions.js'

const groupMenuContainerStyle = {
  backgroundColor: "var(--background-color-dark)",
  zIndex: "98",
  fontSize: "12px",
  overflowX: "hidden",
  height: "100%",
  padding: 0,
  position: "fixed",
  width: "250px"
};

class GroupMenuContainer extends React.Component {

  menu(toolName) {
    let menu = <div />
    if (toolName !== null) {
      menu = <Groups {...this.props} />
    }
    return menu
  }

  render() {
    let { onToggleMenu } = this.props.actions
    let { menuVisibility, currentCheckNamespace } = this.props.groupMenuReducer
    let { toolName } = this.props.currentToolReducer
    return (
      <div>
        <div style={{display: menuVisibility ? "block" : "none"}}>
          <Grid fluid style={groupMenuContainerStyle}>
            <Col style={
              {
                width: "250px",
                position: "fixed",
                padding: 0,
                backgroundColor: "var(--background-color-dark)",
                height: "95%",
                overflowY: "scroll"
              }
            }>
              {this.menu(toolName)}
            </Col>
          </Grid>
        </div>
        <Glyphicon
          style={menuVisibility ? style.slideButton : style.slideButtonCollapsed}
          glyph={menuVisibility ? 'chevron-left' : 'chevron-right'}
          onClick={onToggleMenu}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    groupsIndexReducer: state.groupsIndexReducer,
    groupsDataReducer: state.groupsDataReducer,
    selectionsReducer: state.selectionsReducer,
    contextIdReducer: state.contextIdReducer,
    resourcesReducer: state.resourcesReducer,
    projectDetailsReducer: state.projectDetailsReducer,
    groupMenuReducer: state.groupMenuReducer,
    currentToolReducer: state.currentToolReducer,
    remindersReducer: state.remindersReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      changeCurrentContextId: contextId => {
        dispatch(changeCurrentContextId(contextId));
      },
      onToggleMenu: () => {
        dispatch(toggleMenu());
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupMenuContainer);
