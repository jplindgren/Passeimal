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
		console.log(Handlebars.templates.step_template);
		var rendered = Handlebars.templates["step_template"](step).html();
		this.htmlList.append(rendered);
	};
})(Passeimal)