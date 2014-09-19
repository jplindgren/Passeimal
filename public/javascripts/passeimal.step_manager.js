;(function(Passeimal){
	Passeimal.StepManager = function(stepInput){
		this.stepInput = stepInput;
		this.emitter = async.emitter();
		this.on = $.proxy(this.emitter, "on");

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

		step.save();
	};

	Passeimal.StepManager.prototype.whenSavingStep = function(step) {
		this.emitter.emit("add", step);
		console.log(this.stepInput);
		console.log(this.stepInput.clear());
		this.stepInput.clear();
	};

	Passeimal.StepManager.prototype.whenInvalidStep = function(step) {
		alert(step.errors.join("\n"));
	};
})(Passeimal);