describe("Passeimal.StepInput", function(){
	var stepInput, input, callback, event, step;

	beforeEach(function(){
		callback = jasmine.createSpy();
		input = $("<input/>").val("some thing");
		stepInput = new Passeimal.StepInput(input);
	});

	it("triggers enter event", function(){
		event = $.Event("keydown"); //creates a new event
		event.which = 13;

		stepInput.emitter.on("enter", callback);
		input.trigger(event); //mimic <enter> key

		expect(callback).toHaveBeenCalled();
	});

	it("skips enter event when pressing another key", function(){
		event = $.Event("keydown");
		event.which = 27;

		stepInput.emitter.on("enter", callback);
		input.trigger(event); //mimic <enter> key

		expect(callback).not.toHaveBeenCalled();
	});

	it("emits input value", function(){
		event = $.Event("keydown"); //creates a new event
		event.which = 13;

		stepInput.emitter.on("enter", callback);
		input.trigger(event); //mimic <enter> key

		expect(callback).toHaveBeenCalledWith("some thing");
	});

	it("clears content", function() {
		stepInput.clear();
		expect(input.val()).toEqual('');
	});

});