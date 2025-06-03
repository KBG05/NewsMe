# test_db_connection.py
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.exc import NoSuchModuleError, ArgumentError
from sqlalchemy.engine.url import make_url

# --- IMPORTANT: Import Base and at least one model here ---
from app.models import Base, UsersInDB

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("Error: DATABASE_URL not found in .env or environment variables.")
    print("Please ensure your .env file is in the same directory as this script,")
    print("and contains: DATABASE_URL=\"postgres+psycopg2://user:pass@host:port/dbname\"")
    exit(1)

print(f"Attempting to create engine with URL: {DATABASE_URL}")

# --- DIAGNOSTIC FOR BASE AND METADATA IN STANDALONE SCRIPT ---
print(f"TEST_DB_CONN: Type of Base imported: {type(Base)}")
print(f"TEST_DB_CONN: Base itself: {Base}")
if hasattr(Base, 'metadata'):
    print(f"TEST_DB_CONN: Base has metadata attribute.")
    print(f"TEST_DB_CONN: Type of Base.metadata: {type(Base.metadata)}")
    print(f"TEST_DB_CONN: Base.metadata tables: {Base.metadata.tables.keys()}") # Check for table names
else:
    print(f"TEST_DB_CONN: Base DOES NOT have a 'metadata' attribute. This is a critical problem.")
# --- END DIAGNOSTIC ---

try:
    parsed_url = make_url(DATABASE_URL)
    print(f"URL successfully parsed. Driver name: {parsed_url.drivername}")

    engine = create_engine(DATABASE_URL, pool_pre_ping=True)

    with engine.connect() as connection:
        print("Successfully created engine and established a connection!")
        result = connection.execute(connection.text("SELECT 1"))
        print(f"Dummy query result: {result.scalar()}")

except NoSuchModuleError as e:
    print(f"\nFATAL ERROR: SQLAlchemy failed to load dialect plugin: {e}")
    print("This error usually means the necessary database driver (e.g., psycopg2-binary)")
    print("is either not installed, or not accessible to Python in this environment,")
    print("despite `import psycopg2` working. This is very unusual.")
    print("Possible causes at this point: very deep environment/library linking issue,")
    print("or an obscure SQLAlchemy or psycopg2-binary installation problem.")
except ArgumentError as e:
    print(f"\nERROR: Argument Error when creating engine (URL format issue?): {e}")
except Exception as e:
    print(f"\nAn unexpected error occurred during connection test: {e}")

print("\nConnection test script finished.")