# coding: utf-8

class Search
  attr_reader :client
  
  def initialize
    @client = Elasticsearch::Client.new #log: true
    @index_name = "bnf_hackathon"
    @type_name = "movie"    

    begin
      @client.indices.get_mapping(index: @index_name, type: @type_name)
    rescue
      create_index
    end
  end

  def clear
    #if(@client.indices.exists?(index: @index_name))
      @client.indices.delete(:index => @index_name)
      sleep(1)
      create_index
    #end
  end
  
  def add(id, data)
    @client.index index: @index_name, type: @type_name, id: id, body: data
  end

  def index_movie(id)    
    result = Source.get_data(id)
    add(id, result)
  end
  
  def search(for_value)
    search_result = @client.search(:index => @index_name, :body => {:query => {
                                                                      :bool => {
                                                                        :must => [
                                                                          {
                                                                            :match => {
                                                                              :text_search => {
                                                                                :type => "phrase_prefix",
                                                                                :query => for_value
                                                                              }
                                                                            }
                                                                          }
                                                                        ]
                                                                      }
                                                                    }})
    hits = search_result["hits"]
    results = hits["hits"].map{|hit|
      source = hit["_source"]
      source["id"] = hit["_id"]
      source
    }
    
    {:results => results, :nb_results => hits["total"]}
  end

  def count
    @client.count(:index => @index_name)["count"]
  end
  
  private :client

  def create_index
    @client.indices.create(:index => @index_name, :body => { :mappings => {
                                                               @type_name => {
                                                                 properties: {
                                                                   label: {
                                                                     type: "string",
                                                                     copy_to: "text_search"
                                                                   },
                                                                   director: {
                                                                     type: "string",
                                                                     copy_to: "text_search"
                                                                   },
                                                                   starring: {
                                                                     type: "string",
                                                                     copy_to: "text_search"
                                                                   },
                                                                   date: {
                                                                     type: "string"
                                                                   },
                                                                   genre: {
                                                                     type: "string",
                                                                     copy_to: "text_search"
                                                                   },
                                                                   country: {
                                                                     type: "string"
                                                                   },
                                                                   language: {
                                                                     type: "string"
                                                                   },
                                                                   imdb: {
                                                                     type: "string"
                                                                   },
                                                                   poster: {
                                                                     type: "string"
                                                                   },
                                                                   books: {
                                                                     properties: {
                                                                       id: {
                                                                         type: "string"
                                                                       },
                                                                       title: {
                                                                         type: "string",
                                                                         copy_to: "text_search"
                                                                       },
                                                                       author: {
                                                                         type: "string",
                                                                         copy_to: "text_search"
                                                                       },
                                                                       publication: {
                                                                         type: "string"
                                                                       },
                                                                       bnf: {
                                                                         type: "string"
                                                                       },
                                                                       thumbnail: {
                                                                         type: "string"
                                                                       }
                                                                     }
                                                                   },
                                                                   text_search: {
                                                                     type: "string"  
                                                                   }
                                                                 }
                                                               }}})
  end
  
end
