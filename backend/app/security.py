from supabase import create_client, Client
from config import  SUPABASE_KEY, SUPABASE_URL

async def get_supabase_client()->Client:
    return create_client(
            supabase_key=SUPABASE_KEY,
            supabase_url=SUPABASE_URL
        )

        
