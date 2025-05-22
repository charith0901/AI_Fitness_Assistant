from sqlalchemy import Column, Integer, Float, DateTime,String,Enum, func
from app.database import Base

class FitnessData(Base):
    __tablename__ = "fitness_data"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(Integer, nullable=False)
    goal = Column(Integer, nullable=False)
    activity_level = Column(Integer, nullable=False)
    plan = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=func.now())

class Model_Version_Data(Base):
    __tablename__ = "model_version"
    
    id = Column(Integer, primary_key=True, index=True)
    model_file_name = Column(String, nullable=False)
    dataset_file_name = Column(String, nullable=False)
    version = Column(String(length=255), nullable=False)
    accuracy = Column(Float, nullable=False)
    status = Column(Enum('current','old', name='model_status'), nullable=False)
    created_at = Column(DateTime, default=func.now())