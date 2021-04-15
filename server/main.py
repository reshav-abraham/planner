from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request, FastAPI
from pymongo import MongoClient
from typing import Any, Dict
import json

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
    return {"message": "Hello"}

@app.get("/plans")
async def create_plan():
    plans = []
    found_plans = db['plans'].find({})
    for plan in found_plans:
        del plan['_id']
        plans.append(plan)
    return json.dumps(plans)


@app.put("/createPlan")
async def create_plan(request: Dict[Any, Any]):
    if 'planId' in request:
        planId = request['planId']
    else:
        raise ValueError("500, please pass json with 'plan'")
        return {'status': 500}
    collection = db['plans']
    collection.insert_one({'planId': planId}) 
    return {'status': 200, 'msg': f'plan {planId} created'}

@app.put("/deletePlan")
async def delete_plan(request: Dict[Any, Any]):

    if 'planId' in request:
        planId = request['planId']
    else:
        raise ValueError("500, please pass json with 'plan'")
        return {'status': 500}
    collection = db['plans']
    collection.delete_one({'planId': planId}) 
    return {'status': 200, 'msg': f'plan {planId} deleted'}