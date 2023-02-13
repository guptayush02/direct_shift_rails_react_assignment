Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://tired-plastic-production.up.railway.app:80'
    resource '*', headers: :any, methods: [:get, :post]
  end
end
