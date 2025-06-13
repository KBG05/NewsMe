import json 

import os
from dotenv import load_dotenv

from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

def crawl_news(main_topic: str, keywords: list[str], model_id: str = "gemini-2.0-flash") -> str:
    load_dotenv()
    api_key = os.getenv("GEMINI_API")
    if not api_key:
        raise ValueError("GEMINI_API not found in environment variables.")

    client = genai.Client(api_key=api_key)
    google_search_tool = Tool(google_search=GoogleSearch())

    try:
        with open("src/prompt.txt", "r", encoding="utf-8") as file:
            template = file.read()
    except FileNotFoundError:
        raise FileNotFoundError("'src/prompt.txt' file not found'")

    keyword_str = ", ".join(f'"{k.strip()}"' for k in keywords)
    prompt = template.replace("{MAIN_TOPIC}", main_topic).replace("{KEYWORDS}", keyword_str)

    response = client.models.generate_content(
        model=model_id,
        contents=prompt,
        config=GenerateContentConfig(
            tools=[google_search_tool],
            response_modalities=["TEXT"],
        )
    )

    raw_output = ""
    for each in response.candidates[0].content.parts:
        raw_output += each.text
    
    return raw_output[9:-3]

if __name__ == "__main__":
    main_topic = input("Enter The Main Topic: ").strip()
    keywords = [k.strip() for k in input("Enter Keywords (comma separated): ").split(",") if k.strip()]
    
    newsme_content = crawl_news(main_topic, keywords)
    
    print(newsme_content)