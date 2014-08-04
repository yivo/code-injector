Entities.RuleCollection = Backbone.Collection.extend({
	
	model : Entities.Rule,
	
	initialize : function(models, opts) {
		this.vent = opts.vent;
		this.listenTo(this.vent, 'rule:edit:done', function(rule) {
			if (!this.contains(rule)) {
				this.add(rule, { at : 0 });
			}
		});
	}
	
});