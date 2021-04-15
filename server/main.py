from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os

if os.environ['MONGO_HOST']:
    mongo_client = MongoClient(os.environ['MONGO_HOST'])
    db = mongo_client['planner']
else:
    raise ValueError("Please set environment variable 'MONGO_HOST'")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.put("/createPlan")
async def create_plan(plan):
    collection = db['plan']
    collection.insert_one({'plan':'test'}) 
    return {}