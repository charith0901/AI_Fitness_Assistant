import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
import pickle

# 1. Load dataset
df = pd.read_csv("fitness_data.csv")

# 2. Label encode text fields
le = LabelEncoder()
df["Age"] = le.fit_transform(df["Age"])
df["Weight"] = le.fit_transform(df["Weight"])
df["Gender"] = le.fit_transform(df["Gender"])
df["Goal"] = le.fit_transform(df["Goal"])
df["ActivityLevel"] = le.fit_transform(df["ActivityLevel"])
df["Plan"] = le.fit_transform(df["Plan"])

# Optional: Save encoders if needed later
with open("label_encoder.pkl", "wb") as f:
    pickle.dump(le, f)

# 3. Split features and target
X = df[["Age", "Gender", "Weight", "Goal", "ActivityLevel"]]
y = df["Plan"]

# 4. Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train Decision Tree model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# 6. Evaluate model
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2f}")

# 7. Save model
with open("fitness_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model training complete and saved as fitness_model.pkl")
