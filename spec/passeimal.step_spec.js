describe("Passeimal.Step", function(){
	var step, callback;

	beforeEach(function(){
		callback = jasmine.createSpy();
		step = new Passeimal.Step();
		step.description = "Eskimó";
	});

	it("requires description", function(){
		step.description = null;
		expect(step.isValid()).toBeFalsy();
		expect(step.errors).toContain("Description is required");
	});

	it("empty errors after succesfull validation", function(){
		step.description = null;
		step.isValid();

		step.description = "Eskimó";
		expect(step.isValid()).toBeTruthy();
		expect(step.errors).toEqual([]);
	});

	it("assign attributes", function(){
		value = "Eskimó"
		step = new Passeimal.Step({
			description: value
		});

		expect(step.description).toEqual(value);
	});

	it("trigger save event when saving object", function(){
		step.on("save", callback);
		step.save();

		expect(callback).toHaveBeenCalled();
	});

	it("passes step as argument when saving event is emitted", function(){
		step.on("save", callback);
		step.save();

		expect(callback).toHaveBeenCalledWith(step);
	});

	it("passes step as argument when invalid event is emitted", function(){
		step.description = null;
		step.on("invalid", callback);
		step.save();

		expect(callback).toHaveBeenCalledWith(step);
	});
});