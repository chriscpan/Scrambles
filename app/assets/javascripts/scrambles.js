window.Scrambles = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Scrambles.Routers.Router({
      $rootEl: $('#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Scrambles.initialize();
  $.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position": "relative" });
        for (var x = 1; x <= 3; x++) {
            $(this).animate({ left: -5 }, 10).animate({ left: 0 }, 50).animate({ left: 5 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
  };
});
