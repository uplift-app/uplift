# How To: Seed Database

Either use the already created data in the mocks folder or create your own data.

## 1. Create your own data

If you don't want to create new data, proceed with step 2. Otherwise continue reading.
To create your own data you need to setup a Python environment where you can execute the data creation scripts. (depending on how you have installed Python you have to use the command python or python3)

```bash
python -m venv venv
# or
python3 -m venv venv
```

Next you have to activate the environment

```bash
# Windows
venv\Scripts\activate
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

Navigate into the scripts folder and execute

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
