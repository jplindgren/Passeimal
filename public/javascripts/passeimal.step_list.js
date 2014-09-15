;(function(Passeimal){
	Passeimal.StepList = function(stepManager, htmlList){
		this.stepManager = stepManager;
		this.htmlList = htmlList;

		this.addEventListeners();
	};

	Passeimal.StepList.prototype.addEventListeners = function() {
		this.stepManager.on("add", this.onAdd, this);
	};

	Passeimal.StepList.prototype.onAdd = function(step) {
		var rendered = Handlebars.templates.step(step);
		this.htmlList.append(rendered);
	};
})(Passeimal)