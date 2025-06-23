from database import Base
from sqlalchemy import Boolean,Column,ForeignKey,Integer,String


class tasklist(Base):
    __tablename__ = 'tasklist'
    taskid = Column(Integer, primary_key =True)
    taskname = Column(String, index = True)
    taskdescription = Column(String, index = True)
    taskdate = Column(String, index = True)