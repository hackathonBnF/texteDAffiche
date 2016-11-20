# coding: utf-8
require "erb"
include ERB::Util
require 'test_helper'

class SourceTest < ActiveSupport::TestCase


  test "Simple wiki data call" do
    #Movie
    ["2345", "Q2345"].each{|id|
      twelve_angry_men = Source.wiki_data(id)
      assert_not_nil(twelve_angry_men)
      assert_equal("Q2345", twelve_angry_men["title"])
    }
    #Book
    id = "Q2313956"
    twelve_angry_men = Source.wiki_data(id)
    #puts "twelve_angry_men: #{twelve_angry_men}"
    assert_not_nil(twelve_angry_men)
    assert_equal(id, twelve_angry_men["title"])
  end

  test "Simple IMDB call" do
    id = "tt0050083"
    twelve_angry_men = Source.imdb(id)
    puts "twelve_angry_men: #{twelve_angry_men}"
    assert_not_nil(twelve_angry_men)
    assert_equal("12 Angry Men", twelve_angry_men["title"])    
  end

  test "Simple BNF call" do
    id = "12417486"
    result = Source.gallica(id)
    assert_equal("http://gallica.bnf.fr/ark:/12148/bpt6k202877g.thumbnail", result["thumbnail"])

    #With unknown id
    id = "16473943"
    result = Source.gallica(id)
    assert_nil(result)
  end

  test "Get data with no imdb poster and Gallica" do
    id = "3230819"
    result = Source.get_data(id)
    assert_equal(id, result["id"])
    assert_nil(result["poster"])
    assert_equal(1, result["books"].size)
    assert_equal("http://gallica.bnf.fr/ark:/12148/bpt6k202877g.thumbnail", result["books"][0]["thumbnail"])
  end
  
  test "Get data no Gallica" do
    id = "Q2345"
    result = Source.get_data(id)
    assert_equal(id, result["id"])
    assert_equal("http://image.tmdb.org/t/p/original/lH2Ga8OzjU1XlxJ73shOlPx6cRw.jpg", result["poster"])
    assert_equal(1, result["books"].size)
    #puts "BOOKS : #{result["books"]}"
    book = result["books"][0]
    assert_equal("1954-01-01", book["publication"])
  end
  
end
