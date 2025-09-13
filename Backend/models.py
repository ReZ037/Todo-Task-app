from database import Base
from sqlalchemy import Boolean,Column,ForeignKey,Integer,String,Date

# This is the database table model for the tasklist tabel
class tasklist(Base):
    __tablename__ = 'tasklist'
    taskid = Column(Integer, primary_key =True, index=True, autoincrement=True)
    taskname = Column(String, index = True)
    taskdescription = Column(String, index = True)
    taskdate = Column(Date, index = True)