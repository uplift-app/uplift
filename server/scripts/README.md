# How To: Setup the python virtual environment

In order for this project to run you need to set up a python environment and install the required packages in it. This is needed for the app to perform the analysis on the mood and activity data.

Depending on how you have installed Python you have to use the command python or python3. Open a terminal (eg. in VSCode) and make sure to be in the server folder. Then run the following command

```bash
python -m venv venv
# or
python3 -m venv venv
```

Next you have to activate the environment

```bash
# Windows
source venv/Scripts/activate
# macOS/Linux
source venv/bin/activate
```

Install dependencies needed for the Python scripts

```bash
# Windows
pip install pandas
# or
pip3 install pandas
```

With this setup the app should work fine. You can choose to use the app without any mock or proceed with the next step to seed the database.

# How To: Seed the database

## 1. Create your own data

With the activated python environment navigate into the scripts folder and execute

```bash
python activity.py # or mood.py
# or
python3 activity.py # or mood.py
```

The created data files will be activity_data.csv and mood_data.csv in the mocks filder.

## 2. Seed Database

To execute the seed script the server has to be build first to create compiled js files. From the server directory execute the following command

```bash
npm run build
```

Next navigate into the scripts folder and run

```bash
node seed.js
```
