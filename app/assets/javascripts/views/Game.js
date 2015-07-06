Scrambles.Views.Game = Backbone.View.extend({
  tagName: "div class=game-container",

  template: JST['Game'],

  initialize: function(options){
    $(document).bind('keydown', this.step.bind(this));
    this.words = options.words;
    this.scores = options.scores;
    this.listenTo(this.words, 'sync', this.render);
    this.idx = 0;
    this.currWord = "";
    this.countDown();
    Scrambles.points = 0;
    this.multiplier = 1;
    this.doOnce = true;
  },

  render: function(){
    if (this.words.models[this.idx]){
      this.word = this.words.models[this.idx].get('word').toUpperCase();
    }
    var content = this.template({
      words: _.shuffle(this.word)
    });
    this.idx += 1;
    this.$el.html(content);
    return this;
  },

  step: function(event){
    var letter = String.fromCharCode(event.keyCode).toUpperCase();
    if ($(".scrambled:contains('" + letter + "')").length > 0) {
      this.insertLetter(letter);
      this.checkIncorrect();
      if (this.isWord(this.currWord)) {
        this.checkIdx();
        this.reset();
      }
    }
    else if (event.keyCode === 8) {
      event.preventDefault();
      this.currWord = this.currWord.slice(0, this.currWord.length - 1);
      this.deleteLetter();
    }
  },

  insertLetter: function(letter) {
    $(".letter:contains('" + letter + "')").first().remove();
    $(".unscrambled").prepend("<span class='letter active'>" + letter + "</span>");
    // $(".unscrambled span:first-child").shake();
    this.currWord += letter;

  },

  reset: function(){
    this.won();
    setTimeout(function(){
      this.resetWord();
    }.bind(this), 1000);
  },

  resetWord: function() {
    this.currWord = "";
    $(".letter").remove();
    this.render();
  },

  won: function() {
    $(".unscrambled").addClass('correct');
  },

  isWord: function(){
    if (this.currWord === this.word) {
      this.increasePoints();
      this.increaseMultiplier();
      return true;
    }
  },

  checkIncorrect: function() {
    if (this.currWord.length === this.word.length && this.currWord !== this.word) {
      $(".unscrambled").addClass('incorrect');
      $(".unscrambled").shake();
      setTimeout(function() {
        $(".unscrambled").removeClass('incorrect');
        for (var i = 0; i < this.word.length; i++) {
          this.deleteLetter();
        }
      }.bind(this), 1000);
      this.currWord = "";
    }
  },

  deleteLetter: function(){
    if ($(".unscrambled span:first-child").text() === "") {
      return ;
    }
    letter = $(".unscrambled span:first-child").text().toUpperCase();
    $(".unscrambled span:first-child").remove();
    $(".scrambled").append("<span class='letter'>" + letter + "</span>");
  },

  checkIdx: function() {
    if (this.idx >= this.words.length ) {
      var newWords = new Scrambles.Collections.Words({});
      newWords.fetch();
    }
  },

  countDown: function() {
    this.timer = 61;
    setInterval(function() {
      this.timeCheck();
    }.bind(this), 1000);
  },

  timeUp: function() {
    $('.play-again').bind('click', this.playAgain.bind(this));
    $(document).unbind('keydown');
    $('.end-points').html('You got ' + Scrambles.points + ' points!');
    if (this.isHighScore()){
      this.doOnce = false;
      $('.form-container').html("<form class='score-form'><input type='text' id='txtname' name='name' placeholder='Congrats! Enter your name!' /></form>");
    }
    $('#modal-content').modal('show');
  },

  isHighScore: function() {
    if ( (_.last(this.scores.models) || this.scores.models.length === 0) &&
      this.doOnce &&
      (this.scores.models.length < 10 ||
        this.scores.models[9].get('points') < Scrambles.points)
        ){
      return true;
    }
  },

  timeCheck: function() {
    if (this.timer <= 0 ) {
      this.timeUp();
    } else {
      this.timer -= 1;
      $('.time').html( this.timer + 's');
    }
  },

  increaseMultiplier: function() {
    this.multiplier += 1;
    $('.mult').html( this.multiplier + 'x' );
  },

  increasePoints: function() {
    Scrambles.points += this.word.length * this.multiplier;
    $('.points').html(Scrambles.points);
  },

  playAgain: function() {
    this.doOnce = true;
    $('.form-container').html('');
    this.resetGame();
    $('#modal-content').modal('hide');
  },

  resetGame: function() {
    $(document).bind('keydown', this.step.bind(this));
    this.resetStats();
  },

  resetStats: function() {
    Scrambles.points = 0;
    this.multiplier = 1;
    this.timer = 61;
    this.idx += 1;
    this.render();
    $('.points').html(Scrambles.points);
    $('.mult').html( this.multiplier + 'x' );
  }
});
