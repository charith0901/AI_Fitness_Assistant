from sqlalchemy import Column, Integer, Float, DateTime, func
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