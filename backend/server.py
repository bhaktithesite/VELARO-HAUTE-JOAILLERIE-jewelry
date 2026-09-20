import os
from pathlib import Path
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, ConfigDict, Field
from pymongo import UpdateOne
from catalog import CATALOG

load_dotenv(Path(__file__).parent / '.env')
client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

@asynccontextmanager
async def lifespan(app):
    await db.products.create_index('id', unique=True)
    await db.subscribers.create_index('email', unique=True)
    await db.products.bulk_write([UpdateOne({'id': p['id']}, {'$set': {**p, 'position': i}}, upsert=True) for i, p in enumerate(CATALOG)])
    yield
    client.close()

app = FastAPI(title='VELARO Atelier', lifespan=lifespan)
api = APIRouter(prefix='/api')

class Product(BaseModel):
    model_config = ConfigDict(extra='ignore')
    id: str
    name: str
    category: str
    subCategory: str
    price: int
    originalPrice: int
    rating: float
    reviewCount: int
    image: str
    description: str
    specs: str
    metals: List[str]
    sizes: List[str]
    isBestSeller: bool
    isFeatured: bool
    gender: str
    edition: str
    stock: int

class Subscription(BaseModel):
    email: EmailStr = Field(max_length=254)
    consent: bool

class SubscriptionResult(BaseModel):
    message: str

@api.get('/')
async def root():
    return {'message': 'VELARO Haute Joaillerie', 'status': 'ready'}

@api.get('/products', response_model=List[Product])
async def products():
    return await db.products.find({}, {'_id': 0}).sort('position', 1).to_list(100)

@api.get('/products/{sku}', response_model=Product)
async def product(sku: str):
    result = await db.products.find_one({'id': sku}, {'_id': 0})
    if not result:
        raise HTTPException(404, 'This creation could not be found.')
    return result

@api.post('/newsletter', response_model=SubscriptionResult)
async def subscribe(payload: Subscription):
    if not payload.consent:
        raise HTTPException(400, 'Please agree to receive private collection news.')
    await db.subscribers.update_one({'email': str(payload.email).lower()}, {'$setOnInsert': {'email': str(payload.email).lower(), 'created_at': datetime.now(timezone.utc).isoformat(), 'consent': True, 'source': 'collectors-circle'}}, upsert=True)
    return SubscriptionResult(message="You’re on the list. Welcome to the VELARO Collector’s Circle.")

app.include_router(api)
app.add_middleware(CORSMiddleware, allow_origins=os.environ['CORS_ORIGINS'].split(','), allow_credentials=False, allow_methods=['GET', 'POST'], allow_headers=['Content-Type'])