from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session, sessionmaker
from pydantic import BaseModel
from typing import List,Annotated
from dotenv import load_dotenv
from database import engine, SessionLocal, Base
import os
from models import tasklist,Base
import models
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

# environment variables
load_dotenv()



app = FastAPI()

# Approved Connections list
origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

items = []

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
"""
Task object's
"""
class TaskCreate(BaseModel):
    taskname: str
    taskdescription: str
    taskdate: date
class Task(TaskCreate):
    taskid: int

"""
Will return all tasks in the database

:param none
:type none
:returns: list of tasks
:rtype: list of objects
"""
@app.get("/")
def root(db: db_dependency):
    result = []
    #result.append(db.query(models.tasklist).filter(models.tasklist.taskid == 1).first())
    for instance in db.query(models.tasklist):
        result.append(instance)
    if not result:
        return{"error": "Task not found"}
    return result

"""
You can submit a task to be added to the database

:param taskname, taskdescription, taskdate
:type object
:returns: list of tasks
:rtype: list of objects
"""
@app.post("/items")
def create_item(item: TaskCreate, db: db_dependency):
    db_task = models.tasklist(**item.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task
"""
You can update a task in the database

:param taskid
:type int
:returns: task
:rtype: object
"""
@app.put("/items/{task_id}")
def update_task(task_id: int, task_update: Task, db: Session = Depends(get_db)):
    # Find the task
    task = db.query(tasklist).filter(tasklist.taskid == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update only provided fields
    task.taskname = task_update.taskname
    task.taskdescription = task_update.taskdescription
    task.taskdate = task_update.taskdate

    db.commit()
    db.refresh(task)

    return task
"""
Will return up to 10 tasks from the database

:param none
:type none
:returns: list of tasks
:rtype: list of objects
"""
@app.get("/items", response_model=list[Task])
def ListItems(limit: int = 10):
    return items[0:limit]

"""
Will return the task with the provided id

:param item_id: The ID of the item you want to retrieve
:type item_id: int
:returns: The item of the provided ID
:rtype: object
"""
@app.get("/items/{item_id}", response_model=Task)
def get_item(item_id: int, db: Session = Depends(get_db)):
    task = db.query(tasklist).filter(tasklist.taskid == item_id).first()
    if not task:
        raise HTTPException(status_code=404, detail=f"Task {item_id} not found")
    return task
"""
Will return the task with the provided id

:param item_id: The ID of the item you want to retrieve
:type item_id: int
:returns: String
:rtype: none
"""
@app.delete("/items/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(tasklist).filter(tasklist.taskid == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": f"Task {task_id} deleted successfully"}