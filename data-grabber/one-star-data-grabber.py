
# coding: utf-8

# In[63]:

import json
import requests

#temp
import copy


# In[2]:

class InvalidApiKeyException(Exception):
    pass


# In[88]:

def google_place_search(api_key, location='45.5017,-73.5673', radius='1000', location_type='restaurant'):
    """Gets a list of places from the location coordinates, in a certain radius (in meters)"""
    
    print('Getting place data for location: ' + location + ', radius: ' + radius + ', location_type: ' + location_type)
    
    base_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    parameter_list = {'location': location,
                      'radius': radius,
                      'type': location_type,
                      'key' : api_key}
    r = requests.get(base_url, params=parameter_list)
    
    
    parsed_json = json.loads(r.text)
    return parsed_json
    
    


# In[41]:

def google_place_cleanup(data):
    """removes unecessary fields from data that comes from a google_place API querry"""
    
    for location in data['results']:
        try:
            del location['geometry']
            del location['icon']
            del location['reference']
            del location['scope']
        except KeyError:
            print('one of more key didn\'t exist')


# In[5]:

def google_get_id_from_places(places_data):
    """From a google_place API querry, retreives the ID's of each establishment"""
    
    id_list = []
    for place in places_data:
        id_list = id_list + [place['place_id']]
    return id_list


# In[87]:

def google_details_search(api_key, id_list):
    """executes a google_details API querry and returns the result"""
    
    base_url= 'https://maps.googleapis.com/maps/api/place/details/json?'
    data = {}
    parsed_data = {}
    for place_id in id_list:
        print('getting data for: ' + place_id)
        parameter_list = {'placeid' : place_id,
                          'key' : api_key}
        r = requests.get(base_url, params=parameter_list)
        data[place_id] = r.text
    for place in data:
        parsed_data[place] = json.loads(data[place])
    return parsed_data


# In[42]:

def google_detail_cleanup(details):
    """removes unecessary fields from data comming from a google_details API querry"""
    
    for place in details:
        try:
            del details[place]['html_attributions']
        except KeyError:
            print('one of more key didn\'t exist')


# In[8]:

data = google_place_search(api_key='AIzaSyAOFtHfpkCMyIim6wEFoPGW-Qlyu5nbPuA')
google_place_cleanup(data=data)
places = data['results']
places


# In[11]:

id_list = google_get_id_from_places(places)
print("\nList of place id's from places data")
print(id_list)


# In[70]:

details = google_details_search(api_key='AIzaSyAOFtHfpkCMyIim6wEFoPGW-Qlyu5nbPuA', id_list=id_list)


# In[71]:

google_detail_cleanup(details)


# In[76]:

details['ChIJlfjVd0IayUwRi8rjxbMESlI']


# In[85]:

def write_to_json(data, file_name):
    """writes given data to a json file"""
    
    print('writing: ' + file_name)
    with open(file_name, 'w') as outfile:
        json.dump(data, outfile)


# In[86]:
print('\n')
write_to_json(places, 'places.txt')
write_to_json(details, 'details.txt')


# In[ ]:



