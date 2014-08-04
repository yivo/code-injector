var TemplateCache = {

	get : function(selector) {
		if (!this.__cache) {
			this.__cache = {};
		}
		if (!this.__cache[selector]) {
			var html = $(selector).html();
			var tmpl = _.template(html);
			this.__cache[selector] = tmpl;
		}
		return this.__cache[selector];
	}

};