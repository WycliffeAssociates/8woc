var React = require('react');

var Menu = React.createClass({
  getInitialState: function(){
    return {current: 0}
  },
  passInfo: function(k, j, i){
    this.props.setNote(k);
    this.props.setRef(j);
    this.setState({current: i});
  },
  render: function(){
    var verseList = [];
    var scripture = this.props.verses;
    var _this = this;
    let i = 0;
    for(let type in scripture){
      verseList.push(
        <h3 className="listhead" key={type}>{type}</h3>
      );
      for(let verse in scripture[type].verses){
        let Book = scripture[type].verses[verse].book;
        let Chapter = scripture[type].verses[verse].chapter;
        let thisVerse = scripture[type].verses[verse].verse;
        let referenceString = Chapter + ":" + thisVerse;
        console.log(referenceString);
        verseList.push(
          <a
            key={i++}
            num={i}
            className="verseReference"
            onClick={
              function(){
                _this.passInfo(
                  scripture[type].verses[verse].phrase,
                  referenceString,
                  i
                )
              }
            }
            >
            {scripture[type].verses[verse].book + " " + referenceString}<br />
          </a>
        );
      }
    }
    return (
      <div>
        {verseList}
      </div>
    );
  }
});

module.exports = Menu;
