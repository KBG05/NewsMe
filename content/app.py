import os
import logging
from typing import List, Tuple
from dotenv import load_dotenv

# Import all necessary modules
from database import fetch_users
from scrape import NewsCrawler
from template import NewsLetter
from mail import send_news_email

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class NewsletterPipeline:
    """Main class to orchestrate the entire newsletter pipeline."""
    
    def __init__(self):
        """Initialize the pipeline with all necessary components."""
        load_dotenv()
        self.news_crawler = NewsCrawler()
        self.newsletter_formatter = NewsLetter()
        
    def process_single_user(self, user_data: Tuple) -> bool:
        """
        Process newsletter for a single user.
        
        Args:
            user_data (Tuple): User data in format (id, email, name, topic_of_interest, keywords_list)
            
        Returns:
            bool: True if newsletter was sent successfully, False otherwise
        """
        user_id, email, name, topic_of_interest, keywords = user_data
        
        try:
            logger.info(f"Processing user: {name} ({email})")
            
            # Step 1: Scrape news based on user's interests
            logger.info(f"Scraping news for topic: {topic_of_interest} with keywords: {keywords}")
            news_content = self.news_crawler.crawl_news(topic_of_interest, keywords)
            
            if not news_content:
                logger.warning(f"No news content found for user {name}")
                return False
            
            # Step 2: Format the content into newsletter template
            logger.info(f"Formatting newsletter for {name}")
            formatted_newsletter = self.newsletter_formatter._get_newsletter(name, news_content)
            
            if not formatted_newsletter:
                logger.warning(f"Failed to format newsletter for user {name}")
                return False
            
            # Step 3: Send the email
            logger.info(f"Sending newsletter to {email}")
            email_id = send_news_email(email, formatted_newsletter)
            
            if email_id:
                logger.info(f"Newsletter sent successfully to {name} with email ID: {email_id}")
                return True
            else:
                logger.error(f"Failed to send newsletter to {name}")
                return False
                
        except Exception as e:
            logger.error(f"Error processing user {name}: {str(e)}")
            return False
    
    def run_pipeline(self) -> dict:
        """
        Run the complete newsletter pipeline for all users.
        
        Returns:
            dict: Summary of the pipeline execution
        """
        logger.info("Starting newsletter pipeline...")
        
        try:
            # Step 1: Fetch all users from database
            logger.info("Fetching users from database...")
            users = fetch_users()
            
            if not users:
                logger.warning("No users found in database")
                return {
                    "status": "completed",
                    "total_users": 0,
                    "successful": 0,
                    "failed": 0,
                    "errors": ["No users found in database"]
                }
            
            logger.info(f"Found {len(users)} users to process")
            
            # Step 2: Process each user
            successful_sends = 0
            failed_sends = 0
            errors = []
            
            for user in users:
                user_id, email, name, topic_of_interest, keywords = user
                
                # Validate user data
                if not email or not name or not topic_of_interest:
                    logger.warning(f"Skipping user {name} due to missing required data")
                    failed_sends += 1
                    errors.append(f"Missing required data for user {name}")
                    continue
                
                # Process the user
                if self.process_single_user(user):
                    successful_sends += 1
                else:
                    failed_sends += 1
                    errors.append(f"Failed to process user {name}")
            
            # Summary
            summary = {
                "status": "completed",
                "total_users": len(users),
                "successful": successful_sends,
                "failed": failed_sends,
                "errors": errors
            }
            
            logger.info(f"Pipeline completed. Successful: {successful_sends}, Failed: {failed_sends}")
            return summary
            
        except Exception as e:
            logger.error(f"Pipeline failed with error: {str(e)}")
            return {
                "status": "failed",
                "error": str(e),
                "total_users": 0,
                "successful": 0,
                "failed": 0,
                "errors": [str(e)]
            }
    
    def run_for_specific_user(self, user_email: str) -> bool:
        """
        Run the pipeline for a specific user by email.
        
        Args:
            user_email (str): Email of the user to process
            
        Returns:
            bool: True if successful, False otherwise
        """
        logger.info(f"Running pipeline for specific user: {user_email}")
        
        try:
            # Fetch all users and find the specific one
            users = fetch_users()
            target_user = None
            
            for user in users:
                if user[1] == user_email:  # user[1] is email
                    target_user = user
                    break
            
            if not target_user:
                logger.error(f"User with email {user_email} not found")
                return False
            
            return self.process_single_user(target_user)
            
        except Exception as e:
            logger.error(f"Error processing specific user {user_email}: {str(e)}")
            return False

def main():
    """Main function to run the newsletter pipeline."""
    pipeline = NewsletterPipeline()
    
    # You can choose to run for all users or a specific user
    print("Newsletter Pipeline Options:")
    print("1. Run for all users")
    print("2. Run for specific user")
    print("3. Exit")
    
    choice = input("Enter your choice (1-3): ").strip()
    
    if choice == "1":
        print("\nRunning pipeline for all users...")
        summary = pipeline.run_pipeline()
        
        print(f"\n=== Pipeline Summary ===")
        print(f"Status: {summary['status']}")
        print(f"Total Users: {summary['total_users']}")
        print(f"Successful: {summary['successful']}")
        print(f"Failed: {summary['failed']}")
        
        if summary['errors']:
            print(f"\nErrors:")
            for error in summary['errors']:
                print(f"  - {error}")
    
    elif choice == "2":
        user_email = input("Enter user email: ").strip()
        if user_email:
            print(f"\nRunning pipeline for {user_email}...")
            success = pipeline.run_for_specific_user(user_email)
            
            if success:
                print("✅ Newsletter sent successfully!")
            else:
                print("❌ Failed to send newsletter.")
        else:
            print("Invalid email address.")
    
    elif choice == "3":
        print("Exiting...")
    
    else:
        print("Invalid choice. Exiting...")

if __name__ == "__main__":
    main()