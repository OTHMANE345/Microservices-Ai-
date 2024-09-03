from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from keras.models import load_model
from confluent_kafka import Producer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Kafka producer configuration
producer_conf = {
    'bootstrap.servers': 'localhost:9092',  # Kafka broker address
}

# Create Kafka producer
producer = Producer(producer_conf)
# Load the model
model = load_model("snek_detection_model.keras")

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/detect_snek", methods=["POST"])
def detect_snek():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"})

    image_file = request.files["image"]
    img = Image.open(image_file)
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    if prediction[0][0] >= 0.5:
        result = {"result": "Snek detected"}
        message = "Snek detected!"
        producer.produce("notificationTopic", value=message)
        producer.flush()
        print("Snek detected:", result)
        return jsonify(result)
    else:
        result = {"result": "No snek detected"}
        print("No snek detected:", result)
        return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
