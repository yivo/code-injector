Entities.Model = Backbone.Model.extend({
	
	constructor : function(attrs, opts) {
		if (opts && opts.vent) {
			this.vent = opts.vent;
		}
		return Backbone.Model.apply(this, arguments);
	}

});