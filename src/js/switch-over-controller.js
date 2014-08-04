var SwitchOverController = function(vent) {
	this.vent = vent;
};

_.extend(SwitchOverController.prototype, {

	bind : function(opts) {
		
		this.vent.on('rule:edit:request', function() {
			
			opts.listView.$el.hide();
			opts.formView.$el.fadeIn(200);
		
		});
		
		this.vent.on('rule:edit:done rule:edit:cancel', function() {
		
			opts.formView.$el.hide();
			opts.listView.$el.fadeIn(200);
		
		});
		
	}

});