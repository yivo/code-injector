Entities.RuleCollection = Backbone.Collection.extend({

    model: Entities.Rule,

    initialize: function(models, opts) {
        this.vent = opts.vent;
        this.listenTo(this.vent, 'rule:edit:done', function(rule) {
            if (!this.contains(rule)) {
                rule.set('position', this.maxPosition() + 1, { silent: true });
                this.add(rule);
            }
        });
    },

    save: function() {
        this.trigger('save');
    },

    comparator: function(lhs, rhs) {
        return rhs.get('position') - lhs.get('position');
    },

    maxPosition: function() {
        return this.length ? _.max(this.pluck('position')) : 0;
    }

});