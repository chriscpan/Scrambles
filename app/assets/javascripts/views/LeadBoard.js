Scrambles.Views.LeadBoard = Backbone.View.extend({
  template: JST['Modal'],

  events: {
    'submit form': 'createScore',
  },

  initialize: function(options) {
    this.scores = options.scores;
    this.listenTo(this.scores, 'sync add', this.render);
  },

  render: function() {
    var content = this.template({
      scores: this.scores
    });
    this.$el.html(content);
    return this;
  },

  createScore: function(event) {
    var data = $(event.target).serializeJSON();
    var score = new Scrambles.Models.Score({
      points: Scrambles.points
    });
    score.save(data, {
      success: function() {
        this.scores.add(score, {merge: true});
        this.scores.fetch();
        $('.form-container').html('');
      }.bind(this),
      error: function() {
        $('.error-msg').html('Insert a name less than 15 characters please.');
      }
    })
  }
});
