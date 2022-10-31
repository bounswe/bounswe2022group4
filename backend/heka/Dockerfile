# syntax=docker/dockerfile:1
FROM python:3.10-slim-buster
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN cat requirements.txt
RUN pip install -r requirements.txt
COPY . /code/
