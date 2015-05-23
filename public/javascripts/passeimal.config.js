;(function(Passeimal){
		Passeimal.GlobalConfig = {			
			baseUrl: 'http://localhost:38383/api',
			resolveUrl: function(action){
				return this.baseUrl + action;
			}
		}
})(Passeimal);