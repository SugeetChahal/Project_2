import os
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


app = Flask(__name__)

# setup Postgres connection
engine = create_engine("postgresql://postgres:1023@localhost:5432/uscovid")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
uscovidData = Base.classes.uscovid

templateDir = os.path.abspath('./template')
app = Flask(__name__, template_folder=templateDir)

@app.route("/")
def index(): 
    return render_template("index.html")

# @app.route("/data_covid")
# def get_data():
#     session = Session(engine)
#     results = session.query(uscovidData).all()
#     session.close()
#     # Convert list of tuples into normal list
#     allData = list(np.ravel(results))
   
#     return jsonify(allData)


@app.route("/covid")
def getCovidCases(): 
    dataPerState = engine.execute("SELECT * FROM uscovid")
    data = []
    for row in dataPerState:
        data.append(
            {
                "Province_State": row[0],
                "Country_Region": row[1],
                "Last_Update": row[2],
                "Lat": row[3],
                "Long_": row[4],
                "Confirmed": row[5],
                "Deaths": row[6],
                "Recovered": row[7],
                "Active": row[8],
                "FIPS": row[9],
                "Incident_Rate": row[10],
                "People_Tested": row[11],
                "People_Hospitalized": row[12],
                "Mortality_Rate": row[13],
                "UID": row[14],
                "ISO3": row[15],
                "Testing_Rate": row[16],
                "Hospitalization_Rate": row[17]  
                }
            )
    res = {
        "data": data
    }
    return res

if __name__ == "__main__":
    app.run(debug=True)