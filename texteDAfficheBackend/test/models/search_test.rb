# coding: utf-8
require "erb"
include ERB::Util
require 'test_helper'

class SearchTest < ActiveSupport::TestCase

  setup do
    search = Search.new
    search.clear
  end
 

  test "Initialize" do
    search = Search.new
    assert_not_nil(search)
  end

  test "Count" do
    search = Search.new
    sleep(1)
    old_count = search.count
    #assert_equal(0, search.count)
    id = rand(10000)
    search.add(id, {:label => "TOTO"})
    sleep(1)
    assert_equal(old_count + 1, search.count())
    search.add(id, {:label => "TOTO2"})
    sleep(1)
    assert_equal(old_count + 1, search.count())
  end
  
  test "Clear indexes" do
    search = Search.new
    sleep(1)
    old_count = search.count
    prefix = rand(10000)
    ids = ["1234", "1235", "1236", "1237"]
    ids.each{|id|
      search.add("#{prefix}_#{id}", {:label => "TOTO-{id}"})
    }
    sleep(2)
    assert_equal(old_count + 4, search.count)
    search.clear
    sleep(2)
    assert_equal(0, search.count)
  end
  
  test "Simple indexation" do
    id = "130"
    label = "Vingt mille lieues sous les mersonmovie"
    data = {
      :label => label,
      :director => "Richard Fleischer",
      :starring => "Kirk Douglas, James Mason",
      :date => "1954",
      :genre => "Aventure",
      :country => "États-Unis",
      :language => "Anglais",
      :imdb => "0000000000",
      :poster => "http://test.com/monimage.jpg",
      :books => [{
                   :id => "1",
                   :title => "Vingt mille lieues sous les mersonbook",
                   :author => "Jules Verne",
                   :publication => "1869-1870",
                   :bnf => "0000000",
                   :thumbnail => "http://test.com/monimage2.jpg"
                 }]
    }
    search = Search.new
    search.add(id, data)
    sleep(2)
    ["mersonmovie", "mersonbook", "Aventure", "aventure", "Richard Fleischer", "Douglas", "Verne"].each{|value|
      search_result = search.search(value) 
      results = search_result[:results]
      nb_results = search_result[:nb_results]
      assert_equal(1, results.size, "For value : #{value}")
      assert_equal(1, nb_results)
      assert_equal(id, results[0]["id"])
      assert_equal(label, results[0]["label"])
    }
    ["toto", "", nil].each{|value|
      search_result = search.search(value) 
      results = search_result[:results]
      nb_results = search_result[:nb_results]
      assert_equal(0, results.size)
      assert_equal(0, nb_results)
    }
  end

  test "Indexation by movie id" do
    id = "Q174385"
    search = Search.new
    sleep(1)
    old_count = search.count    
    search.index_movie(id)
    sleep(1)
    assert_equal(old_count + 1, search.count)
    ["Alice", "Johnny Depp"].each{|value|
      search_result = search.search(value)
      results = search_result[:results]
      nb_results = search_result[:nb_results]
      assert_equal(1, results.size)
      assert_equal(1, nb_results)
      assert_equal("Alice au pays des merveilles", results[0]["label"])
    }    
  end
  
  test "Search by document id" do
    id = "Q174385"
    search = Search.new
    sleep(1)
    old_count = search.count    
    search.index_movie(id)
    sleep(1)
    assert_equal(old_count + 1, search.count)
    ["Q92640", "Q220331"].each{|id|
      search_result = search.search_by_book(id)
      results = search_result[:results]
      nb_results = search_result[:nb_results]
      assert_equal(1, results.size)
      assert_equal(1, nb_results)
      assert_equal("Alice au pays des merveilles", results[0]["label"])
    }  
    ["", "toto"].each{|id|
      search_result = search.search_by_book(id)
      results = search_result[:results]
      nb_results = search_result[:nb_results]
      assert_equal(0, results.size)
      assert_equal(0, nb_results)
    }   
  end

  test "Index all" do
    index_all
  end
  
  def index_all
    search = Search.new
    #search.clear
    require 'json'
    file = File.read('./test/fixtures/tested_movies_tmp.json')
    data_hash = JSON.parse(file)
    ids = data_hash.map{|elem| /([^\/]*)$/.match(elem["film"])[0]}
    ids.each{|id| search.index_movie(id)}
  end
end
