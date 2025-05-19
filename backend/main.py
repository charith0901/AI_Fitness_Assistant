from fastapi import FastAPI
from app.schemas import FitnessInput
from app.crud import save_user_data_to_db, get_all_user_data
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
import re

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
with open("fitness_model.pkl", "rb") as f:
    model = pickle.load(f)


plan_labels = {
    0: "Bodyweight Workout + Walking",
    1: "Cardio + Full Body Training",
    2: "General Fitness Plan",
    3: "HIIT + Cardio",
    4: "Light Cardio + Yoga",
    5: "Strength + Glute Focus",
    6: "Strength + Upper/Lower Split",
    7: "Walking + Light Stretching"
}

def get_fitness_advice(data: FitnessInput, plan: str):
  prompt = f"""
You are a health assistant bot. Based on user input, provide personalized fitness and diet recommendations. 
A user has the following profile:
  - Age: {data.Age}
  - Weight: {data.Weight}
  - Goal: {data.Goal}
  - Activity Level: {data.ActivityLevel}
  - Predicted Plan: {plan}

Respond strictly in this JSON format:

{{
  "WeeklyWorkoutSchedule": {{
  "Overview": "...#overview with age and weight compatibility",
  "Schedule": {{
    "Monday": ["..."],
    "Tuesday": ["..."],
    "...": ["..."]
  }},
  "Progression": {{
    "Weeks1to2": "...",
    "Weeks3to4": "...",
    "Weeks5plus": "..."
  }}
  }},
  "DietRecommendation": {{
  "Focus": {{
    "FruitsAndVeggies": "...",
    "Protein": "...",
    "WholeGrains": "...",
    "HealthyFats": "...",
    "Hydration": "..."
  }},
  "MealTiming": "...",
  "SampleMealPlan": {{
    "Breakfast": "...",
    "Lunch": "...",
    "Dinner": "...",
    "Snacks": ["...", "..."]
  }},
  "Avoid": ["..."],
  "CalorieDeficit": "...",
  "Notes": ["..."]
  }},
  "FitnessTips": ["...", "..."],
  "MotivationMessage": "..."
}}

Now generate a response for a user who wants to start a light fitness plan with simple healthy food.
"""
  print("👉 Sending this prompt to Gemini:\n")
  print(prompt)
  print("\n")
  model = genai.GenerativeModel("gemini-2.0-flash")
  response = model.generate_content(prompt)
  print("👉 Got this response from Gemini:\n")
  print(response.text)
  print("\n")
  raw = response.text

  # Remove markdown and trim
  cleaned = re.sub(r'```json|```', '', raw).strip()

  # Parse JSON
  parsed = json.loads(cleaned)
  return parsed

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fitness Prediction API!"}

@app.post("/predict")
async def predict_fitness(data: FitnessInput):
    input_array = np.array([[data.Age, data.Gender, data.Weight, data.Goal, data.ActivityLevel]])
    prediction = model.predict(input_array)[0]
    #save to database
    await save_user_data_to_db(data, prediction)

    advice = get_fitness_advice(data, plan_labels[prediction])
    
    return {"predicted_plan": plan_labels[prediction],
            "advice": advice
            }
@app.get("/get_all_user_data")
async def get_all_user_data_from_db():
    records = await get_all_user_data()
    return records
