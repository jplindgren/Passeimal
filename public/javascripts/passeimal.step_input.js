;(function(Passeimal){
	Passeimal.StepInput = function(element){
		this.element = element;
		this.emitter = async.emitter();
		this.on = $.proxy(this.emitter, "on");

		this.addEventListeners();
	};

	Passeimal.StepInput.prototype.addEventListeners = function() {
		this.element.on("keydown", $.proxy(this, "onKeyDown"))
	};

	Passeimal.StepInput.prototype.clear = function() {
		this.element.val('');
	};

	Passeimal.StepInput.prototype.onKeyDown = function(event) {
		if (event.which !== 13 && event.which !== 9)
			return true;

		event.preventDefault();
		this.emitter.emit("enter", event.target.value);
	};
})(Passeimal);