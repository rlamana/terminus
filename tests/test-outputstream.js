/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(['io/outputstream'], function(OutputStream) {
	var scope = {};

	describe('OutputStream', function() {
		var stdout, spy;
		beforeEach(function() {
			stdout = new OutputStream();
			spy = sinon.spy();
			stdout.events.on('data', spy, scope);
		});

		describe('When creating an output stream', function() {
			it('should have an event system', function() {
				expect(stdout.events).to.exist;
			});

			it('should not be marked as closed', function() {
				expect(stdout.close).to.not.be.true;
			});
		});

		describe('When calling to write()', function() {
			it('should emit "data" event when new string of data is written', function() {
				stdout.write('newvalue');
				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWith('newvalue')).to.be.true;
			});

			it('should emit "data" event and stringify a written numeric value like 3', function() {
				stdout.write(3);
				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWith('3')).to.be.true;
			});

			it('should emit "data" event and stringify a written object value like {}', function() {
				var strObject = ({}+'');

				stdout.write({});
				expect(spy.calledOnce).to.be.true;
				expect(spy.calledWith(strObject)).to.be.true;
			});
		});

		describe('When closing it', function() {
			beforeEach(function() {
				stdout.close = true;
			});

			it('should be marked as closed', function() {
				expect(stdout.close).to.be.true;
			});

			it('should not emit "data" when stream is closed', function() {
				stdout.write(3);
				expect(spy.called).to.be.false;
			});

			it('should not be opened again', function() {
				stdout.close = false;
				expect(stdout.close).to.be.true;
			});
		});
	});
});