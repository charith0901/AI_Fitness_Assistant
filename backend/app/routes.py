from app.crud import save_user_data_to_db, get_all_user_data, get_current_model_version
from app.schemas import FitnessInput
import numpy as np
from app.advicing import get_fitness_advice
from app.labels import plan_labels
import pickle
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from train.train_model import retrain_model
import pandas as pd

router = APIRouter()

# Load model
async def load_model():
    try:
        with open("./models/fitness_model_v1.pkl", "rb") as f:
            return pickle.load(f)
    except FileNotFoundError:
        try:
            print("Model not found. Retraining...")
            await retrain_model("v1")
            with open("./models/fitness_model_v1.pkl", "rb") as f:
                return pickle.load(f)
        except Exception as e:
            print(f"Error retraining model: {e}")
            raise HTTPException(status_code=500, detail="Model retraining failed. Please check the logs.")


@router.get("/")
def read_root():
    return {"message": "Welcome to the Fitness Prediction API!"}

@router.post("/predict")
async def predict_fitness_plan(data: FitnessInput):
    model = await load_model()
    try:
        input_array = np.array([[data.Age, data.Gender, data.Weight, data.Goal, data.ActivityLevel]])
        prediction: int = model.predict(input_array)[0]
        print("plan is",prediction)
        # save to database
        await save_user_data_to_db(data, prediction)

        advice = get_fitness_advice(data, plan_labels[prediction])
        data ={
            "predicted_plan": plan_labels[prediction],
            "advice": advice
            }

        return JSONResponse(content=data, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Prediction failed. Please check the logs.")


@router.get("/recent")
async def get_all_user_data_from_db():
    try:
        records = await get_all_user_data()
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post('/retrain_model')
async def retrain_model_the_model():
    try:
        await retrain_model_with_data()
        return {"message": "Model retrained successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get('/model_info')
async def get_current_model():
    try:
        return await get_current_model_version()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def retrain_model_with_data():
    try:
        current_model = await get_current_model_version()
        await add_new_data_to_csv(current_model["version"])
        await retrain_model(await get_next_version())
    except Exception as e:
        print(f"Error retraining model: {e}")
        raise HTTPException(status_code=500, detail="Model retraining failed. Please check the logs.")
    
async def add_new_data_to_csv(version: str):
    try:
        records = await get_all_user_data()
        existing_path = f"./data/fitness_data_{version}.csv"
        existing_df = pd.read_csv(existing_path)

        if records:
            new_df = pd.DataFrame(records)

            # Step 1: Normalize column names
            def normalize_cols(df):
                df.columns = (
                    df.columns.str.strip()
                    .str.replace("_", "")
                    .str.capitalize()
                )
                return df

            existing_df = normalize_cols(existing_df)
            new_df = normalize_cols(new_df)

            print(existing_df.columns)
            print(new_df.columns)

            # Step 2: Align columns (intersection)
            common_cols = existing_df.columns.intersection(new_df.columns)
            existing_df = existing_df[common_cols]
            new_df = new_df[common_cols]

            # Step 3: Combine and remove duplicates
            combined_df = pd.concat([existing_df, new_df], ignore_index=True).drop_duplicates()

            combined_df.to_csv(f"./data/fitness_data_{await get_next_version()}.csv", index=False)
            print("Data merged and saved successfully.")
        else:
            print("No new data to add.")
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="CSV update failed.")
    
async def get_next_version():
    try:
        current_model = await get_current_model_version()
        if current_model:
            version_num = int(current_model["version"].lstrip("v"))
            return f"v{version_num + 1}"
        else:
            return "v1"
    except Exception as e:
        print(f"Error getting next version: {e}")
        raise HTTPException(status_code=500, detail="Failed to get next version. Please check the logs.")