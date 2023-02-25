run-client:
	cd ./client && npm i && npm start


run-server:
	cd ./server && sudo apt-get install python3-pip && python3 -m pip install -r requirements.txt && python3 manage.py runserver