from pydantic import BaseModel

class FitnessInput(BaseModel):
    Age: int
    Gender: int         # 0: Female, 1: Male
    Weight: float
    Goal: int           # Encoded value
    ActivityLevel: int  # Encoded value
    