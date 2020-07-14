# 1. import Flask
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:1379@localhost:5432/project_2"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Welcome to my 'Home' page!"
# 4. Define what to do when a user hits the /about route
@app.route("/SF_crime")
def SF_crime():
    return jsonify(db_output)
if __name__ == "__main__":
    app.run(debug=True)
