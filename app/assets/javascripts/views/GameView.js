Scrambles.Views.GameViews = Backbone.View.extend({
  tagName: 'div class=gameview-container',

  template: JST['GameView'],

  initialize: function(options) {
    this.game = new Scrambles.Views.Game({
      words: options.words
    });
    this.stats = new Scrambles.Views.Stat({

    });
  },

  render: function() {
    this.$el.html(this.game.render().$el);
    this.$el.append(this.stats.render().$el);
    return this;
  }
})
