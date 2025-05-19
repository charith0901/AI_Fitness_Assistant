from app.database import SessionLocal
from app.models import FitnessData
from app.schemas import FitnessInput
from sqlalchemy.future import select

async def save_user_data_to_db(data: FitnessInput,prediction:int):
    async with SessionLocal() as session:
        record =FitnessData(
            weight=data.Weight,
            age=data.Age,
            gender=data.Gender,
            goal=data.Goal,
            activity_level=data.ActivityLevel,
            plan=prediction
        )
        session.add(record)
        await session.commit()

async def get_all_user_data():
    async with SessionLocal() as session:
        result = await session.execute(select(FitnessData))
        records = result.scalars().all()
        return records