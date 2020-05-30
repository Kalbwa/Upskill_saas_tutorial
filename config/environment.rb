# Load the Rails application.
require_relative 'application'

ActionMailer::Base.smtp_settings = {
  :port           => ENV['MAILGUN_SMTP_PORT'],
  :address        => ENV['MAILGUN_SMTP_SERVER'],
  :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
  :password       => ENV['MAILGUN_SMTP_PASSWORD'],
  :domain         => 'fierce-plateau-01528.herokuapp.com',
  :authentication => :plain,
}

# Initialize the Rails application.
Rails.application.initialize!
