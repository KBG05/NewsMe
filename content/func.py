from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

def generate_news_digest(api_key: str, main_topic: str, keywords: list[str], model_id: str = "gemini-2.0-flash") -> dict:
    client = genai.Client(api_key=api_key)
    google_search_tool = Tool(google_search=GoogleSearch())

    with open("src/prompt.txt", "r", encoding="utf-8") as file:
        prompt_template = file.read()

    keyword_str = ", ".join(f'"{kw}"' for kw in keywords)
    prompt = prompt_template.replace("{MAIN_TOPIC}", main_topic).replace("{KEYWORDS}", keyword_str)

    response = client.models.generate_content(
        model=model_id,
        contents=prompt,
        config=GenerateContentConfig(
            tools=[google_search_tool],
            response_modalities=["TEXT"],
        )
    )

    raw_output = response.candidates[0].content.parts[0].text
    return {"raw_output": raw_output}