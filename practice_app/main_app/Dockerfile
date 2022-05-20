FROM python:3.10.4
RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y default-libmysqlclient-dev

RUN pip install requests

ENV PYTHONUNBUFFERED=1
ENV current_wheather_data 276027f9c2d690dfc36c80f833f0a709

WORKDIR /app

COPY Requirements.txt /app/
RUN python -m pip install -r Requirements.txt

COPY . /app
