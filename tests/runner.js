// Configure RequireJS
require.config({
  baseUrl:'../',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require(['vendor/chai', 'vendor/mocha'], function(chai){

  // Chai
  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  // Mocha
  mocha.setup('bdd');

  // Require base tests before starting
  require(['tests/specs/process'], function(process){
    // Start runner
    mocha.run();
  });

});
