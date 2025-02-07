import pandas as pd
import random
from datetime import datetime, timedelta
import os

# ! Script is ChatGPT generated

# Function to generate random data for a user
def generate_activity_data(user_id, start_date, end_date, num_records):
    activity_types = [
        "reading", "gaming", "shopping", "cleaning", "friends",
        "cooking", "meditation", "party", "smoking", "overtime",
        "fast food", "screen time", "exercise"
    ]

    activity_times = ["morning", "afternoon", "evening", "night", "all day"]
    data = []

    for _ in range(num_records):
        date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
        data.append({
            "duration": random.randint(10, 180),  
            "activityType": random.choice(activity_types),
            "userId": user_id,
            "activityTime": random.choice(activity_times),
            "isHabit": random.choice([True, False]),
            "date": date.strftime("%Y-%m-%d") 
        })

    return data

# Generate data for user 1 for the last 3 months
end_date = datetime.now()
start_date_user_1 = end_date - timedelta(days=90)  # Last 3 months
user_1_data = generate_activity_data(1, start_date_user_1, end_date, 210)

# Generate data for user 2 for the last month
start_date_user_2 = end_date - timedelta(days=30)  # Last month
user_2_data = generate_activity_data(2, start_date_user_2, end_date, 70)

# Combine the data
activity_data = user_1_data + user_2_data

# Create a DataFrame and display it
df = pd.DataFrame(activity_data)
df.head(), df.shape

# Export the data to a CSV file
file_path = os.path.dirname(os.path.realpath(__file__)) + "/../mocks/activity_data.csv"
df.to_csv(file_path, index=False)
