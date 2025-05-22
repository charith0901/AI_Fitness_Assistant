import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from app.schemas import Model_Version_Input
from app.crud import save_model_version_to_db
import pickle


async def retrain_model(version: str = "v1"):
# 1. Load dataset
    df = pd.read_csv(f"data/fitness_data_{version}.csv")

    # 2. Label encode text fields
    le = LabelEncoder()
    df["Age"] = le.fit_transform(df["Age"])
    df["Weight"] = le.fit_transform(df["Weight"])
    df["Gender"] = le.fit_transform(df["Gender"])
    df["Goal"] = le.fit_transform(df["Goal"])
    df["Activitylevel"] = le.fit_transform(df["Activitylevel"])
    df["Plan"] = le.fit_transform(df["Plan"])

    # Optional: Save encoders if needed later
    with open(f"labels/label_encoder_{version}.pkl", "wb") as f:
        pickle.dump(le, f)

    # 3. Split features and target
    X = df[["Age", "Gender", "Weight", "Goal", "Activitylevel"]]
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
    with open(f"models/fitness_model_{version}.pkl", "wb") as f:
        pickle.dump(model, f)

    print("Model training complete and saved as fitness_model_{version}.pkl")

    export_data = Model_Version_Input(
        model_file_name=f"fitness_model_{version}.pkl",
        dataset_file_name=f"fitness_data_{version}.csv",
        version=version,
        accuracy=accuracy,
        status="current",
        created_at=pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    try:
        await save_model_version_to_db(export_data)
    except Exception as e:
        print(f"Error saving model version data to database: {e}")
