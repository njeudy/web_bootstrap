
openerp.web_bootstrap = function (oe) {

    var QWeb = oe.web.qweb,
    _t  = oe.web._t,
    _lt = oe.web._lt;

    oe.web.views.add('form', 'openerp.web_bootstrap.FormView');
    oe.web_bootstrap.FormView = oe.web.FormView.extend({

        display_name: _lt('Form'),
        load_form: function() {

            var self = this;
            return $.when(this._super.apply(this, arguments)).then(function() {
                Holder.run();
                self.$el.find('.dropdown-toggle').dropdown();
                self.$el.find('.carousel').carousel();
  	    });
        }

    });
};

