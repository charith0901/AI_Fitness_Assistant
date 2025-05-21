from app.database import SessionLocal
from app.models import FitnessData
from app.schemas import FitnessInput
from sqlalchemy.future import select
from app.labels import plan_labels, goal_labels, activitie_labels, gender_labels



async def save_user_data_to_db(data: FitnessInput,prediction:int):
    prediction = int(prediction)
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
        result = await session.execute(select(FitnessData).order_by(FitnessData.created_at.desc()))
        records = result.scalars().all()      
        return format_user_data(records)

def format_user_data(records):
        formatted_records = []
        for record in records:
            formatted_records.append({
                "id": record.id,
                "weight": record.weight,
                "gender": get_gender_label(record.gender),
                "age": record.age,
                "goal": get_goal_label(record.goal),
                "activity_level": get_activity_label(record.activity_level),
                "plan": plan_labels.get(record.plan, "Unknown"),
                "created_at": record.created_at.strftime("%Y-%m-%d %H:%M:%S") if record.created_at else ""
            })
        return formatted_records


def get_goal_label(goal_id):
    return goal_labels.get(goal_id, f"Goal {goal_id}")

def get_activity_label(activity_id):
    return activitie_labels.get(activity_id, f"Level {activity_id}")

def get_gender_label(gender_id):
    return gender_labels.get(gender_id, f"Gender {gender_id}")