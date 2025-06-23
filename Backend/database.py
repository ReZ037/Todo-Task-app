from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv, dotenv_values
import os 


load_dotenv()


SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:'+os.getenv('db_password')+'@localhost:5432/TaskListdb'


engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


