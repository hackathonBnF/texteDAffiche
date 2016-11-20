# coding: utf-8
require 'test_helper'

class SearchControllerTest < ActionController::TestCase
  setup do
    search = Search.new
    #search.clear
    #search.index_movie("Q174385")
  end

  test "should index all" do
    get :index_all
    assert_response :success
  end
  
  test "should get movies" do
    get :movies
    assert_response :success
    search_result = JSON.load(@response.body)
    assert_equal(0, search_result["nb_results"])

    get :movies, :q => "Alice"
    assert_response :success
    search_result = JSON.load(@response.body)
    nb_results = search_result["nb_results"]
    results = search_result["results"]
    assert_equal(1, results.size)
    assert_equal(1, nb_results)    
    
    get :movies, :q => "toto"
    assert_response :success
    search_result = JSON.load(@response.body)
    results = search_result["results"]
    assert_equal(0, search_result["nb_results"])
  end

  test "should get books" do
    get :books
    assert_response :success
  end

end
