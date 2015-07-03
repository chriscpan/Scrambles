Wordnik.configure do |config|
  config.api_key = ENV["wordnik_api_key"]
  config.logger = Logger.new('/dev/null')
end
