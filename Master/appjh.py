import os
import json
import numpy as np
import scrape_covid
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_pymongo import PyMongo

from flask import Flask, render_template, redirect, jsonify
# from flask import Flask, jsonify, render_template

templateDir = os.path.abspath('./template')
app = Flask(__name__, template_folder=templateDir)

mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_app")
engine = create_engine("postgresql://USER:PASS@localhost:5432/race")
Base = automap_base()
Base.prepare(engine, reflect=True)


@app.route("/")
def index(): 
    return render_template("index.html")
    
@app.route("/race")
def race(): 
    return render_template("race.html")

@app.route("/jobloss")
def jobloss(): 
    return render_template("jobloss.html")    
    

@app.route("/covid")
def getCovidCases(): 
    dataPerState = engine.execute("SELECT * FROM RACE")
    data = []
    for row in dataPerState:
        data.append(
            {
                "State": row[1],
                "statics": [
                    {"race": "White", "case": row[5]},
                    {"race": "Black", "case": row[6]},
                    {"race": "Latin", "case": row[7]},
                    {"race": "Asian", "case": row[8]},
                    {"race": "AIAN", "case": row[9]},
                    {"race": "NHPI", "case": row[10]},
                    {"race": "Multiracial", "case": row[11]},
                    {"race": "Other", "case": row[12]},
                    {"race": "Unknown", "case": row[13]}
                ]
            })
    res = {
        "data": data
    }
    return res

@app.route("/covidcases")
def covidcases():
    # Create a variable for the connection to mongo
    covid_data = mongo.db.covid_data.find_one()
    # Create a dictionary to save all the cleaned data; removes the id:object
    clean_data = {}
    for x in covid_data:
        if x != "_id":
            clean_data[x] = covid_data[x]
    # clean_data = jsonify(clean_data)
    print(clean_data)
    return render_template("covidcases.html", text="COVID Data", clean_data=clean_data)

@app.route("/covidjson")
def covidjson():
    covid_data = mongo.db.covid_data.find_one()
    # Create a dictionary to save all the cleaned data; removes the id:object
    covid_data2 = {}
    for i in range(len(covid_data["states"])):
        covid_data2[f"{i}"] = {
            "states": covid_data["states"][i],
            "cases": covid_data["cases"][i],
            "deaths": covid_data["deaths"][i],
            "actives": covid_data["actives"][i],
            "recovered": covid_data["recovered"][i]
        }
    clean_data = {}
    for x in covid_data2:
        if x != "_id":
            clean_data[x] = covid_data2[x]
    print(clean_data)
    # return jsonify(clean_data)
    return clean_data

@app.route("/scrape")
def scrape():
    #Scrape for COVID data
    covid_data = mongo.db.covid_data
    covid_scrape_data = scrape_covid.scrape_data()
    covid_data.update({}, covid_scrape_data, upsert=True)
    return redirect("/", code=302)

if __name__ == '__main__':
    app.run(debug=True)