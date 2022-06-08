module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }], // optional: react: this resolves react-files (jsx, tsx)
    '@babel/preset-typescript' // allows  to use TypeScriptc
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties', // transforms static class properties as well as properties declared with the property initializer syntax
    'jsx-classnames-advanced' // optional: react: this resolves className={object}
  ]
};
