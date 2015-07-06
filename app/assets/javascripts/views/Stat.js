Scrambles.Views.Stat = Backbone.View.extend({
  tagName: 'div class=stats',

  template: JST['Stat'],

  render: function(){
    var content = this.template({

    });
    this.$el.html(content);
    return this;
  }
});
