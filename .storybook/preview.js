
module.exports = {
  decorators: [],
  loaders: [
    async () => ({
      ready: 
        // need to import store here so that addon-redux can detect it
        await import('../stories/store')
        .then(() => {
          console.log('Store initialized');
          return true;
        }),
    }),
  ]
};
