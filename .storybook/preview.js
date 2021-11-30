
module.exports = {
  decorators: [],
  loaders: [
    async () => ({
      store: await import('../stories/store')
    })
  ]
};
