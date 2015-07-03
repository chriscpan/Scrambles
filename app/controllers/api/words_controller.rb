module Api
  class WordsController < ApiController
    def index
      @words = Wordnik.words.get_random_words(
        limit: 100,
        minLength: 5,
        maxLength: 7,
        hasDictionaryDef: true,
        minDictionaryCount: 50
      )
      render :json => @words.shuffle
    end
  end
end
