MONGO_VOLUME_PATH=`cat cfg.txt | grep MONGO_VOLUME_PATH | cut -d "=" -f2`
docker run -p 27017:27017 -v $MONGO_VOLUME_PATH:/data/db mongo