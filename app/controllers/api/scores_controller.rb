module Api
  class ScoresController < ApiController
    def index
      @scores = Score.all.limit(10).order(points: :desc)
      render :json => @scores
    end

    def create
      @score = Score.new(score_params)
      if @score.save
        render :json => @score
      else
        render :json => @score.errors.full_messages, :status => :unprocessable_entity
      end
    end

    private

    def score_params
      params.require(:score).permit(:name, :points)
    end
  end
end
