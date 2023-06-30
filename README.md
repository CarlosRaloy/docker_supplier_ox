# Portal Oxirus


Create the folders
```
mkdir /opt/cfdscomplementos && mkdir /opt/cfdsprovee
```

Create the symbolik links
```
sudo ln -r -s /opt/cfdscomplementos/ $(pwd)/ && ln -r -s /opt/cfdsprovee $(pwd)/
```

Run the imege
```
docker build -t oxirus:v01 .
```

Run the container
```
docker run -it -d -p 8000:8000 -v $(pwd)/cfdscomplementos:/opt/cfdscomplementos -v $(pwd)/cfdsprovee:/opt/cfdsprovee --name portal_oxirus oxirus:v01
```

View the logs
```
docker logs portal_oxirus -f
```

Enter the container
```
docker exec -it portal_oxirus sh
```


Stop and delete the container
```
docker stop portal_oxirus && docker rm portal_oxirus && docker rmi oxirus:v01
```
