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
    assert_not_nil(twelve_angry_men)
    assert_equal(id, twelve_angry_men["title"])
  end

  test "Simple IMDB call" do
    id = "tt0050083"
    twelve_angry_men = Source.imdb(id)
    assert_not_nil(twelve_angry_men)
    assert_equal("12 Angry Men", twelve_angry_men["title"])    
  end

  test "Simple gallica call" do
    assert_equal("http://gallica.bnf.fr/ark:/12148/bpt6k202877g.thumbnail", Source.gallica_thumbnail("12417486p"))

    #With unknown id
    assert_nil(Source.gallica_thumbnail("16473943p"))
  end

  test "Get data with no imdb poster and Gallica" do
    id = "3230819"
    result = Source.get_data(id)
    assert_equal(id, result["id"])
    assert_nil(result["poster"])
    assert_equal(1, result["books"].size)
    assert_equal("http://gallica.bnf.fr/ark:/12148/bpt6k101798r.thumbnail", result["books"][0]["thumbnail"])
  end
  
  test "Get data no Gallica" do
    id = "Q2345"
    result = Source.get_data(id)
    assert_equal(id, result["id"])
    assert_equal("http://image.tmdb.org/t/p/original/lH2Ga8OzjU1XlxJ73shOlPx6cRw.jpg", result["poster"])
    assert_equal(1, result["books"].size)
    book = result["books"][0]
    assert_equal("1954-01-01", book["publication"])
  end

  test "Full case" do
    id = "Q174385"
    result = Source.get_data(id)
    assert_equal(id, result["id"])
    assert_equal("Alice au pays des merveilles", result["label"])
    assert_equal("Tim Burton", result["director"])
    #assert_equal(["Tim Burton", "Hannah Roberts", "Anne Hathaway", "Crispin Glover", "Marton Csokas", "Lindsay Duncan", "Eleanor Tomlinson", "Frances de la Tour", "Matt Lucas", "Geraldine James", "Alan Rickman"], result["starring"])
    assert_equal("2010-03-05", result["date"])
    assert_equal("film de fantasy", result["genre"])
    assert_equal("Royaume-Uni", result["country"])
    assert_equal("anglais", result["language"])
    assert_equal("tt1014759", result["imdb"])
    assert_equal("http://image.tmdb.org/t/p/original/AmCtBQc5KxJfJVdS2TkY4Pc9lPd.jpg", result["poster"])#to change
    books = result["books"]
    assert_equal(2, books.size, "BOOK : #{books}")
    assert_equal("Q92640", books[0]["id"])
    assert_equal("Q220331", books[1]["id"])
    
    book = books[0]
    assert_equal("Les Aventures d'Alice au pays des merveilles", book["title"])
    assert_equal("Lewis Carroll", book["author"])
    assert_equal("1865-11-26", book["publication"])
    assert_equal("12011248f", book["bnf"])
    assert_equal("http://gallica.bnf.fr/ark:/12148/bpt6k1045580k.thumbnail", book["thumbnail"])
  end
  
end
