/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(['io/inputstream', 'io/outputstream'], function(InputStream, OutputStream) {

	var scope = {};

	describe('InputStream', function() {
		var stdin, stdout;
		beforeEach(function() {
			stdin = new InputStream();
		});

		describe('When creating an input stream', function() {
			it('should have an event system', function() {
				expect(stdin.events).to.exist;
			});
		});

		describe('When calling read()', function() {
			var readerspy;
			beforeEach(function() {			
				readerspy = sinon.spy();
				stdin.reader = readerspy;
			});

			it('should call the reader() function with a promise', function() {
				var promise = stdin.read();
				expect(readerspy.calledOnce).to.be.true;
				expect(readerspy.calledWith(promise)).to.be.true;
			});
		});

		describe('When creating a pipe', function() {
			beforeEach(function() {
				stdout = new OutputStream();
				stdin.pipe(stdout);
			});

			it('should get the data written in the output stream', function(done) {
				stdout.write('newvalue');
				stdin.read().then(function(data){
					expect('newvalue').to.be.equal(data);
					done();
				});
			});

			it('should get stringified value when writting numeric value like 3', function(done) {
				stdout.write(3);
				stdin.read().then(function(data){
					expect('3').to.be.equal(data);
					done();
				});
			});

			it('should get stringified value when writting object value like {}', function(done) {
				var strObject = ({}+'');
				stdout.write({});
				stdin.read().then(function(data){
					expect(strObject).to.be.equal(data);
					done();
				});
			});

			it('should get the whole buffer data when writting several values', function(done) {
				stdout.write('Hello');
				stdout.write(' World!');
				stdin.read().then(function(data){
					expect('Hello World!').to.be.equal(data);
					done();
				});
			});
		})
	});
});