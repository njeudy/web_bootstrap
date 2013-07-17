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
          this.$secondary_menus = this.getParent().$el.find('.oe_secondary_menus_container2');
          //NJEUDY: remove onclick action
          //this.$secondary_menus.on('click', 'a[data-menu]', this.on_menu_click);

          //return this.do_reload();
      },

      menu_loaded: function(data) {
          var self = this;
          this.data = {data: data};
          this.renderElement();
          // NJEUDY: auto action on menu for new menu
          this.$secondary_menus.html(QWeb.render("Menu.secondary2", { widget : this }));
          
          //this.$el.on('click', 'a[data-menu]', this.on_menu_click);

          // Hide second level submenus
          //this.$secondary_menus.find('.oe_menu_toggler').siblings('.oe_secondary_submenu2').hide();
          // NJEUDY: remove buggy current menu with bootstrap.
          //if (self.current_menu) {
          //    self.open_menu(self.current_menu);
          //}
          //this.trigger('menu_loaded', data);
          this.has_been_loaded.resolve();
      }, 

    /**
     * Opens a given menu by id, as if a user had browsed to that menu by hand
     * except does not trigger any event on the way
     *
     * @param {Number} id database id of the terminal menu to select
     */
    open_menu: function (id) {
        this.current_menu = id;
        this.session.active_id = id;
        var $clicked_menu, $sub_menu, $main_menu;
        $clicked_menu = this.$el.add(this.$secondary_menus).find('a[data-menu=' + id + ']');
        $clicked_panel_menu = this.$el.add(this.$secondary_menus).find('a[class="oe_menu_leaf"][data-menu='+ id + '],[class="not_empty"][data-menu='+ id + ']')
        this.trigger('open_menu', id, $clicked_menu);

        if (this.$secondary_menus.has($clicked_menu).length) {
            $sub_menu = $clicked_menu.parents('.oe_secondary_menu');
            $main_menu = this.$el.find('a[data-menu=' + $sub_menu.data('menu-parent') + ']');
        } else {
            $sub_menu = this.$secondary_menus.find('.oe_secondary_menu2[data-menu-parent=' + $clicked_menu.attr('data-menu') + ']');
            $main_menu = $clicked_menu;
        }

        // Activate current main menu
        this.$el.find('.oe_active').removeClass('oe_active');
        $main_menu.addClass('oe_active');

        // Show current sub menu
        this.$secondary_menus.find('.oe_secondary_menu2').hide();
        $sub_menu.show();

        // Hide/Show the leftbar menu depending of the presence of sub-items
        this.$secondary_menus.parent('.oe_leftbar').toggle(!!$sub_menu.children().length);

        // Activate current menu item and show parents
        this.$secondary_menus.find('.oe_active').removeClass('oe_active');
        if ($main_menu !== $clicked_menu) {
            $clicked_panel_menu.parents().show();
            $clicked_panel_menu.parents().find('.collapse').removeClass('in');
            $clicked_panel_menu.siblings().addClass('collapse in');
            $clicked_panel_menu.parents().addClass('in');
            $clicked_menu.parent().addClass('oe_active');
        }
    },

    });


};

