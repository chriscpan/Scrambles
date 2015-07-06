Scrambles.Views.GameViews = Backbone.View.extend({
  tagName: 'div class=gameview-container',

  template: JST['GameView'],

  initialize: function(options) {
    this.leaderboard = new Scrambles.Views.LeadBoard({
      scores: options.scores
    });
    this.game = new Scrambles.Views.Game({
      words: options.words,
      scores: options.scores
    });
    this.stats = new Scrambles.Views.Stat({

    });

  },

  render: function() {
    $('body').append(this.leaderboard.render().$el);
    this.$el.html(this.game.render().$el);
    this.$el.append(this.stats.render().$el);
    return this;
  }
})
