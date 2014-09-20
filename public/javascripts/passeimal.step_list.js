;(function(Passeimal){
	Passeimal.StepList = function(stepManager, htmlList){
		this.stepManager = stepManager;
		this.htmlList = htmlList;

		this.addEventListeners();
	};

	Passeimal.StepList.prototype.addEventListeners = function() {
		this.stepManager.on("add", this.add, this); //when listen to "add", trigger "this.onAdd" with the emitted entity in that case (this === step)
		this.stepManager.on("destroy", this.destroy, this);
		this.htmlList.on('click', '.remove', $.proxy(this, "onDestroy")); 
	};

	Passeimal.StepList.prototype.add = function(step) {
		var rendered = Handlebars.templates.step(step);
		this.htmlList.append(rendered);
	};

	Passeimal.StepList.prototype.destroy = function(step) {
		var stepHtml = this.htmlList.find('#step-' + step.id);
		stepHtml.fadeOut("fast",function(){
			stepHtml.remove();
		});
	};

	Passeimal.StepList.prototype.onDestroy = function(event) {
		var destroyButton = $(event.target);
		var stepId = destroyButton.parent().data("id");
		var step = this.stepManager.find(stepId);

		step.destroy();
	};
})(Passeimal)