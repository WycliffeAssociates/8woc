// MenuHeaders.js//
//api imports
const api = window.ModuleApi;
const React = api.React;
const ReactBootstrap = api.ReactBootstrap;
const style = require('./Style');
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;

class MenuHeaders extends React.Component {
  constructor(){
    super();
    this.state = {
      groupName: null,
    }
    this.groupName = null;
    this.updateCurrentMenuHeader = this.updateCurrentMenuHeader.bind(this);
    this.switchedToolNewMenuHeaders = this.switchedToolNewMenuHeaders.bind(this);
    this.getGroupProgress = this.getGroupProgress.bind(this);
  }

  componentWillMount(){
    api.registerEventListener('changeGroupName', this.updateCurrentMenuHeader);
    api.registerEventListener('changeCheckType', this.switchedToolNewMenuHeaders);
  }

  componentWillUnmount(){
    api.removeEventListener('changeGroupName', this.updateCurrentMenuHeader);
    api.removeEventListener('changeCheckType', this.switchedToolNewMenuHeaders);
  }

  handleSelection(groupName){
    api.setCurrentGroupName(groupName);
  }

  updateCurrentMenuHeader(params) {
    this.unselectOldMenuItem();
    this.groupName = params.groupName;
    this.selectNewMenuItem();
  }

  switchedToolNewMenuHeaders(){
    this.groupName = api.getCurrentGroupName();
  }

  unselectOldMenuItem() {
    if(this.groupName){
      var groupName = this.groupName;
      this.refs[`${groupName}`].setIsCurrentCheck(false);
    }
  }

  selectNewMenuItem() {
    if(this.groupName){
      var groupName = this.groupName;
      this.refs[`${groupName}`].setIsCurrentCheck(true);
    }
  }

  getGroupProgress(groupObj){
    var numChecked = 0;
    var numUnchecked = 0;
    for(let check in groupObj.checks){
      if(check.checkStatus != "UNCHECKED"){
        numChecked++;
      }else{
        numUnchecked++;
      }
    }
    return numChecked/(numChecked+numUnchecked);
  }

  render() {
    var groupsName = [];
    if(this.props.currentTool){
      var groupsObjects = api.getDataFromCheckStore(this.props.currentTool, 'groups');
      for(var i in groupsObjects){
        groupsName.push(
          <MenuHeadersItems key={i}
              handleSelection={this.handleSelection.bind(this, groupsObjects[i].group)}
              value={groupsObjects[i].group}
              progress={this.getGroupProgress(i)}
              ref={groupsObjects[i].group.toString()}/>
        );
      }
    }
    return (
      <table style={{color: "#FFF"}}>
        <tbody>
        {groupsName}
        </tbody>
      </table>
    );
  }

}

class MenuHeadersItems extends React.Component {
  constructor(){
    super();
    this.state = {
      isCurrentItem: false,
    }
  }

  groupNameClicked(){
    this.props.handleSelection();
    this.setIsCurrentCheck(true);
  }

  setIsCurrentCheck(status){
    this.setState({isCurrentItem: status});
  }


  render() {
    var itemStyle = this.state.isCurrentItem ? style.activeMenuHeader : style.menuHeader;

    return (
      <tr onClick={this.groupNameClicked.bind(this)}
          style={itemStyle}
          title="Click to select this reference">
        <th>
          <Circle
            progress={this.props.progress}
            options={{
              strokeWidth: 15,
              color: "#4ABBE6"
            }}
            initialAnimate={false}
            containerStyle={{
              width: '20px',
              height: '20px',
              marginRight: '5px'
            }}
          />
        </th>
        <td>
          {this.props.value}
        </td>
      </tr>
    );
  }
}


module.exports = MenuHeaders;
