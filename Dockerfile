FROM python:3.10.4-alpine3.15

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add git vim neovim htop

# Repository
RUN git clone https://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@github.com/Raloy-Lubricantes-S-A-de-C-V/DEV024.git

RUN python3 -m venv venv
RUN chmod -R 777 venv
RUN source venv/bin/activate
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --upgrade setuptools

RUN mkdir /opt/cfdscomplementos && mkdir /opt/cfdsprovee

COPY requeriments.txt .

RUN pip install -r requeriments.txt

ENV PIP_ROOT_USER_ACTION=ignore

RUN mv /app/DEV024 /app/suppliers

COPY oxirus-entrypoint.sh /app

# Static backup

RUN mkdir /tmp/backup

RUN mv /app/suppliers/static/* /tmp/backup

# Change the branch
WORKDIR /app/suppliers

RUN ls

RUN git remote show origin

RUN git fetch

RUN git checkout develop

EXPOSE 8008

WORKDIR /app

RUN ls 

RUN ["chmod", "+x", "/app/oxirus-entrypoint.sh"]

ENTRYPOINT ["sh", "/app/oxirus-entrypoint.sh"]