include JwtToken

class UserController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    create_user_check_params
    if !find_user.present?
      new_user = User.new(name: params[:name], email: params[:email], password: params[:password], terms_and_condition: params[:termsAndCondition])
      new_user.save
      return render json: {message: 'User Create Successfully', status: 200}.to_json
    else
      return render json: {message: 'User Already Exist', status: 400}.to_json
    end
  end

  def signin
    signin_user_check_params
    user = find_user
    if !user.present?
      return render json: {message: 'Email not exist', status: 400}.to_json
    end

    if user.password != params[:password]
      return render json: {message: 'Incorrect Password', status: 400}.to_json
    end

    @token = encode(email: user.email, id: user.id)
    data = Hash.new
    data[:id] = user.id
    data[:name] = user.name
    data[:email] = user.email
    data[:token] = @token
    return render json: {message: 'User login successfully', data: data, status: 200}.to_json
  end

  def login
    return render template: "home/login"
  end

  private

  def find_user
    User.find_by(:email => params[:email])
  end

  def create_user_check_params
    if !params[:email] || !params[:name] || !params[:password] || !params[:termsAndCondition]
      return render json: {message: 'Parameter Missing', status: 400}.to_json
    else
      true
    end
  end

  def signin_user_check_params
    if !params[:email] || !params[:password]
      return render json: {message: 'Parameter Missing', status: 400}.to_json
    else
      true
    end
  end
end
