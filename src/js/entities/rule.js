Entities.Rule = Entities.Model.extend({

	defaults : {
		enabled : true,
		name : ''
	},
	
	initialize : function() {
		if (!this.get('id') || !this.id) {
			this.set('id', _.uniqueId());
		}
	}

});