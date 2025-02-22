import pandas as pd
import numpy as np
import sklearn
data = pd.read_csv("system-data.csv")

#print("🔍 Checking Missing Values:")
#print(data.isnull().sum())

#print("\n📌 Sample Data:")
#print(data.head())


user_data = data[["userid_DI", "gender", "LoE_DI", "YoB"]].drop_duplicates()

course_field_mapping = {
    "CB22x": "Humanities",
    "ER22x": "Humanities",
    "CS50x": "Computer Science",
    "PH207x": "Health",
    "PH278x": "Health",
}

# Extract the course code and map to a field of study
data["course_code"] = data["course_id"].apply(lambda x: x.split("/")[1])  # Extract course code
data["field_of_study"] = data["course_code"].map(course_field_mapping)

# print(data["course_code"])

print(data["field_of_study"])
# Fill missing values correctly
data.loc[:, "LoE_DI"] = data["LoE_DI"].fillna(data["LoE_DI"].mode()[0])
data.loc[:, "YoB"] = data["YoB"].fillna(data["YoB"].median())
data.loc[:, "gender"] = data["gender"].fillna("unknown")

education_mapping = {'Less than Secondary': 0, 'Secondary': 1, "Bachelor's": 2, "Master's": 3, "Doctorate": 4}
data["LoE_DI"] = data["LoE_DI"].map(education_mapping)

gender_mapping = {"m": 0, "f": 1, "o": 2, "unknown": 3}
data["gender"] = data["gender"].map(gender_mapping)

from sklearn.preprocessing import LabelEncoder

le_course = LabelEncoder()
data["course_id_enc"] = le_course.fit_transform(data["course_id"])

from sklearn.preprocessing import LabelEncoder

# Encode categorical features
le_gender = LabelEncoder()
le_edu = LabelEncoder()
le_field = LabelEncoder()

data["gender_enc"] = le_gender.fit_transform(data["gender"])
data["LoE_DI_enc"] = le_edu.fit_transform(data["LoE_DI"])
data["field_of_study_enc"] = le_field.fit_transform(data["field_of_study"])

print(data["field_of_study_enc"])

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder

# ----------------------------
# Step 1: Encode `course_id` if not already done
# ----------------------------
# Check if 'course_id_enc' exists; if not, create it
if 'course_id_enc' not in data.columns:
    le_course = LabelEncoder()
    data['course_id_enc'] = le_course.fit_transform(data['course_id'])

X = data[['LoE_DI_enc', 'YoB', 'gender_enc', 'field_of_study_enc']]
y = data['course_id_enc']  # Use the encoded course IDs

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# LightGBM - fast and high performance
import lightgbm as lgb

# Create the model
lgb_model = lgb.LGBMClassifier(
    boosting_type='gbdt',
    num_leaves=31,
    max_depth=-1,
    learning_rate=0.1,
    n_estimators=300,
    random_state=42
)

# Train
lgb_model.fit(X_train, y_train)

# Evaluate
y_pred = lgb_model.predict(X_test)


#print(f"LightGBM Accuracy: {accuracy_score(y_test, y_pred):.4f}")


import lightgbm as lgb
import pickle

# Assuming you have a trained LightGBM model
# model = lgb.train(...)

# Save the model using pickle
model_path = r'course_recommendation_model1.pkl'
with open(model_path, 'wb') as file:
    pickle.dump(lgb_model, file)

#print("Model saved successfully using pickle!")
