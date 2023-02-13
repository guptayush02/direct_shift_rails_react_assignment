class UserReferMailer < ApplicationMailer

  def send_referral_mail(name, email)
    @user = name
    mail(to: email, subject: "Referral invite")
  end
end
