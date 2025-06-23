from dotenv import load_dotenv
load_dotenv()

import os
import ast
from supabase import create_client, Client

def filter_user_info(data):
    """
    Extracts cleaned user info from Supabase response data, fixing malformed keyword list.

    Args:
        data (list[dict]): List of user data from Supabase.

    Returns:
        list[tuple]: List of tuples with (id, email, name, topic_of_interest, keywords_list).
    """

    result = []
    for user in data:
        raw_keywords = user.get("keywords", [])
        keywords_list = []

        if isinstance(raw_keywords, list):
            keywords_list_temp = [kw.strip("[]") for kw in raw_keywords]
            keywords_list = keywords_list_temp[0].split(" ")

        result.append((
            user.get("id"),
            user.get("email"),
            user.get("name"),
            user.get("topic_of_interest"),
            keywords_list
        ))
    
    return result

def fetch_users():
    """
    Connects to Supabase, fetches user data from the 'users' table,
    and returns the extracted user information.
    """

    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(url, key)

    response = supabase.table("users").select("*").execute()
    return filter_user_info(response.data)

#Example Usage:
if __name__ == "__main__":
    user_info = fetch_users()
    for user in user_info:
        print(f"ID: {user[0]}, Email: {user[1]}, Name: {user[2]}, Topic of Interest: {user[3]}, Keywords: {user[4]}")