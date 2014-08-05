SwitchOverController = function(vent) {
    this.vent = vent;
};

_.extend(SwitchOverController.prototype, {

    bind : function(opts) {

        opts.listView.$el.addClass('appear');

        this.vent.on('rule:edit:request', function() {

            opts.listView.$el.removeClass('appear');
            opts.formView.$el.addClass('appear');

        });

        this.vent.on('rule:edit:done rule:edit:cancel', function() {

            opts.formView.$el.removeClass('appear');
            opts.listView.$el.addClass('appear');

        });

    }

});