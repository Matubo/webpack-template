module.exports = {
  '*.{css,scss,less}': ['stylelint --fix  --cache', 'prettier -w .'],
  '*.{js,ts,json}': ['eslint --fix --cache .', 'prettier -w .']
  // optional: disable prettier for html, md files (via removing next line)
  //"*.{html}": ["prettier --write"],
  //"*.{md}": ["markdownlint --fix **/*.md"],
};
