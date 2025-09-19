from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()

router = APIRouter()

# Initialize OpenRouter client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")  # set this in .env
)


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Forwards message to OpenRouter (DeepSeek model).
    Returns ChatResponse JSON.
    Handles API errors gracefully.
    """
    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3.1:free",  # OpenRouter model name
            messages=[
                {"role": "user", "content": request.message}
            ]
        )

        reply = completion.choices[0].message.content
        return ChatResponse(reply=reply)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with OpenRouter: {str(e)}"
        )
