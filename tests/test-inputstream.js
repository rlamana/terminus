/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(['io/inputstream', 'io/outputstream'], function(InputStream, OutputStream) {

	var scope = {};

	describe('InputStream', function() {
		var stdin, stdout, spydata, spyread;
		beforeEach(function() {
			stdin = new InputStream();
		
			spydata = sinon.spy();
			stdin.events.on('data', spydata, scope);

			spyread = sinon.spy();
			stdin.events.on('read', spyread, scope);
		});

		describe('When creating an input stream', function() {
			it('should have an event system', function() {
				expect(stdin.events).to.exist;
			});
		});

		describe('When creating a pipe', function() {
			beforeEach(function() {
				stdout = new OutputStream();
				stdin.pipe(stdout);
			});

			it('should emit "data" event when new string of data is written to the output stream', function() {
				stdout.write('newvalue');
				expect(spydata.calledOnce).to.be.true;
				expect(spydata.calledWith('newvalue')).to.be.true;
			});

			it('should emit "data" event and stringify a written numeric value like 3  to the output stream', function() {
				stdout.write(3);
				expect(spydata.calledOnce).to.be.true;
				expect(spydata.calledWith('3')).to.be.true;
			});

			it('should emit "data" event and stringify a written object value like {} to the output stream', function() {
				var strObject = ({}+'');

				stdout.write({});
				expect(spydata.calledOnce).to.be.true;
				expect(spydata.calledWith(strObject)).to.be.true;
			});

			it('should emit "read" event when read event is called', function() {
				stdin.read();
				expect(spyread.calledOnce).to.be.true;
			});

			it('should wait until end() is called while reading', function(done) {
				stdin.read().then(function(){
					done();
				});

				setTimeout(function(){
					stdin.end();
				}, 300);
			});

			it('should wait until end() and receive buffer data string', function(done) {
				stdin.read().then(function(data){
					expect(data).to.be.equal('Hello World!');
					done();
				});

				stdout.write('Hello');
				stdout.write(' World!');

				setTimeout(function(){
					stdin.end();
				}, 300);
			});

			it('should wait until end() and empty buffer for multiple reads', function(done) {
				// First read
				stdin.read().then(function(data){
					expect(data).to.be.equal('Hello World!');
					
					// Second read
					stdin.read().then(function(data){
						expect(data).to.be.equal('Hello again!');
						done();
					});

					stdout.write('Hello');
					stdout.write(' again!');

					setTimeout(function(){
						stdin.end();
					}, 300);
				});

				stdout.write('Hello');
				stdout.write(' World!');

				setTimeout(function(){
					stdin.end();
				}, 300);
			});
		})
	});
});