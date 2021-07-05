module.exports = {
  getFirst50words: (s, words = 20) => {
    return s.split(/\s+/).splice(1, words).join(" ");
  },

  countWords: (s) => {
    return s.split(/\s+/).length;
  },

  toTitleCase: (s) => {
    return s.replace(/\w\S*/g, function (txt) {
      return `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`;
    });
  },
};
