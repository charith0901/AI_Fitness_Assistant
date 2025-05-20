from pydantic import BaseModel

class FitnessInput(BaseModel):
    Age: int
    Gender: int         
    Weight: float
    Goal: int           
    ActivityLevel: int  
    