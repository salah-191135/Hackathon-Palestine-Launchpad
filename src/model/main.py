import numpy as np
from flask import Flask, request, jsonify
import datetime
import pandas as pd
import lightgbm
import joblib

app = Flask(__name__)

import os
import pickle

model_path = r'course_recommendation_model1.pkl'

if os.path.exists(model_path):
    with open(model_path, 'rb') as file:
        try:
            model = pickle.load(file)
            print("Model loaded successfully using pickle!")
        except Exception as e:
            print(f"Error loading model using pickle: {e}")
else:
    print(f"Model file not found: {model_path}")

# Feature Mappings
gender_mapping = {"m": 0, "f": 1, "o": 2, "unknown": 3}
degree_mapping = {
    'Less than Secondary': 0,
    'Secondary': 1,
    "Bachelor's": 2,
    "Master's": 3,
    "Doctorate": 4
}
interest_mapping = {
    "Humanities": 2,
    "Computer Science": 0,
    "Health": 1
}

# Course Details Mapping
course_details = {
    0: {"institution": "HarvardX", "code": "CB22x", "full_title": "The Ancient Greek Hero"},
    1: {"institution": "HarvardX", "code": "CS50x", "full_title": "Introduction to Computer Science I"},
    2: {"institution": "HarvardX", "code": "ER22x", "full_title": "Justice"},
    3: {"institution": "HarvardX", "code": "PH207x",
        "full_title": "Health in Numbers: Quantitative Methods in Clinical & Public Health Research"},
    4: {"institution": "HarvardX", "code": "PH278x", "full_title": "Human Health and Global Environmental Change"}
}


# Function to Preprocess User Data
def preprocess(data):
    gender = data.get('gender', "unknown")  # Default to "unknown"
    YoB = int(data.get('YoB', 2000))  # Default to 2000 if missing
    LoE_DI = data.get('LoE_DI', "Less than Secondary")  # Default education level
    field_of_study = data.get('course_field_mapping', "Unknown")  # Default field

    # Map gender
    gender_encoded = gender_mapping.get(gender, 3)  # Default to "unknown"
    print(gender_encoded)

    # Calculate age from YoB
    current_year = datetime.datetime.now().year
    age = current_year - YoB
    print(age)

    # Map education level (degree)
    degree_encoded = degree_mapping.get(LoE_DI, 0)  # Default to "Less than Secondary"
    print(degree_encoded)
    # One-hot encode field of study
    interest_encoded = interest_mapping.get(field_of_study, [0])  # Default to [0,0,0]
    print(interest_encoded)
    # Combine features into a single list for model prediction
    processed_data = [degree_encoded, YoB, gender_encoded, interest_encoded]
    print(processed_data)
    return processed_data


# API Route for Predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    processed_data = preprocess(data)

    try:
        # Get probabilities for all classes
        probabilities = model.predict_proba([processed_data])[0]  # Shape: (n_classes,)

        # Get indices of top N predictions (e.g., top 3)
        top_n = 3
        top_indices = np.argsort(probabilities)[-top_n:][::-1]  # Descending order

        # Get corresponding course IDs and probabilities
        recommendations = []
        for idx in top_indices:
            course_id = idx  # Or use LabelEncoder if needed (see note below)
            confidence = probabilities[idx]

            # Fetch course details
            course_info = course_details.get(course_id, {
                "institution": "Unknown",
                "code": "N/A",
                "full_title": "Unknown Course"
            })

            recommendations.append({
                "course_code": course_info["code"],
                "confidence": float(confidence),  # Convert numpy float to Python float
                "institution": course_info["institution"],
                "full_title": course_info["full_title"]
            })

        return jsonify({"recommendations": recommendations})

    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)  # Run Flask app
