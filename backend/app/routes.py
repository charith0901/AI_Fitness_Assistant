from app.crud import save_user_data_to_db, get_all_user_data
from app.schemas import FitnessInput
import numpy as np
from app.advicing import get_fitness_advice
from app.labels import plan_labels
import pickle
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

# Load model
with open("fitness_model.pkl", "rb") as f:
    model = pickle.load(f)

@router.get("/")
def read_root():
    return {"message": "Welcome to the Fitness Prediction API!"}

@router.post("/predict")
async def predict_fitness_plan(data: FitnessInput):
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
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/recent")
async def get_all_user_data_from_db():
    try:
        records = await get_all_user_data()
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
