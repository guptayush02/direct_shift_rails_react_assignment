include Authentication

class DashboardController < ApplicationController

  before_action :check_user, only: [:refer]
  skip_before_action :verify_authenticity_token

  def index
    return render template: "dashboard/index"
  end

  def refer
    if UserRefer.find_by(:email => params[:email])
      return render json: {message: 'Already Exist', status: 404}.to_json
    else
      if @current_user.user_refers.create(email: params[:email]) && UserReferMailer.send_referral_mail(@current_user.name, params[:email]).deliver_now
        return render json: {message: 'Referral email sent', data: @current_user.user_refers, status: 200}.to_json
      end
    end
  end
end
