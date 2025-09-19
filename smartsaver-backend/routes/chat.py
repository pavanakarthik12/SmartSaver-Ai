# chat.py
from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Sends user message to OpenRouter DeepSeek model.
    Returns AI-generated reply.
    Requires OPENROUTER_API_KEY in .env
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not api_key or api_key == "":
        raise HTTPException(
            status_code=500,
            detail="OpenRouter API key not configured. Set OPENROUTER_API_KEY in .env"
        )

    try:
        # Initialize OpenRouter client
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key
        )

        # Send chat completion request
        completion = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3.1:free",
            messages=[{"role": "user", "content": request.message}],
        )

        # Extract AI reply
        reply = completion.choices[0].message.content

        return ChatResponse(reply=reply)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with OpenRouter: {str(e)}"
        )
