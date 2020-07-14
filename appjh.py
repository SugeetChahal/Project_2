import os
import json
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

engine = create_engine("postgresql://postgres:1023@localhost:5432/race")
Base = automap_base()
Base.prepare(engine, reflect=True)


templateDir = os.path.abspath('./template')
app = Flask(__name__, template_folder=templateDir)

@app.route("/")
def index(): 
    return render_template("race.html")

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
    
if __name__ == '__main__':
    app.run(debug=True)