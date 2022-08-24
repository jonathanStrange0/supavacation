var postcss = require("postcss");

module.export = postcss.plugin("postcss-warn-cleaner", function () {
  return function (css, result) {
    result.messages = [];
  };
});

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      "postcss-warn-cleaner": (css, result) => {
        result.messages = [];
      },
    },
  },
};
