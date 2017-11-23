
# coding: utf-8

# In[1]:

import json
import csv
import requests

#temp
import copy


# In[2]:

def address_to_geoloc(api_key, address):
    
    #first, gets basic info from the address
    base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    
    address = address.replace(" ", "+")
    
    parameter_list = {'address': address,
                      'key' : api_key}
    r = requests.get(base_url, params=parameter_list)
    parsed_json = json.loads(r.text)
    
    data = {}
    
    #data['address'] = parsed_json['results'][0]['formatted_address']#probably not useful
    data['coordinates'] = {'lat' :parsed_json['results'][0]['geometry']['location']['lat'], 'lng' :parsed_json['results'][0]['geometry']['location']['lng']}
    data['id'] = parsed_json['results'][0]['place_id']#google place id
    
    #now we will get extra details from a second api request
    
    base_url= 'https://maps.googleapis.com/maps/api/place/details/json?'
    parameter_list = {'placeid' : data['id'],
                          'key' : api_key}
    r = requests.get(base_url, params=parameter_list)
    parsed_json = json.loads(r.text)
    
    
    #the name is already in the csv
    #data['name'] = parsed_json['result']['name']
    data['types'] = parsed_json['result']['types']#this is an array
    
    return data
    
    
    


# In[3]:

def read_fines_csv(input_file, encoding='iso-8859-1'):
    """
    takes the the csv from http://donnees.ville.montreal.qc.ca/dataset/inspection-aliments-contrevenants and transforms it into an array of dictionaries
    
    Duplicate names are merged into one dict
    The structure is as follows:
    data{ -|
           |name{ - |
                    |- name : rName
                    |- Address : value
                    |- fine : [values]
                    |- fine_date : [values]
                    |- reason : [values]
                    |- types : [values]
            }
    }  
    """
    
    data = {}#stores the different infractions
    with open(input_file, newline='',encoding=encoding) as csvfile:
        csvreader = csv.reader(csvfile, delimiter=';')
        ctr = 0#counter
        for row in csvreader:#each row is an infraction
            if ctr > 1:
                buisness_name = row[6]
                if buisness_name in data:
                    data[buisness_name] = {'name' : row[6], 'address' : row[1], 'fine' : (data[buisness_name]['fine'] + [row[7]]), 'fine_date' : (data[buisness_name]['fine_date'] + [row[3]]), 'reason' : (data[buisness_name]['reason'] + [row[5]]), 'types' : [row[2]]}
                else:
                    data[row[6]] = {'name' : row[6], 'address' : row[1], 'fine' : ([row[7]]), 'fine_date' : ([row[3]]), 'reason' : ([row[5]]), 'types' : [row[2]]}
            ctr +=1
    return data


# In[4]:

def expand(api_key, data):
    """takes data created by read_fines_csv() and adds more data it gets from google"""
    
    for buisness in data:
        extra_data = address_to_geoloc(api_key=api_key, address=data[buisness]['address'])
        data[buisness]['types'] += extra_data['types']
        data[buisness]['coordinates'] = extra_data['coordinates']
        data[buisness]['g_id'] = extra_data['id']
    return data


# In[5]:

def contains(array, target):
    for name in array:
        if name == target:
            return True
    return False


# In[11]:

def export_data(data, file_name='data.json'):
    
    with open(file_name, 'w') as outfile:
        json.dump(data, outfile)


# In[9]:

data = read_fines_csv('inspection-aliments-contrevenants.csv')
data


# In[95]:

#this is very time costy
expand(api_key='AIzaSyAOFtHfpkCMyIim6wEFoPGW-Qlyu5nbPuA', data=data)
data


# In[13]:

export_data(data, file_name='data_complete.json')


# In[ ]:



