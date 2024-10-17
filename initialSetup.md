# Task Management System

## Description

This is a full-stack web application built using Laravel and React. The application is containerized using Docker for ease of development and deployment.

## Prerequisites

- Docker installed on local machine.
- Php 8.2
- Node 16.0

## Getting Started

Follow the steps below to set up and run the application.

### Clone the Repository

https://github.com/SahilBhaskar/task-management.git

git@github.com:SahilBhaskar/task-management.git

- cd task-management
- git checkout master
- git pull origin master

### go to project path

- Change database details in code and docker file as per your details.
- I have created this application using details as follows
- DB_PORT=3306
- DB_DATABASE=task
- DB_USERNAME=root
- DB_PASSWORD=
    
### Run basic laravel commands first only once

- composer install
- php artisan key:generate
- cd ./frontend
- npm install

### Docker commands used

- docker-compose up --build  for creating a docker build
- if you are using docker first time then use the following two commands
  --docker-compose exec laravel bash
  --php artisan migrate
- check status of running docker containers
  docker-compose ps -a
- stop docker containers
  docker-compose down

  ### laravel app will run on:- http://localhost:8000/
  ### react app will run on:-  http://localhost:3000/