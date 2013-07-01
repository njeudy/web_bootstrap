
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

    oe.web.Menu = oe.web.Menu.extend({

      start: function() {
          this._super.apply(this, arguments);
          this.$secondary_menus = this.getParent().$el.find('.oe_secondary_menus_container');
          //NJEUDY: remove onclick action
          //this.$secondary_menus.on('click', 'a[data-menu]', this.on_menu_click);
          return this.do_reload();
      },

      menu_loaded: function(data) {
          var self = this;
          this.data = {data: data};
          this.renderElement();
          // NJEUDY: auto action on menu for new menu
          //this.$secondary_menus.html(QWeb.render("Menu.secondary", { widget : this }));
          //this.$el.on('click', 'a[data-menu]', this.on_menu_click);

          // Hide second level submenus
          this.$secondary_menus.find('.oe_menu_toggler').siblings('.oe_secondary_submenu').hide();
          // NJEUDY: remove buggy current menu with bootstrap.
          //if (self.current_menu) {
          //    self.open_menu(self.current_menu);
          //}
          this.trigger('menu_loaded', data);
          this.has_been_loaded.resolve();
      }, 


    });

};

