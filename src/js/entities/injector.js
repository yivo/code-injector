Entities.Injector = Entities.Model.extend({

	initialize : function(attrs, opts) {
		this.rules = opts.rules;
		this.save = _.debounce(this.save.bind(this), 30);
		this.listenTo(this.rules, 'add remove change save', this.save);
	},
	
	fetch : function() {
		var defer = $.Deferred();
		var self = this;
		
		chrome.storage.sync.get('injector', function(data) {
			self.set( _.omit(data.injector, 'rules') );
			self.rules.reset(data.injector ? data.injector.rules : null);
			defer.resolve(self);
		});
		
		return defer.promise();
	},
	
	save : function() {
		chrome.storage.sync.set({ injector : this.toJSON() });
	},
	
	toJSON : function() {
		return _.extend(Entities.Model.prototype.toJSON.call(this), { rules : this.rules.toJSON() });
	}
	
});