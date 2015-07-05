Scrambles.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'root'
  },

  root: function() {
    var words = new Scrambles.Collections.Words();
    words.fetch();
    var v = new Scrambles.Views.GameViews({
      words: words
    });
    this._swapView(v);
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._curentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
