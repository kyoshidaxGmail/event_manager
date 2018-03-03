class AccessController < ApplicationController
  require 'httpclient'
  require 'net/https'
  def index
    # domain = 'http://tm-staging-1218029533.ap-northeast-1.elb.amazonaws.com/'
    # login_body = {
      # 'group_name' => 'studist',
      # 'name_or_address' => 'studist',
      # 'password' => 'aaaaaaaa',
      # '_method' => 'post'
    # }
    # cookies.delete :_Teachme_session
    domain = 'http://0.0.0.0:4000/'
    login_body = {
      'group_name' => 'studist',
      'name_or_address' => 'studist',
      'password' => '55studist',
      '_method' => 'post'
    }

    access_login(domain, login_body)
    top_body = access_top(domain)
    render :json => top_body
  end

  private
    def access_top(domain)
      cookie = WebAgent::Cookie.new
      cookie.name = "_Teachme_session"
      cookie.value = cookies["_Teachme_session"]
      cookie.url = URI.parse domain

      http_client = HTTPClient.new(:agent_name => 'jakarta commons-httpclient/3.1')
      http_client.cookie_manager.add cookie

      response = http_client.get_content("#{domain}api/v1/top.json")
      return JSON.parse(response)
    end

    def access_login(domain, login_body)
      http_client = HTTPClient.new(:agent_name => 'MyAgent/0.1')
      response = http_client.post("#{domain}api/v1/do_quick_check_in.json", login_body)
    end
  # /private
end
