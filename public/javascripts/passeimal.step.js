;(function(Passeimal){
	Passeimal.Step = function(attributes){
		this.emitter = async.emitter();
		this.on = $.proxy(this.emitter, "on");
		this.errors = [];

		this.assignAttributes(attributes);
	};

	Passeimal.Step.prototype.assignAttributes = function(attributes) {
		for (var name in attributes){
			if (!attributes.hasOwnProperty(name))
				continue;
			this[name] = attributes[name];
		}
	};

	Passeimal.Step.prototype.save = function() {
		if (this.isValid()){
			this.id = Math.floor((Math.random() * 10000) + 1);
			this.emitter.emit("save", this);
		}else{
			this.emitter.emit("invalid", this);
		}
	};

	Passeimal.Step.prototype.isValid = function() {
		this.errors = [];
		if (!this.description){
			this.errors.push("Description is required");
			return false;
		}
		return true;
	};

	Passeimal.Step.prototype.destroy = function() {
		this.emitter.emit("destroy", this);
	};
})(Passeimal);