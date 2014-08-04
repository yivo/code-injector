Views.Base = Backbone.View.extend({
	
	templateHelpers : {
	
		renderSwitcher : function(enabled) {
			return [
				'<a class="pure-button switcher ',
				enabled ? 'on' : 'off',
				'" href="#">',
				enabled ? 'ON' : 'OFF',
				'</a>'
			].join('');
		},
		
		renderTextarea : function(opts) {
			var rows;
			if (!opts.value || !opts.value.length) {
				rows = opts.rows;
			} else {
				rows = Math.ceil(opts.value.length / opts.cols);
				var matches = opts.value.match(/\n/g);
				if (matches) rows += matches.length;
			}
			return [
				'<textarea rows="',
				rows, '" cols="', opts.cols,
				'" class="pure-input" placeholder="',
				opts.placeholder, '">', opts.value,
				'</textarea>'
			].join('');
			
		}
	},
	
	constructor : function(opts) {
		if (opts && opts.vent) {
			this.vent = opts.vent;
		}
		return Backbone.View.apply(this, arguments);
	},
	
	render : function() {
		this.undelegateEvents();
		var data;
		if (this.model) {
			data = this.model.toJSON();
		}
		if (this.collection) {
			(data || (data = {})).items = this.collection.toJSON();
		}
		if (this.templateHelpers) {
			if (!data) data = {};
			_.extend(data, this.templateHelpers);
		}
		this.$el.html(TemplateCache.get(this.template)(data));
		this.delegateEvents();
		return this;
	}
	
});