module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "123",
      gas: 4700000
    },
    compilers: {
      solc: {
        version: "^0.5.15"
      }
    }
  }
};
