import os
import sys
from logging.config import fileConfig

from sqlalchemy import pool, create_engine # Import create_engine directly

from alembic import context

# --- BEGIN Project Path Setup ---
# Add your project's root directory to the sys.path
# This is crucial for Python to find your 'app' and 'config' modules.
# Assumes alembic/env.py is one level down from the project root.
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
# --- END Project Path Setup ---

# --- BEGIN Environment Variable Loading ---
from dotenv import load_dotenv
load_dotenv()
# --- END Environment Variable Loading ---

# --- BEGIN Application Model Imports ---
# Import your Base object. Also import at least one model to ensure it's loaded
# and registered with Base.metadata.
from app.models import Base, UsersInDB
# Import DATABASE_URL from your config module
from config import DATABASE_URL
# --- END Application Model Imports ---

# --- DIAGNOSTIC FOR BASE AND METADATA ---
print(f"DEBUG: Type of Base imported in env.py: {type(Base)}")
print(f"DEBUG: Base itself: {Base}")
if hasattr(Base, 'metadata'):
    print(f"DEBUG: Base has metadata attribute.")
    print(f"DEBUG: Type of Base.metadata: {type(Base.metadata)}")
    # This line is key: it shows what tables SQLAlchemy has discovered
    print(f"DEBUG: Base.metadata tables: {Base.metadata.tables.keys()}")
else:
    print(f"ERROR: Base DOES NOT have a 'metadata' attribute. This is a critical problem.")
# --- END DIAGNOSTIC ---


# Get the Alembic Config object
config = context.config

# Set the SQLAlchemy URL in Alembic's config
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Please check your .env file and config.py.")
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Set the target metadata for autogenerate support
# This tells Alembic which SQLAlchemy models to inspect for migrations.
target_metadata = Base.metadata

# --- BEGIN Diagnostic Print ---
print(f"DEBUG: Alembic configured with URL: {config.get_main_option('sqlalchemy.url')}")
# --- END Diagnostic Print ---


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.
    Directly creates the engine using the DATABASE_URL.
    """
    url_for_engine = config.get_main_option("sqlalchemy.url")

    print(f"DEBUG: Attempting to create engine for online migration with URL: {url_for_engine}")

    connectable = create_engine(
        url_for_engine,
        poolclass=pool.NullPool
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()