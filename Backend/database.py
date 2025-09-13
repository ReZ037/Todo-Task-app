from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv, dotenv_values
import os


load_dotenv()

# Setup database URL
SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:'+os.getenv('db_password')+'@localhost:5432/TaskListdb'

# Establish a connection to your database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Start the session with your database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the base class
Base = declarative_base()




