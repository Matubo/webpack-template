function test(req, res) {
  res.json('Test');
}

module.exports = proxy = {
  changeHost: true,
  httpProxy: {
    options: {
      ignorePath: true
    }
  },
  listeners: {},
  'POST /test': test
};
