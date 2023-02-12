class UserController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    puts params[:email]
  end

  def login
    render template: "home/login"
  end
end
