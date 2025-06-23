import os
import resend

from dotenv import load_dotenv
load_dotenv()


def send_news_email(receiver_email: str, content: str) -> str | None:
    """
    Sends an HTML email to the specified receiver using the Resend API.

    Args:
        receiver_email (str): Recipient's email address.
        content (str): HTML content to send.

    Returns:
        str | None: Email ID if sent successfully, None otherwise.
    """
    resend.api_key = os.getenv("RESEND_API")
    
    try:
        params: resend.Emails.SendParams = {
            "from": "NewsMe.Weekly <noreply@newsmeai.xyz>",
            "to": [receiver_email],
            "subject": "Your Weekly News Digest",
            "html": content,
        }

        response = resend.Emails.send(params)

        if "id" in response:
            return response["id"]
        else:
            print("Failed to send email. Response:", response)
            return None

    except Exception as e:
        print("Error while sending email:", str(e))
        return None
    
#Example Usage: 
if __name__ == "__main__":
    email_id = send_news_email("kushalb2005@gmail.com", "<strong>Hello!</strong>")
    if email_id:
        print("Email sent with ID:", email_id)
    else:
        print("Email failed to send.")