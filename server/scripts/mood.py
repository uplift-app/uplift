import pandas as pd
import random
from datetime import datetime, timedelta
import os

# ! Script is ChatGPT generated

# Helper function to generate random dates within a range
def generate_dates(start_date, end_date):
    current_date = start_date
    while current_date <= end_date:
        yield current_date
        current_date += timedelta(days=1)

# Mood data settings
mood_types = ["happy", "relaxed", "energetic"]
mood_times = ["morning", "afternoon", "evening", "all day"]

# Generate data for User 1 (last three months)
end_date_user1 = datetime.today()
start_date_user1 = end_date_user1 - timedelta(days=90)
dates_user1 = list(generate_dates(start_date_user1, end_date_user1))

user1_data = [
    {
        "moodType": random.choice(mood_types),
        "userId": 1,
        "intensity": random.randint(0, 10),
        "moodTime": random.choice(mood_times),
        "date": date.strftime("%Y-%m-%d"),
    }
    for date in dates_user1
]

# Generate data for User 2 (last month)
end_date_user2 = datetime.today()
start_date_user2 = end_date_user2 - timedelta(days=30)
dates_user2 = list(generate_dates(start_date_user2, end_date_user2))

user2_data = [
    {
        "moodType": random.choice(mood_types),
        "userId": 2,
        "intensity": random.randint(0, 10),
        "moodTime": random.choice(mood_times),
        "date": date.strftime("%Y-%m-%d"),
    }
    for date in dates_user2
]

# Combine data and export
mood_data = user1_data + user2_data
df = pd.DataFrame(mood_data)

# Save to CSV
file_path = os.path.dirname(os.path.realpath(__file__)) + "/../mocks/mood_data.csv"
df.to_csv(file_path, index=False)
file_path
