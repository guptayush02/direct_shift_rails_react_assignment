class UserController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    check_params
    user = User.find_by(:email => params[:email])
    if !user.present?
      new_user = User.new(name: params[:name], email: params[:email], password: params[:password], terms_and_condition: params[:termsAndCondition])
      new_user.save
      render json: {message: 'User Create Successfully', status: 200}.to_json
    else
      render json: {message: 'User Already Exist', status: 400}.to_json
    end
  end

  def login
    render template: "home/login"
  end

  private

  def check_params
    if !params[:email] && !params[name] && !params[:password] && !params[:termsAndCondition]
      render json: {message: 'Parameter Missing', status: 400}.to_json
    else
      true
    end
  end
end
