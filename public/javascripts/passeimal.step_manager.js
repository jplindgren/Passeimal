;(function(Passeimal){
	Passeimal.StepManager = function(stepInput){
		this.stepInput = stepInput;
		this.emitter = async.emitter();
		this.on = $.proxy(this.emitter, "on");
		this.stepsCache = {};

		this.addEventListeners();
	};

	Passeimal.StepManager.prototype.addEventListeners = function() {
		this.stepInput.on("enter", this.onEnter, this);
	};

	Passeimal.StepManager.prototype.onEnter = function(stepDescription) {
		var step = new Passeimal.Step({
			description: stepDescription
		});


		step.on("save", $.proxy(this, "whenSavingStep"));
		step.on("invalid", $.proxy(this, "whenInvalidStep"));
		step.on("destroy", $.proxy(this, "whenDestroyingStep"));

		step.save();
	};

	Passeimal.StepManager.prototype.whenSavingStep = function(step) {
		this.emitter.emit("add", step);
		this.stepsCache[step.id] = step;
		this.stepInput.clear();
	};

	Passeimal.StepManager.prototype.whenDestroyingStep = function(step) {
		this.emitter.emit("destroy", step);
		delete(this.stepsCache[step.id]);
	};

	Passeimal.StepManager.prototype.find = function(id) {
		return this.stepsCache[id];
	};

	Passeimal.StepManager.prototype.whenInvalidStep = function(step) {
		alert(step.errors.join("\n"));
	};
})(Passeimal);