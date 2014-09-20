describe("Step.StepManager", function(){
	var manager, stepInput, callback, step;

	beforeEach(function(){
		//we just need stepInput to trigger a enter event. We can instantiate any object that triggers it. 
		//some kind of mock
		//stepInput = async.emitter();
		//spyOn(stepInput, "on"); //we spy stepInput.on to check if it was called

		stepInput = jasmine.createSpyObj("stepInput", ["on","clear"]);
		manager = new Passeimal.StepManager(stepInput);

	 	// mock/double (fake object)
    step = jasmine.createSpyObj("step", ["on", "save", "errors"]);
    // stub (forges method/function call)
    spyOn(Passeimal, "Step").and.returnValue(step);
    //create generic callback
    callback = jasmine.createSpy();
	});

	it("sets event listeners", function(){
		expect(stepInput.on).toHaveBeenCalledWith("enter", manager.onEnter, manager);
	});

	it("initializes step with attributes", function() {
	    manager.onEnter("Some step");
	    expect(Passeimal.Step).toHaveBeenCalledWith({ description: "Some step" });
  });

  it("listens to the step's save event", function() {
  	spyOn($, "proxy").and.returnValue(callback);
  	manager.onEnter("Some step");
  	expect(step.on).toHaveBeenCalledWith("save", callback);
  	expect($.proxy).toHaveBeenCalledWith(manager, "whenSavingStep");
  });

  it("listens to the step's invalid event", function() {
  	spyOn($, "proxy").and.returnValue(callback);
  	manager.onEnter("");
  	expect(step.on).toHaveBeenCalledWith("invalid", callback);
  	expect($.proxy).toHaveBeenCalledWith(manager, "whenInvalidStep");
  });

  it("listens to the step's destroy event", function() {
    spyOn($, "proxy").and.returnValue(callback);
    manager.onEnter("");
    expect(step.on).toHaveBeenCalledWith("destroy", callback);
    expect($.proxy).toHaveBeenCalledWith(manager, "whenDestroyingStep");
  });

  it("should saves step", function() {
  	manager.onEnter("Some step");
  	expect(step.save).toHaveBeenCalled();
	});

  it("should add step to cache list when saving", function() {
    step.id = "1234";
    manager.whenSavingStep(step);
    expect(manager.stepsCache[step.id]).toEqual(step);
  });

	it("triggers add event when saving step", function() {
		manager.on("add", callback);
		manager.whenSavingStep(step);
		expect(callback).toHaveBeenCalledWith(step);
	});

  it("triggers destroy event when destroing step", function() {
    manager.on("destroy", callback);
    manager.whenDestroyingStep(step);
    expect(callback).toHaveBeenCalledWith(step);
  });

  it("should remove step from cache list when destroying", function() {
    manager.stepsCache[step.id] = step;
    manager.whenDestroyingStep(step);
    expect(manager.stepsCache).not.toBeDefined();
  });

	it("displays error message", function() {
    step = { errors: ["Error 1", "Error 2"] };

    spyOn(window, "alert");
    manager.whenInvalidStep(step);

    expect(window.alert).toHaveBeenCalledWith("Error 1\nError 2");
  });

  it("clears content when saving step", function() {
		manager.whenSavingStep(step);
		expect(stepInput.clear).toHaveBeenCalled();
  });
});
