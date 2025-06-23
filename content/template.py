import os
from dotenv import load_dotenv
from google import genai


class NewsLetter:
    def __init__(self, model_id: str = "gemini-2.5-flash"):
        load_dotenv()
        self.api_key = os.getenv("GEMINI_API_template")
        self.model_id = model_id
        self.client = None
        self._initialize_client()

    def _initialize_client(self) -> None:
        self.client = genai.Client(api_key=self.api_key)

    def _load_prompt_template(self) -> str:
        with open("src/template_prompt.txt", "r", encoding="utf-8") as file:
            return file.read()

    def _get_newsletter(self, name: str, content: str) -> str:
        prompt = self._load_prompt_template()
        prompt = prompt.replace("{name}", name).replace("{content}", content)

        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt,
        )
        return response.text


if __name__ == "__main__":
    # Example Usage
    fetch = NewsLetter()
    result = fetch._get_newsletter(
        name="John Doe",
        content="This is the newsletter content about AI breakthroughs and new innovations."
    )
    print(result)
