from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List,Annotated
from dotenv import load_dotenv
from database import engine, SessionLocal
import os
import models

load_dotenv()
# environment variables


app = FastAPI()
models.Base.metadata.create_all(bind=engine)

items = []

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class Task(BaseModel):
    Taskid: int
    TaskName: str
    TaskDescription: str = "empty"
    TaskDate: str = "no date set"

@app.get("/")
def root(db: db_dependency):
    result = db.query(models.tasklist).filter(models.tasklist.taskid == 1).first()
    if not result:
        return{"error": "Task not found"}
    return result

@app.post("/items")
def create_item(item:Task):
    items.append(item)
    return items

@app.get("/items", response_model=list[Task])
def ListItems(limit: int = 10):
    return items[0:limit]

@app.get("/items/{item_id}", response_model=Task)
def get_item(item_id: int ) -> Task:
    if item_id < len(items):
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail=f"Item {item_id} not found")