var UiTextareaBehaviour = Backbone.View.extend({
	
	events : {
		'keydown textarea' : 'keydownEvent'
	},
	
	keydownEvent : function(e) {
		if(e.keyCode === 9) { // tab was pressed
			var el = e.currentTarget;
			var $el = $(el);
			
			// get caret position/selection
			var start = el.selectionStart;
			var end = el.selectionEnd;
			var value = $el.val();
			
			// set textarea value to: text before caret + tab + text after caret
			$el.val(value.substring(0, start) + '    ' + value.substring(end));
			
			// put caret at right position again (add one for the tab)
			el.selectionStart = el.selectionEnd = start + 4;

			// prevent the focus lose
			e.preventDefault();
		}
	}
	
});