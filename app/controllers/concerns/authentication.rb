include JwtToken

module Authentication
  extend ActiveSupport::Concern

  def check_user
    @token = request.headers[:token]
    decoded_data = decode(@token) unless !@token.present?
    @current_user = User.find(decoded_data[:id]) unless !decoded_data.present?

    if @current_user.present?
      true
    else
      return render json: {message: 'Authentication fail', status: 404}.to_json
    end
  end
end
