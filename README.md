- [db diagram](https://dbdiagram.io/d/64259d9c5758ac5f17257e73)
- [service diagram](https://excalidraw.com/#json=wc6QmaBiEQU9j5Ooma1dh,dBRuTd4EY7eBvyEfQPX3Iw)

### using docker to build local mongodb for testing

docker run --name mongo \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME="root" \
 -e MONGO_INITDB_ROOT_PASSWORD="root" \
 -d prismagraphql/mongo-single-replica:5.0.3

url: mongodb://root:root@localhost:27017/baplcp?authSource=admin&directConnection=true
