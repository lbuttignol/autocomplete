const axios = require("axios");

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACES_BASE_URL = "https://maps.googleapis.com/maps/api/place";

/*
 * Takes an array of address  and a "string", then search if exists a propertie
 * 
 */
function filterAtribute(addr,filterVal){
  result = addr.filter(elem => elem.types.includes(filterVal))[0];
  if (! result){
    return '';
  }
  if (! result.long_name){
    return '';
  }
  return result.long_name;
}

function getDetails(item){
  console.log(item);

  getDetailsAPI = {
    url: 'https://maps.googleapis.com/maps/api/place/details/json',
    method: 'get',
    params: {
      key: GOOGLE_PLACES_API_KEY
    }
  };
  
  getDetailsAPI.params.place_id = item.place_id; 
  
  return axios.request(getDetailsAPI).then(response =>{
    addr = response.data.result.address_components;
    
    obj = {};
    obj.place = item.place_id;
    obj.street = [filterAtribute(addr,"route"), filterAtribute(addr,"street_number"),filterAtribute(addr,"floor")].join(" ");
    // obj.street = response.data.result.formatted_address.split(',')[0];
    
    obj.city = filterAtribute(addr,"locality");
    obj.state = filterAtribute(addr,"administrative_area_level_1");
    obj.zipcode = filterAtribute(addr,"postal_code").substring(1);
    
    location = {};
    location.type = "Point";
    location.coordinates = [response.data.result.geometry.location.lat, response.data.result.geometry.location.lng];
    
    obj.location = location;
    return obj;
  });
}
/**
 * @name findAddress
 * @summary Find address suggestions based on a search term
 * @param {String} searchString  is the address term to ask for
 * @returns {Promise<Array>}
 */
const findAddress = async function(searchString) {
  if (!searchString) throw new Error("Search term is required");

  const BEGIN = Date.now();

  const search = {
    input: searchString,
    location: "-64.349123,-33.123778",
    radius: 50000,
    rankby: "distance",
    key: GOOGLE_PLACES_API_KEY
  };
  
  autocompleteAPI = {
    url: GOOGLE_PLACES_BASE_URL+'/autocomplete/json',
    method: 'get',
    params: search
  }; 
  
  return axios.request(autocompleteAPI).then(response =>{
    console.log("Google response");
    return Promise.all(response.data.predictions.map(getDetails))
    .then(response =>{
      console.log("Object to send to frontend");
      console.log(
        `Search "${searchString}" completed in ${Date.now() - BEGIN} ms.`
      );
      return response;
    });
  });

};

module.exports = {
  findAddress
};
