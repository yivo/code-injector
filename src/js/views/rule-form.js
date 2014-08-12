Views.RuleForm = Views.Base.extend({

	template : '#rule-form-template',
	
	events : {
		'click .js-action-add' 		: 'newListItem',
		'click .js-action-remove' 	: 'removeListItem',
		'click .js-action-save' 	: 'saveRule',
		'click .js-action-cancel'	: 'cancelEditRequest'
	},
	
	initialize : function() {
		_.bindAll(this, 'newListItem', 'removeListItem', 'saveRule');
		this.listenTo(this.vent, 'rule:edit:request', this.__onRuleEditRequest);
		this.switcher = new UiSwitcher({ el : this.el });
		new UiTextareaBehaviour({ el : this.el });
	},
	
	newListItem : function(e) {
		e.preventDefault();
		var $list = $(e.currentTarget).parent().siblings('.js-list');
		var subject = $list.data('subject');
		var prop = toCamelCase(subject + '-list-item-html');
		if (!this[prop]) {
			this[prop] = $('#' + subject + '-list-item-html').html();
		}
		$list.children('tbody').prepend(this[prop]);
	},
	
	removeListItem : function(e) {
		e.preventDefault();
		$(e.currentTarget).closest('.js-list-item').remove();
	},
	
	toJSON : function() {
		return {
			enabled : this.$('.switcher').hasClass('on'),
			name : this.$('input[name=name]').val(),
			targets : this.mapTargetValues(),
			css : this.mapScriptValues('css'),
			js : this.mapScriptValues('js'),
            runAt: this.$('#run-at').val()
		};
		
	},
	
	mapTargetValues : function() {
		return $('.js-list[data-subject=target] textarea').map(function() {
			return $(this).val(); 
		}).get();
	},
	
	mapScriptValues : function(subject) {
		return $('.js-list[data-subject=' + subject + '] textarea').map(function() {
			var value = $(this).val();
			return isUrl(value) ? { filepath : value } : { code : value }; 
		}).get();
	},
	
	saveRule : function(e) {
		e.preventDefault();
		if (this.model) {
			this.model.set(this.toJSON());
			this.vent.trigger('rule:edit:done', this.model);
		}
	},
	
	cancelEditRequest : function(e) {
		e.preventDefault();
		this.vent.trigger('rule:edit:cancel');
	},
	
	render : function() {
		Views.Base.prototype.render.apply(this, arguments);
		this.$('.ui-sortable').sortable();
		return this;
	},
	
	__onRuleEditRequest : function(rule) {
		this.model = rule;
		this.render();
	}

});