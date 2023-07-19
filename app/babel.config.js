module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      
      [
          'react-native-reanimated/plugin', {
              relativeSourceLocation: true,
          },
          '@babel/plugin-proposal-export-namespace-from',
      ]
  ],
  };
};
