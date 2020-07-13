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
    return render_template("index.html")

@app.route("/covid")
def getCovidCases(): 
    dataPerState = engine.execute("SELECT * FROM RACE")
    data = []
    for row in dataPerState:
        data.append(
            {
                "State": row[1],
                "statics": [
                    {"race": "white", "case": row[5]},
                    {"race": "black", "case": row[6]},
                    {"race": "latin", "case": row[7]},
                    {"race": "asian", "case": row[8]},
                    {"race": "aian", "case": row[9]},
                    {"race": "nhpi", "case": row[10]},
                    {"race": "multiracial", "case": row[11]},
                    {"race": "other", "case": row[12]},
                    {"race": "unknown", "case": row[13]}
                ]
            })
    res = {
        "data": data
    }
    return res
    
if __name__ == '__main__':
    app.run(debug=True)