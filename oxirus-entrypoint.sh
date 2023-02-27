#!/bin/bash

echo ".::: MAKEMIGRATIONS APPS :::."

python3 suppliers/manage.py migrate --settings=suppliers.local
python3 suppliers/manage.py makemigrations --settings=suppliers.local

echo ".::: MIGRATIONS APPS :::."

python3 suppliers/manage.py migrate --settings=suppliers.local

echo ".::: GENERAL MIGRATIONS :::."

python3 suppliers/manage.py runserver 0.0.0.0:8008 --settings=suppliers.local

echo ">>>"
echo "--------------------------COMPLETE--------------------------------"
echo "----- .: Oxirus Docker is fully configured successfully :. -------"
echo ">>>"


exec "$@"
