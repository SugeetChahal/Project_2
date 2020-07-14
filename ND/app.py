# Import Dependencies
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import scrape_covid

# Create instance of Flask app
app = Flask(__name__)

# Set up a Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid_app")

# Create route that renders index.html template
@app.route("/")
def home():
    # Create a variable for the connection to mongo
    covid_data = mongo.db.covid_data.find_one()
    # Create a dictionary to save all the cleaned data; removes the id:object
    clean_data = {}
    for x in covid_data:
        if x != "_id":
            clean_data[x] = covid_data[x]
    # clean_data = jsonify(clean_data)
    print(clean_data)
    return render_template("index.html", text="COVID Data", clean_data=clean_data)


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

# Scrapes the data and saves to MongoDB; commented out when it's done
@app.route("/scrape")
def scrape():
    #Scrape for COVID data
    covid_data = mongo.db.covid_data
    covid_scrape_data = scrape_covid.scrape_data()
    covid_data.update({}, covid_scrape_data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)