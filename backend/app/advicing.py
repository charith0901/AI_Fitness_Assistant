from app.schemas import FitnessInput
import google.generativeai as genai
import json
import re
import os
from dotenv import load_dotenv
from app.labels import goal_labels, activitie_labels


load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_fitness_advice(data: FitnessInput, plan: str):
  prompt = f"""
You are a health assistant bot. Based on user input, provide personalized fitness and diet recommendations. 
A user has the following profile:
  - Age: {data.Age}
  - Weight: {data.Weight}
  - Goal: {goal_labels[data.Goal]}
  - Gender: {data.Gender}
  - Activity Level: {activitie_labels[data.ActivityLevel]}
  - Predicted Plan: {plan}

The response should based on above user input,they should be mentioned and should be in JSON format.
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