class SearchController < ApplicationController


  def movies
    query = params[:q]    
    search = Search.new
    results = search.search(query)
    puts "IN CONTROLLER : #{results}"
    render :json => results.to_json
  end

  def books
  end
end
