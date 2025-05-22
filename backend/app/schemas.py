from pydantic import BaseModel

class FitnessInput(BaseModel):
    Age: int
    Gender: int         
    Weight: float
    Goal: int           
    ActivityLevel: int  

class Model_Version_Input(BaseModel):
    model_file_name: str
    dataset_file_name: str
    version: str
    accuracy: float
    status: str
    created_at: str    