import os
import json
import time

from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

# Load environment variables and initialize client/tools globally
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GEMINI_API")
if not api_key:
    raise ValueError("GEMINI_API not found in environment variables.")

client = genai.Client(api_key=api_key)
google_search_tool = Tool(google_search=GoogleSearch())

def crawl_news(main_topic: str, keywords: list[str], model_id: str = "gemini-2.0-flash") -> str | None:
    """
    Generates news content using Google's Gemini model and extracts a hardcoded JSON block from the response.

    Args:
        main_topic (str): The main topic to generate news about.
        keywords (list[str]): List of keywords to guide the generation.
        model_id (str): ID of the Gemini model to use. Default is "gemini-2.0-flash".

    Returns:
        str | None: Extracted JSON content as a string, or None if not found or invalid.
    """
    # Load prompt template
    try:
        with open("src/prompt.txt", "r", encoding="utf-8") as file:
            template = file.read()
    except FileNotFoundError:
        print("The prompt template file 'src/prompt.txt' was not found.")
        return None

    keyword_str = ", ".join(f'"{k.strip()}"' for k in keywords)
    prompt = template.replace("{MAIN_TOPIC}", main_topic).replace("{KEYWORDS}", keyword_str)

    # Generate content
    try:
        response = client.models.generate_content(
            model=model_id,
            contents=prompt,
            config=GenerateContentConfig(
                tools=[google_search_tool],
                response_modalities=["TEXT"],
            )
        )
    except Exception as e:
        print("Error while generating content:", e)
        return None

    # Extract response
    try:
        full_response = "".join(part.text for part in response.candidates[0].content.parts)
        json_start = full_response.find("```json")
        if json_start == -1:
            print("No JSON block found in the response.")
            return None

        json_content = full_response[json_start + 7:].strip()
        if json_content.endswith("```"):
            json_content = json_content[:-3].strip()

        json.loads(json_content)  # Validate
        return json_content

    except Exception as e:
        print("Error extracting or parsing JSON:", e)
        return None


# Example usage
if __name__ == "__main__":
    main_topic = input("Enter The Main Topic: ").strip()
    keywords = [k.strip() for k in input("Enter Keywords (comma separated): ").split(",") if k.strip()]

    start = time.time()
    newsme_content = crawl_news(main_topic, keywords)
    end = time.time()

    print(f"\nTime taken: {end - start:.2f} seconds\n")
    if newsme_content:
        print(newsme_content)
    else:
        print("No valid content was generated.")