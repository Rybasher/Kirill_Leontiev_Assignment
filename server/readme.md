# Kirill Leontiev test task

## Project setup

### With docker

- run command
``` docker-compose up --build ```

### Without docker

Create virtual env
- python3 -m venv venv
- source venv/bin/activate

Setup project
- install dependencies ```pip install -r requirements.txt```
- apply migrations ```python manage.py migrate```
- run command ```python manage.py runserver 0.0.0.0:8000```