/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(['system/process'],function(Process) {
	describe('Process', function(){
	    describe('Process()', function(){
	    })
	});
});

/**
 * Copyright © 2012 Ramón Lamana
 */
// var Process = require('../src/terminus/process');

// describe("Process", function() {
// 	var process, input, stdout, stderr, stdweb;

// 	beforeEach(function() {
// 		this.addMatchers({
// 			toBeInstanceOf: function (expected) {return this.actual instanceof expected;}
// 		});

// 		input = new Streams.Input();
// 		stdout = new io.OutputStream();
// 		stderr = new io.OutputStream();
// 		stdweb = new io.OutputStream();
// 	});

// 	it("should have a pid equal to 0", function() {
// 		process = new Process();
// 		expect(process.pid).toBe(0);
// 	});

// 	it("should have a pid equal to 1", function() {
// 		process = new Process();
// 		expect(process.pid).toBe(1);
// 	});

// 	it("should emit the exit event with value 0", function() {
// 		var exit = false;
// 		process = new Process();
// 		process.events.on('exit', function(value) {
// 			expect(value).toBe('0');
// 			exit = true;
// 		}, this);

// 		process.exit();

// 		waits(500);

// 		expect(exit).toBe(true);
// 	});

// 	it("should have an input stream instance", function() {
// 		process = new Process(input, stdout, stderr, stdweb);
// 		expect(process.inputStream).toBeInstanceOf(io.InputStream);
// 	});

// 	it("should have an output stream instance for stdout", function() {
// 		process = new Process(input, stdout, stderr, stdweb);
// 		expect(process.outputStream.std).toBeInstanceOf(io.OutputStream);
// 	});

// 	it("should have an output stream instance for stderr", function() {
// 		process = new Process(input, stdout, stderr, stdweb);
// 		expect(process.outputStream.err).toBeInstanceOf(io.OutputStream);
// 	});

// 	it("should have an output stream instance for stdweb", function() {
// 		process = new Process(input, stdout, stderr, stdweb);
// 		expect(process.outputStream.web).toBeInstanceOf(io.OutputStream);
// 	});
// });
