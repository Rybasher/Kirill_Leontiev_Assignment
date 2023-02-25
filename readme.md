# Kirill Leontiev Assessment

## Run application with docker

```docker-compose up --build```

## Run application without docker (Linux)

using make command

1. make run-server
2. make run-client

without docker and makefiles

### Without docker

Create virtual env
- python3 -m venv venv
- source venv/bin/activate

Setup project
- install dependencies ```pip install -r requirements.txt```
- apply migrations ```python manage.py migrate```
- run command ```python manage.py runserver 0.0.0.0:8000```

# Application using

1. to see FE part, go to http://localhost:3000
2. to see BE endpoints, go to http://localhost:8000/docs

You can use existing user credentials
1. test_user test_user@meistery.net Password: trial_application
2. test_user test_user2@meistery.net Password: trial_application


