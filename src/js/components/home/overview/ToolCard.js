import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Line } from 'react-progressbar.js';
import PropTypes from 'prop-types';
import TemplateCard from './TemplateCard';

class ToolCard extends Component {

  heading(callback) {
    let link = this.content() ? <a onClick={callback}>Change Tool</a> : <a></a>
    return (
      <span>Current Tool {link}</span>
    );
  }

  progress(groupsData) {
    let percent;
    let groupIds = Object.keys(groupsData);
    let totalChecks = 0, completedChecks = 0;
    groupIds.map( groupId => {
      let groupData = groupsData[groupId];
      groupData.forEach( check => {
        totalChecks += 1;
        completedChecks += (check.selections) ? 1 : 0;
      });
    });
    percent = Math.round(completedChecks / totalChecks * 100) / 100;
    return percent;
  }

  content() {
    let content;
    let { toolTitle } = this.props.reducers.currentToolReducer;

    if (toolTitle) {
      let { groupsData } = this.props.reducers.groupsDataReducer;
      let progress = 0;
      if (groupsData) progress = this.progress(groupsData);

      let options = {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 1000,
        color: 'var(--accent-color-dark)',
        trailColor: 'var(--background-color-light)',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
      };

      let containerStyle = { marginTop: '18px', height: '20px', border: '2px solid var(--accent-color-dark)' };
      content = (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-10px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '100px', height: '110px', color: 'lightgray', margin: '-6px 20px 0 -16px', overflow: 'hidden'}}>
              <Glyphicon glyph="check" style={{ fontSize: "120px", margin: '-10px 0 0 -25px'}} />
            </div>
            <div style={{ width: '400px' }}>
              <strong style={{ fontSize: 'x-large' }}>{toolTitle}</strong>
              <Line
                progress={progress}
                text={ progress * 100 + '%'}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
              />
            </div>
          </div>
        </div>
      );
    }
    return content;
  }

  disabled() {
    let { projectSaveLocation } = this.props.reducers.projectDetailsReducer;
    return !projectSaveLocation;
  }

  render() {
    let emptyMessage = 'Select a tool';
    let emptyButtonLabel = 'Tool';
    let emptyButtonOnClick = () => { this.props.actions.goToNextStep() };
    return (
      <TemplateCard
        heading={this.heading(emptyButtonOnClick)}
        content={this.content()}
        emptyMessage={emptyMessage}
        emptyButtonLabel={emptyButtonLabel}
        emptyButtonOnClick={emptyButtonOnClick}
        disabled={this.disabled()}
      />
    )
  }
}

ToolCard.propTypes = {
  reducers: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default ToolCard;
