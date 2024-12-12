import os
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for React frontend running on port 3001
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})  # Allow requests from localhost:3001

# Set up OpenWeatherMap API key and URL
API_KEY = "0b7c4359a4f54ab535d9c0bc67f5af65"  # Replace with your OpenWeatherMap API key
API_URL = "http://api.openweathermap.org/data/2.5/weather"

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city", default="London", type=str)
    units = request.args.get("units", default="metric", type=str)  # Celsius by default

    # Make the API request to OpenWeatherMap
    params = {
        "q": city,  # City entered by the user
        "appid": API_KEY,  # Your OpenWeatherMap API key
        "units": units,  # Units for temperature (metric for Celsius)
    }
    response = requests.get(API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "weather": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
        })
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    # Run the Flask app on port 5002
    app.run(debug=True, port=5002)



