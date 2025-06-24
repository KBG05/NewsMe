import os
from dotenv import load_dotenv

from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

class NewsCrawler:
    def __init__(self, model_id: str = "gemini-2.0-flash"):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_scrape")
        self.api_key = api_key
        self.model_id = model_id

        self.client = None
        self.google_search_tool = None

        self._initialize_client()

    def _initialize_client(self):
        self.client = genai.Client(api_key=self.api_key)
        self.google_search_tool = Tool(google_search=GoogleSearch())

    def _load_prompt_template(self) -> str:
        with open("src/news_prompt.txt", "r", encoding="utf-8") as file:
            return file.read()

    def crawl_news(self, main_topic: str, keywords: list[str]) -> dict:
        template = self._load_prompt_template()
        keyword_str = ", ".join(f'"{k}"' for k in keywords)

        prompt = template.replace("{MAIN_TOPIC}", main_topic).replace("{KEYWORDS}", keyword_str)

        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt,
            config=GenerateContentConfig(
                tools=[self.google_search_tool],
                response_modalities=["TEXT"],
            )
        )
        raw_output = ""
        for each in response.candidates[0].content.parts:
            raw_output += each.text
        
        start_index = raw_output.find('json')
        if start_index != -1:
            json_output = raw_output[start_index + 4 : -3]

        return json_output

    def placeholder_function(self): 
        pass

if __name__ == "__main__":
    main_topic = str(input("Enter The Main Topic: "))
    keywords = input("Enter Keywords (comma separated): ").split(',')

    newsme = NewsCrawler()
    newsme_content = newsme.crawl_news(main_topic, keywords)

    print(newsme_content)