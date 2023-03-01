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

Tun the container
```
mkdir static && docker run -it -d -p 8008:8008 -v $PWD/cfdscomplementos:/opt/cfdscomplementos -v $PWD/cfdsprovee:/opt/cfdsprovee -v $PWD/static:/app/suppliers/static --name portal_oxirus oxirus:v01 && docker cp portal_oxirus:/tmp/backup/. ./static
```
