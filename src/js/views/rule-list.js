Views.RuleList = Views.Base.extend({
	
	template : '#rule-list-template',
	
	events : {
		'click .js-action-add' 		: 'newRule',
		'click .js-action-edit' 	: 'editRule',
		'click .js-action-remove' 	: 'removeRule'
	},
	
	initialize : function() {
		_.bindAll(this, 'newRule', 'editRule', 'removeRule');
		this.listenTo(this.vent, 'rule:edit:done', this.render);
		this.render();
		this.switcher = new UiSwitcher({ el : this.el });
		this.listenTo(this.switcher, 'switch', this.__enableOrDisableRule);
	},
	
	newRule : function(e) {
		e.preventDefault();
		var rule = new Entities.Rule();
		this.vent.trigger('rule:edit:request', rule);
	},
	
	editRule : function(e) {
		e.preventDefault();
		var rule = this.collection.get($(e.currentTarget).closest('.js-rule').data('id'));
		this.vent.trigger('rule:edit:request', rule);
	},
	
	removeRule : function(e) {
		e.preventDefault();
		var $rule = $(e.currentTarget).closest('.js-rule');
		var model = this.collection.get($rule.data('id'));
		this.collection.remove(model);
		$rule.remove();
	},
	
	__enableOrDisableRule : function(switcher, enabled, $el) {
		var model = this.collection.get($el.closest('.js-rule').data('id'));
		model.set('enabled', enabled);
	}
	
});