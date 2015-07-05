Scrambles.Views.Game = Backbone.View.extend({
  tagName: "div class=game-container",

  template: JST['Game'],

  initialize: function(options){
    $(document).bind('keydown', this.step.bind(this));
    $('.play-again').bind('click', this.playAgain.bind(this));
    this.idx = 0;
    this.currWord = "";
    this.words = options.words;
    this.listenTo(this.words, 'sync', this.render);
    this.countDown();
    this.completed = 0;
    this.points = 0;
    this.multiplier = 1;
  },

  render: function(){
    if (this.words.models[this.idx]){
      this.word = this.words.models[this.idx].get('word').toUpperCase();
      console.log(this.word);
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

  isWord: function(){
    if (this.currWord === this.word) {
      this.increasePoints();
      this.increaseMultiplier();
      return true;
    }
  },

  won: function() {
    $(".unscrambled").addClass('correct');
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

  resetWord: function() {
    this.currWord = "";
    $(".letter").remove();
    this.completed += 1;
    this.render();
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
    $(document).unbind('keydown');
    $('.end-points').html('You got ' + this.points + ' points!');
    $('#modal-content').modal('show');
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
    this.points += this.word.length * this.multiplier;
    $('.points').html(this.points);
  },

  playAgain: function() {
    console.log('hello')
    this.resetGame();
    $('#modal-content').modal('hide');
  },

  resetGame: function() {
    $(document).bind('keydown', this.step.bind(this));
    this.resetStats();
  },

  resetStats: function() {
    this.completed = 0;
    this.points = 0;
    this.multiplier = 1;
    this.timer = 61;
    this.idx += 1;
    this.render();
    $('.points').html(this.points);
    $('.mult').html( this.multiplier + 'x' );
  }
});
