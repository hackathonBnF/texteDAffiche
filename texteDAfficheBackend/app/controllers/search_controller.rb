class SearchController < ApplicationController


  def movies
    query = params[:q]    
    search = Search.new
    results = search.search(query)
    logger.info "IN CONTROLLER : #{results}"
    render :json => results[:results].to_json, :callback => params['callback']
  end

  def books
    query = params[:q]    
    search = Search.new
    results = search.search(query)
    logger.info "IN CONTROLLER : #{results}"
    render :json => results[:results].to_json, :callback => params['callback']
  end
end
