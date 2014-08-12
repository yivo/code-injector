Entities.Rule = Entities.Model.extend({

    defaults: {
        enabled: true,
        name: '',
        position: 0
    },

    initialize: function() {
        if (!this.get('id') || !this.id) {
            this.set('id', guid());
        }
    }

});