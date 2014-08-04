var UiSwitcher = Backbone.View.extend({
	
	events : {
		'click .switcher' : 'switched'
	},
	
	initialize : function() {
		_.bindAll(this, 'switched');
	},
	
	switched : function(e) {
		e.preventDefault();
		var $el = $(e.currentTarget);
		if ($el.hasClass('on')) {
			$el.removeClass('on').addClass('off').text('OFF');
		} else {
			$el.removeClass('off').addClass('on').text('ON');
		}
		this.trigger('switch', this, $el.hasClass('on'), $el);
	}

});