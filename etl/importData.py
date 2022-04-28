import os
from pymongo import MongoClient
import json

DB_URL = "localhost"
DB_PORT = 27017
DB_NAME = "appdb"
COLLECTION_NAME = "zipcode"

client = MongoClient(DB_URL, DB_PORT)
dbs = client.list_database_names()
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

zipcode_source_path = "./source/zipcodes"

for zipcode_json in os.listdir(zipcode_source_path):
  if zipcode_json[len(zipcode_json)-5:] == ".json":
    with open(os.path.join(zipcode_source_path,zipcode_json),'r', encoding='windows-1252') as f:
      print(zipcode_json)
      data = json.loads(f.read())
      geojson_features = data["features"]
      
      tData = []
      for i in geojson_features:
        tData.append({
          "zipcode": i["properties"]["ZCTA5CE10"],
          # "GEOID": i["properties"]["GEOID"],
          # "NAME": i["properties"]["NAME"],
          "location": i["geometry"]
        })

      collection.create_index([("location", "2dsphere")])
      result = collection.insert_many(tData)
      print(zipcode_json+ "...Done")

