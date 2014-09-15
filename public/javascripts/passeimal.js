;(function(){
	var Passeimal;
	window.Passeimal = Passeimal = {};

	Passeimal.init = function(html){
		this.html = $(html);
		this.loader = new Passeimal.Loader(
			this.html.find(".loading"),
			this.html.find(".page")
		);

		this.stepInput = new Passeimal.StepInput(
			this.html.find(".step-input")
		);

		//manages the stepInput enter event and create a new step.
		this.stepManager = new Passeimal.StepManager(
			this.stepInput
		);

		//handle step rendering
		this.stepList = new Passeimal.StepList(
			this.stepManager,
			this.html.find(".steps")
		);

		this.loader.init();
	};
})();