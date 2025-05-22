from app.database import SessionLocal
from app.models import FitnessData,Model_Version_Data
from app.schemas import FitnessInput,Model_Version_Input
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
    
async def save_model_version_to_db(data:Model_Version_Input):
    await update_all_models_to_old()
    async with SessionLocal() as session:
        record = Model_Version_Data(
            model_file_name=data.model_file_name,
            dataset_file_name=data.dataset_file_name,
            version=data.version,
            accuracy=data.accuracy,
            status=data.status
        )
        session.add(record)
        await session.commit()
    
async def get_current_model_version():
    async with SessionLocal() as session:
        result = await session.execute(select(Model_Version_Data).where(Model_Version_Data.status == "current").order_by(Model_Version_Data.created_at.desc()))
        records = result.scalars().all()
        if records:
            return {
                "model_file_name":records[0].model_file_name,
                "dataset_file_name":records[0].dataset_file_name,
                "version":records[0].version,
                "accuracy":records[0].accuracy,
                "status":records[0].status,
                "created_at":records[0].created_at.strftime("%Y-%m-%d %H:%M:%S") if records[0].created_at else ""
            }
        else:
            return None

async def update_all_models_to_old():
    async with SessionLocal() as session:
        result = await session.execute(select(Model_Version_Data).where(Model_Version_Data.status == "current"))
        records = result.scalars().all()
        for record in records:
            record.status = "old"
        await session.commit()

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