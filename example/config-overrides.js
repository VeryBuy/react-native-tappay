module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '^react-native$': 'react-native-web',
  };

  return config;
};
