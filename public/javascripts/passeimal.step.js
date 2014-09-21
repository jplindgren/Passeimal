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
			console.log(name);
			this[name] = attributes[name];
		}
	};

	Passeimal.Step.prototype.attributes = function() {
	    return { description: this.description };
	  };

	Passeimal.Step.prototype.save = function() {
		if (this.isValid()){
			this.create();
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
	    var result; // hoisting

	    result = $.ajax({
	        url: "http://localhost:12118/api/v1/step/" + this.id
	      , type: "delete"
	      , dataType: "json"
	    });

	    result.success($.proxy(function(data){
	      this.emitter.emit("destroy", this);
	    }, this));
  	};

  Passeimal.Step.prototype.create = function() {
  	//this.id = Math.floor((Math.random() * 10000) + 1);
	
    var result = $.ajax({
        url: "http://localhost:12118/api/v1/step"
      , type: "POST"
      , data: this.attributes()
      , dataType: "json"
    });

    result.success($.proxy(function(data){
      this.assignAttributes(data);
      this.emitter.emit("save", this);
    }, this));

    result.error($.proxy(function(xhr){
      try {
        this.assignAttributes($.parseJSON(xhr.responseText));
        this.emitter.emit("invalid", this);
      } catch(e) {
        this.emitter.emit("error", e);
      }
    }, this));
  };
})(Passeimal);