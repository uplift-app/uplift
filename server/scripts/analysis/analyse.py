import pandas as pd
import pprint
import os

file_path = os.path.dirname(os.path.realpath(__file__)) + "/../../mocks/mood.json"
moods = pd.read_json(file_path)

file_path2 = os.path.dirname(os.path.realpath(__file__)) + "/../../mocks/activity.json"
activities = pd.read_json(file_path2)

res = dict()

#! 1. Descriptive Statistics
avg_mood_intensities = moods.groupby('moodType')['intensity'].mean().reset_index()
avg_moodtime_intensities = moods.groupby('moodTime')['intensity'].mean().reset_index()
dev_mood_intensities = moods.groupby('moodType')['intensity'].std().reset_index()

avg_mood_arr = []
for index, row in avg_mood_intensities.iterrows():
  avg_mood_arr.append({row["moodType"]: row["intensity"]})

avg_moodtime_arr = []
for index, row in avg_moodtime_intensities.iterrows():
  avg_moodtime_arr.append({row["moodTime"]: row["intensity"]})

res["avgMood"] = avg_mood_arr
res["avgMoodtime"] = avg_moodtime_arr

#! 3. Grouping and Aggregation
merged = pd.merge(moods, activities, left_on=["moodTime", "date"], right_on=["activityTime", "date"])

# print("--- average intensity of mood for activities ---")
avg_activity_intensity = merged.groupby('activityType')['intensity'].mean().reset_index().sort_values(by=['intensity'], ascending=False)
avg_act_int_arr = []
for index, row in avg_activity_intensity.iterrows():
  avg_act_int_arr.append({row["activityType"]: row["intensity"]})
res["avgActivityIntensity"] = avg_act_int_arr

# print("--- average duration of activities ---")
avg_activity_duration = merged.groupby('activityType')['duration'].mean().reset_index().sort_values(by=['duration'], ascending=False)
avg_act_dur_arr = []
for index, row in avg_activity_duration.iterrows():
  avg_act_dur_arr.append({row["activityType"]: row["duration"]})
res["avgActivityDuration"] = avg_act_dur_arr

# print("--- average intensity of mood for activity times ---")
avg_mood_activitytime = merged.groupby('activityTime')['intensity'].mean().reset_index().sort_values(by=['intensity'], ascending=False)
avg_mood_acttime_arr = []
for index, row in avg_mood_activitytime.iterrows():
  avg_mood_acttime_arr.append({row["activityTime"]: row["intensity"]})
res["avgMoodActivitytime"] = avg_mood_acttime_arr


positive_effects = merged.loc[(merged["intensity"] > 5), ["intensity", "moodType", "moodTime", "activityType"]].groupby(['moodType', 'moodTime']).agg({
    'activityType': list,
    'intensity': 'mean'
  }).reset_index()
positive_effects.rename(columns={'activityType': 'activities', 'intensity': 'avg_intensity'}, inplace=True)
positive_effects_arr = []
for index, row in positive_effects.iterrows():
  positive_effects_arr.append({
    "moodType": row["moodType"],
    "moodTime": row["moodTime"],
    "activities": row["activities"],
    "avg_intensity": row["avg_intensity"]})
res["positiveEffects"] = positive_effects_arr


#! 5. Habit Mood Mapping
# Example: Mood before and after an activity -> does this really yield valuable info?
# habitMood = merged.copy()
# print(habitMood.head(10))
# habitMood['mood_change'] = habitMood['intensity'].diff()
# positive_habits = habitMood[habitMood['mood_change'] > 0]
# print(positive_habits[['activityType', 'mood_change']])

#! 6. Frequency Analysis
# Count activity occurrences
counted_activities = activities['activityType'].value_counts().reset_index()
activity_counts = []
for index, row in counted_activities.iterrows():
  activity_counts.append({row["activityType"]: row["count"]})

# Count mood types
counted_moods = moods['moodType'].value_counts().reset_index()
mood_counts = []
for index, row in counted_moods.iterrows():
  mood_counts.append({row["moodType"]: row["count"]})

res["activityCounts"] = activity_counts
res["moodCounts"] = mood_counts

#! 8. User-Specific Insights -> this looks for good mood activities which are performed the most by the user (low mood activities respectively)
# Top activities for good mood
top_activities = merged[merged['intensity'] > 5]['activityType'].value_counts().head(3).reset_index()
top_act_arr = []
for index, row in top_activities.iterrows():
  top_act_arr.append({row["activityType"]: row["count"]})
res["topActivities"] = top_act_arr

# detect red flags: which activities can be linked to bad mood
low_mood_activities = merged[merged['intensity'] < 4]['activityType'].value_counts().head(3).reset_index()
low_act_arr = []
for index, row in low_mood_activities.iterrows():
  low_act_arr.append({row["activityType"]: row["count"]})
res["lowMoodActivities"] = low_act_arr


#! 9. Outlier Detection
# outliers = moods[moods['intensity'] > moods['intensity'].mean() + 2 * moods['intensity'].std()]
# print(outliers)

#! 11. Cluster Analysis -> this looks for very high impact activites (without frequency)
# High vs Low Impact Activities
merge_copy = merged.copy()
merge_copy['impact'] = merge_copy['intensity'].apply(lambda x: 'High' if x > 7 else 'Low')
high_impact = merge_copy.loc[(merge_copy["impact"] == "High"), ["impact", "activityType"]].groupby("impact")["activityType"].apply(set).apply(list).reset_index()

res["highImpactActivites"] = high_impact.at[0, "activityType"]

pprint.pp(res)
