Scrambles.Views.Stat = Backbone.View.extend({
  tagName: 'div class=stats',

  template: JST['Stat'],

  initialize: function(){
    Scrambles.timer = 0;
  },

  render: function(){
    var content = this.template({

    });
    this.$el.html(content);
    return this;
  }
});
