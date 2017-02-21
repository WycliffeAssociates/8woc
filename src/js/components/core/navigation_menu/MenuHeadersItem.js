
const api = window.ModuleApi;
const React = api.React;
const style = require('./Style');
const ProgressBar = require('react-progressbar.js');
const Circle = ProgressBar.Circle;
const {Glyphicon, Panel} = api.ReactBootstrap;
const SubMenu = require('./SubMenu.js');

class MenuHeadersItems extends React.Component {
  render() {
    var itemStyle = this.props.isCurrentItem ? style.activeMenuHeader : style.menuHeader;
    return (
      <tbody>
        <tr onClick={() => this.props.menuClick(this.props.id, this.props.currentToolNamespace)}
          style={itemStyle}
          title="Click to select this reference">
          <th>
            <Circle
              progress={this.props.currentGroupprogress}
              options={{
                strokeWidth: 15,
                color: "#4ABBE6",
                trailColor: "#FFF",
                trailWidth: 15
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
            {this.props.groups[this.props.id]['groupName']}
          </td>
          <td style={{paddingBottom:5}}>
            {this.props.isCurrentItem && this.props.openCheck == this.props.id && this.props.open ? <Glyphicon glyph="chevron-right" style={{ position: "absolute", right: "5px", top: "auto" }} /> :
              <Glyphicon glyph="chevron-down" style={{ position: "absolute", right: "5px", top: "auto" }} />}
          </td>
        </tr>
        {this.props.isCurrentItem && this.props.openCheck == this.props.id && this.props.open ?
          <tr>
            <td style={{paddingBottom:5}}>
              <SubMenu ref='submenu'
                checkClicked={this.props.checkClicked}
                currentBookName={this.props.currentBookName}
                isCurrentSubMenu={this.props.isCurrentSubMenu}
                currentSubGroupObjects={this.props.currentSubGroupObjects}
                currentCheckIndex={this.props.currentCheckIndex}
                currentGroupIndex={this.props.currentGroupIndex}
                currentToolNamespace={this.props.currentToolNamespace}
              />
            </td>
          </tr>
          : null}
      </tbody>
    );
  }
}
module.exports = MenuHeadersItems;
