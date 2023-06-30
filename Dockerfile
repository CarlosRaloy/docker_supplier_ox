FROM python:3.10.4-alpine3.15

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /var/www/
RUN mkdir html
RUN chmod +x html
RUN chmod 777 html

WORKDIR /var/www/html

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add git vim neovim htop nano

# Repository
RUN git clone https://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@github.com/Raloy-Lubricantes-S-A-de-C-V/DEV024.git

RUN python3 -m venv venv
RUN chmod -R 777 venv
RUN source venv/bin/activate
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN apk add nginx
RUN apk add openrc

RUN rc-update add nginx default

RUN mkdir /opt/cfdscomplementos && mkdir /opt/cfdsprovee

COPY requeriments.txt .

RUN pip install -r requeriments.txt

ENV PIP_ROOT_USER_ACTION=ignore

RUN mv /var/www/html/DEV024 /var/www/html/suppliers

COPY oxirus-entrypoint.sh /var/www/html

# Static backup

RUN mkdir /tmp/backup

#RUN mv /var/www/html/suppliers/static/* /tmp/backup

WORKDIR /var/www/html/suppliers/static/img
RUN mkdir carrusel
RUN chmod +x carrusel
RUN chmod 777 carrusel

# Change the branch
WORKDIR /var/www/html/suppliers
RUN ls
RUN git remote show origin
RUN git fetch
RUN git checkout develop
RUN git pull origin develop
RUN git branch

# Create the folder media
RUN mkdir media
RUN chmod +x media
RUN chmod 777 media

# Expose ports
EXPOSE 80
EXPOSE 443
EXPOSE 8000

# NGINX
WORKDIR /etc/nginx
RUN mkdir sites-available
RUN mkdir sites-enabled

WORKDIR /etc/nginx/sites-available
COPY proveedores.oxirus.net /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/proveedores.oxirus.net /etc/nginx/sites-enabled/
RUN nginx -t

# CERBOT
RUN apk add certbot certbot-nginx
RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt
COPY default.conf /etc/nginx/conf.d/default.conf

#CMD ["nginx", "-g", "daemon off;"]
#RUN nginx -s reload

WORKDIR /var/www/html

RUN ls 

RUN ["chmod", "+x", "/var/www/html/oxirus-entrypoint.sh"]

ENTRYPOINT ["sh", "/var/www/html/oxirus-entrypoint.sh"]

