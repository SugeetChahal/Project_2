# Import Dependencies
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_covid

# Create instance of Flask app
app = Flask(__name__)

# Set up a Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")

# Create route that renders index.html template
@app.route("/")
def home():
    covid_data = mongo.db.covid_data.find_one()
    return render_template("index.html", text="COVID Data", covid_data=covid_data)

@app.route("/scrape")
def scrape():
    #Scrape for COVID data
    covid_data = mongo.db.covid_data
    covid_scrape_data = scrape_covid.scrape_data()
    covid_data.updated({}, covid_scrape_data, upsert=True)

    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)