# coding: utf-8
require 'json'
require 'uri'
require 'rest-client'


class Source

  @@wiki_data_url = "https://www.wikidata.org/wiki/Special:EntityData/"
  @@imdb_url_template = "https://api.themoviedb.org/3/find/THE_ID?api_key=API_KEY&external_source=imdb_id"

  @@gallica_sparql_endpoint = "http://data.bnf.fr/sparql?default-graph-uri=&query=THE_QUERY&format=json&timeout=0&should-sponge=&debug=on"
  @@gallica_sparql_query_template = "SELECT DISTINCT ?depiction
                                     WHERE {
                                      <http://data.bnf.fr/ark:/12148/cbTHE_GALLICA_IDp#frbr:Work> foaf:depiction ?depiction
                                      } 
                                     ORDER BY ?depiction
                                     LIMIT 1"
  
  def self.wiki_data(id)
    wiki_data_id = /Q\d*/.match(id) ? id : "Q" + id
    url = @@wiki_data_url + wiki_data_id
    res = get_json(url)
    res["entities"][wiki_data_id]
  end

  
  def self.imdb(id)
    #P345 on wiki data for IMDB id
    api_key = Rails.configuration.x.imdb.api_key
    if(api_key.nil?)
      raise Exception.new("No API KEY FOR IMDB")
    end
    url = @@imdb_url_template.gsub("API_KEY", api_key).gsub("THE_ID", id)
    res = get_json(url)
    res['movie_results'][0]
  end

  def self.gallica(id)
    #P268 on wiki data for Gallica
    query =  CGI::escape(@@gallica_sparql_query_template.gsub("THE_GALLICA_ID", id))
    url = @@gallica_sparql_endpoint.gsub("THE_QUERY", query)
    sparql_result = get_json(url, false)
    bindings = sparql_result["results"]["bindings"]
    result = nil
    unless(bindings.empty?)
      result = {}
      result["thumbnail"] = bindings[0]["depiction"]["value"]
    end
    result
  end


  def self.get_data(id)
    wiki_data = wiki_data(id)
    
    imdb_id = wiki_data["claims"]["P345"][0]["mainsnak"]["datavalue"]["value"]
    imdb = imdb(imdb_id)
    books = wiki_data["claims"]["P144"].map{|elem|
      book_id = elem["mainsnak"]["datavalue"]["value"]["id"]
      gallica = gallica(book_id)
      #gallica_id = gallica["claims"]["P268"][0]["mainsnak"]["datavalue"]["value"]
      wiki_data_book = wiki_data(book_id)
      book = {}
      book["publication"] = DateTime.parse(wiki_data_book["claims"]["P577"][0]["mainsnak"]["datavalue"]["value"]["time"]).strftime("%Y-%m-%d")
      book
    }

    result = {}
    result["id"] = id
    result["poster"] = "http://image.tmdb.org/t/p/original" + imdb["backdrop_path"] if(imdb["backdrop_path"])
    result["books"] = books
    result
  end
  
  private

  def self.get_json(url, use_json=true)
    if(use_json)
      JSON.parse(RestClient.get(url, {accept: :json}))
    else
      JSON.parse(RestClient.get(url))
    end    
  end
end
