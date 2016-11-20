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
                                      <http://data.bnf.fr/ark:/12148/cbTHE_GALLICA_ID#frbr:Work> foaf:depiction ?depiction
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

  def self.gallica_thumbnail(id)
    #P268 on wiki data for Gallica
    query =  CGI::escape(@@gallica_sparql_query_template.gsub("THE_GALLICA_ID", id))
    url = @@gallica_sparql_endpoint.gsub("THE_QUERY", query)
    sparql_result = get_json(url, false)
    bindings = sparql_result["results"]["bindings"]
    unless(bindings.empty?)
      bindings[0]["depiction"]["value"]
    end
  end


  def self.get_data(id)
    wiki_data = wiki_data(id)
    
    imdb_id = get_value(wiki_data, ["claims", "P345", 0, "mainsnak", "datavalue", "value"])
    imdb = imdb(imdb_id)
    books = get_value(wiki_data, ["claims", "P144"]).map{|elem|
      book_id = elem["mainsnak"]["datavalue"]["value"]["id"]
      wiki_data_book = wiki_data(book_id)
      book = {}
      book["id"] = book_id
      publication = get_value(wiki_data_book, ["claims", "P577", 0, "mainsnak", "datavalue", "value", "time"])
      book["publication"] = begin
                              DateTime.parse(publication).strftime("%Y-%m-%d")
                            rescue
                              nil
                            end
      book["title"] = get_value(wiki_data_book, ["labels", "fr", "value"])

      author_id = get_value(wiki_data_book, ["claims", "P50", 0, "mainsnak", "datavalue", "value", "id"])
      book["author"] = if(author_id)
                           author = wiki_data(author_id)
                           get_value(author, ["labels", "fr", "value"])
                         end

      book["bnf"] = get_value(wiki_data_book, ["claims", "P268", 0, "mainsnak", "datavalue", "value"])
      
      gallica_id = get_value(wiki_data_book, ["claims", "P268", 0, "mainsnak", "datavalue", "value"])
      book["thumbnail"] = gallica_thumbnail(gallica_id) if(gallica_id)
      book
    }

    result = {}
    result["id"] = id
    result["imdb"] = imdb_id
    result["label"] = get_value(wiki_data, ["labels", "fr", "value"])

    author_id = get_value(wiki_data, ["claims", "P57", 0, "mainsnak", "datavalue", "value", "id"])
    result["director"] = if(author_id)
                           author = wiki_data(author_id)
                           get_value(author, ["labels", "fr", "value"])
                         end
    
    date = get_value(wiki_data, ["claims", "P577",  0, "mainsnak", "datavalue", "value", "time"])
    result["date"] =  begin
                        DateTime.parse(date).strftime("%Y-%m-%d")
                      rescue
                        nil
                      end
    
    genre_id = get_value(wiki_data, ["claims", "P136", 0, "mainsnak", "datavalue", "value", "id"])
    result["genre"] = if(genre_id)
                        genre = wiki_data(genre_id)
                        get_value(genre, ["labels", "fr", "value"])
                      end

    country_id = get_value(wiki_data, ["claims", "P495", 0, "mainsnak", "datavalue", "value", "id"])
    result["country"] = if(country_id)
                        country = wiki_data(country_id)
                        get_value(country, ["labels", "fr", "value"])
                      end

    language_id = get_value(wiki_data, ["claims", "P364", 0, "mainsnak", "datavalue", "value", "id"])
    result["language"] = if(language_id)
                           language = wiki_data(language_id)
                           get_value(language, ["labels", "fr", "value"])
                         end

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

  def self.get_value(from, path)
    path.reduce(from){|res, value|
      if(res)
        res[value] || nil
      end
    }
  end
end
