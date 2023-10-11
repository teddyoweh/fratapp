import pymongo

def migrate_data(source_uri, target_uri):
    
    source_client = pymongo.MongoClient(source_uri)
    source_db_names = source_client.list_database_names()

    
    target_client = pymongo.MongoClient(target_uri)

    
    for db_name in source_db_names:
        if db_name not in ["admin", "local"]:  
            source_db = source_client[db_name]
            target_db = target_client[db_name]

            
            for collection_name in source_db.list_collection_names():
                collection_data = list(source_db[collection_name].find())
                if collection_data:
                    target_db[collection_name].insert_many(collection_data)
                    print(f"Data migrated from {db_name}.{collection_name}")

    
    source_client.close()
    target_client.close()

if __name__ == "__main__":
    source_uri = "mongodb+srv://teddy:4coXc8erTVtkYLWl@cluster0.pwg4n7y.mongodb.net/?retryWrites=true&w=majority"
    target_uri = "mongodb+srv://teddy:MSbL4wnpTaI3JnNm@cluster0.58aiypw.mongodb.net/?retryWrites=true&w=majority"
    migrate_data(source_uri,target_uri)