/*---------------------------------------------------------
 * OpenERP web_google_chart
 *---------------------------------------------------------*/
google_jsapi_loaded = false; 
google_visualization_loaded = false;

openerp.web_bootstrap = function (oe) {

    var QWeb = oe.web.qweb,
    _t  = oe.web._t,
    _lt = oe.web._lt;

    oe.web.views.add('form', 'openerp.web_bootstrap.FormView');
    oe.web_bootstrap.FormView = oe.web.FormView.extend({

        display_name: _lt('Form'),
        load_form: function() {

            var self = this;
            this._super.apply(this, arguments);
            Holder.run();
        }
    });
};

// vim:et fdc=0 fdl=0: