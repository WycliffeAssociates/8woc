var checks = [
  {
    book: "Ephesians",
    chapter: 1,
    verse: 11,
    phrase: "God the Father",
    checkedStatus: "NOT_CHECKED"
  },
  {
    book: "Ephesians",
    chapter: 2,
    verse: 12,
    phrase: "Jesus Christ",
    checkedStatus: "NOT_CHECKED"
  },
  {
    book: "Ephesians",
    chapter: 3,
    verse: 13,
    phrase: "Holy Spirit",
    checkedStatus: "NOT_CHECKED"
  }
];

var checkIndex = 0;

module.exports = {
  getAllChecks: function() {
    return checks;
  },
  getCurrentCheck: function() {
    return checks[checkIndex];
  }
};