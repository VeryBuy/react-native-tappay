module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '^react-native$': 'react-native-web',
  };

  config.module.rules.push({
    // Most react-native libraries include uncompiled ES6 JS.
    test: /\.(j|t)s$/,
    include: new RegExp(
      ['node_modules/(', ['react-native-'].join('|'), ')'].join(''),
    ),
    loader: 'babel-loader',
    options: { cacheDirectory: true },
  });

  return config;
};
