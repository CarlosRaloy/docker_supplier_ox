# Portal Oxirus


```
mkdir /opt/cfdscomplementos

mkdir /opt/cfdsprovee

sudo ln -r -s /opt/cfdscomplementos/ $(pwd)/

sudo ln -r -s /opt/cfdsprovee $(pwd)/
```


```
docker build -t oxirus:v01 .
```

```
mkdir static && docker run -it -d -p 8008:8008 -v $PWD/cfdscomplementos:/opt/cfdscomplementos -v $PWD/cfdsprovee:/opt/cfdsprovee -v $PWD/static:/app/suppliers/static --name portal_oxirus oxirus:v01 && docker cp portal_oxirus:/tmp/backup/. ./static
```
