;(function(Passeimal){
	Passeimal.Loader = function(loading, page){
		this.loading = loading;
		this.page = page;
	};

	Passeimal.Loader.prototype.init = function() {
		this.loading.addClass('hidden');
		this.page.removeClass('hidden');
	};
})(Passeimal);