var App = {

	start : function() {
		
		var vent = _.extend({}, Backbone.Events);
		
		var rules = new Entities.RuleCollection(null, { vent : vent });
		
		var model = new Entities.Injector(null, {
			vent : vent, rules : rules
		});
		
		model.fetch().done(function() {
			var listView = new Views.RuleList({
				vent : vent,
				collection : model.rules,
				el : $('#list-region')
			});
			
			var formView = new Views.RuleForm({
				vent : vent,
				el : $('#form-region')
			});
			
			var soc = new SwitchOverController(vent);
			soc.bind({ listView : listView, formView : formView });
			
		});
		
	}

};

$(function() {
    App.start();
});