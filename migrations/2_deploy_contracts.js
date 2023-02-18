const contract = artifacts.require("decentPDS");

module.exports = function(deployer) {
  deployer.deploy(contract);
};
