//MoodFromBackend is exported for the dummydata.

import {
  ActivityFromBackend,
  ActivitySortedByDate,
  MoodFromBackend,
  MoodSortedByDate,
  MoodTypes,
} from "./interfaces";
const moodTypes: MoodTypes[] = ["happiness", "stress", "energy"];

// DISCLAIMER transformChartData was written with AI
export const transformMoodData = (
  moodDataFromBackend: MoodFromBackend[],
  timeFrame: string
): MoodSortedByDate[] => {
  const groupedData: Record<string, MoodSortedByDate> =
    moodDataFromBackend.reduce(
      //Reduce is used to add the entries to the accumulator
      (acc, { date, moodType, intensity }) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        // Only add an entry with a new date if it doesn't exist yet. This is flawed because users may enter several mood values for the same day.
        // we'll need to change this average it when that is the case.
        //  Surely no user will want to see their mood change over one day.
        if (!acc[formattedDate]) {
          acc[formattedDate] = { date: formattedDate };
        }
        // Add the mood type and intensity to the date
        acc[formattedDate][moodType] = intensity;
        return acc;
      },
      {} as Record<string, MoodSortedByDate>
    );

  let npoints = 0;
  switch (timeFrame) {
    case "Last week":
      npoints = -7;
      break;
    case "Last month":
      npoints = -30;
      break;
    case "Last 3 months":
      npoints = -90;
      break;
    case "Last 6 months":
      npoints = -180;
      break;
    default:
      npoints = 0;
  }

  return interpolateMoodData(Object.values(groupedData)).slice(npoints);
};

// FillSpace can most certainly be more efficient, but it works.
// Loop through each entry. Find any entries for which there isn't any mood data.
// For each entry: check that all the moodTypes have an associated value
// If yes, move on to next entry.
// If no, find the nearest point backwards and forwards.
// eg. Found happiness = 0 at n-2, happiness = 10 n+3.
// This would mean putting happiness = 2 at n-1, happiness = 4 at n, happiness = 6 at n + 1 and happiness = 8 at n + 2;

// Need to extrapolate the other entries from the transformedData.

export const fillSpace = (
  moodDataSortedByDate: MoodSortedByDate[],
  index: number,
  moodType: keyof MoodSortedByDate,
  baseValue: string | number | undefined
) => {
  // Type resolution
  if (typeof baseValue !== "number") {
    baseValue = 0;
  }

  // If we're at the start of the array, set the start mood value to zero.
  if (index === 0) {
    moodDataSortedByDate[0][moodType] = 0 as never;
    return;
  }
  // If we're at the end of the data, set it to the previous mood value.
  else if (index === moodDataSortedByDate.length - 1) {
    moodDataSortedByDate[index][moodType] = moodDataSortedByDate[index - 1][
      moodType
    ] as never;
  }

  let baseIndex = index + 1;
  // n counts the steps forwards we've taken
  let n = 1;
  // next value tracks when we've found a next value in the array for the mood we're concerned with
  let nextValue: number | undefined = undefined;

  while (baseIndex < moodDataSortedByDate.length) {
    if (moodDataSortedByDate[baseIndex][moodType] === undefined) {
      // If we don't find the values in the next entry, increase the step count and the index
      n++;
      baseIndex++;
    } else {
      // otherwise set the nextValue to the found value and exit while loop
      nextValue = moodDataSortedByDate[baseIndex][moodType] as number;
      break;
    }
  }
  // If we do find a value, add the missing data between the two found values
  if (nextValue !== undefined) {
    for (let j = 0; j < n; j++) {
      moodDataSortedByDate[index + j][moodType] = (baseValue -
        ((baseValue - nextValue) * (j + 1)) / (n + 1)) as never;
    }
  }
  // If we don't find a future value, spread value from behind
  else if (nextValue === undefined) {
    moodDataSortedByDate[index][moodType] = moodDataSortedByDate[index - 1][
      moodType
    ] as never;
  }
};

//Loop through each entry in the sortedData and interpolate the missing values with fillSpace.
export const interpolateMoodData = (
  moodDataSortedByDate: MoodSortedByDate[]
) => {
  for (let i = 0; i < moodDataSortedByDate.length; i++) {
    // loop through moodTypes for each entry in moodData to check there's a value there.
    for (let j = 0; j < moodTypes.length; j++) {
      //If mood is not found
      if (moodDataSortedByDate[i][moodTypes[j]] === undefined) {
        let baseValue: string | number | undefined = 0;

        //As long as it isn't the start of the array, set the baseValue to value in the previous entry
        if (i !== 0) {
          baseValue = moodDataSortedByDate[i - 1][moodTypes[j]];
        }
        // Call the function to fill the space
        fillSpace(moodDataSortedByDate, i, moodTypes[j], baseValue);
      }
    }
  }

  return moodDataSortedByDate;
};

export const transformActivityData = (
  activityDataFromBackend: ActivityFromBackend[],
  timeFrame: string,
  activityTypes: string[]
): any => {
  const groupedData: Record<string, ActivitySortedByDate> =
    activityDataFromBackend.reduce(
      //Reduce is used to add the entries to the accumulator
      (acc, { date, activityType, duration }) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        // Only add an entry with a new date if it doesn't exist yet. This is flawed because users may enter several mood values for the same day.
        // we'll need to change this average it when that is the case.
        //  Surely no user will want to see their mood change over one day.
        if (!acc[formattedDate]) {
          acc[formattedDate] = { date: formattedDate };
        }
        // Add the mood type and intensity to the date
        acc[formattedDate][activityType] = duration;
        return acc;
      },
      {} as Record<string, ActivitySortedByDate>
    );

  let npoints = 0;
  switch (timeFrame) {
    case "Last week":
      npoints = -7;
      break;
    case "Last month":
      npoints = -30;
      break;
    case "Last 3 months":
      npoints = -90;
      break;
    case "Last 6 months":
      npoints = -180;
      break;
    default:
      npoints = 0;
  }
  // return groupedData;
  return interpolateActivityData(
    Object.values(groupedData),
    activityTypes
  ).slice(npoints);
};

export const interpolateActivityData = (
  activityDataSortedByDate: ActivitySortedByDate[],
  activityTypes: string[]
) => {
  for (let i = 0; i < activityDataSortedByDate.length; i++) {
    // loop through moodTypes for each entry in moodData to check there's a value there.
    for (let j = 0; j < activityTypes.length; j++) {
      //If mood is not found
      if (activityDataSortedByDate[i][activityTypes[j]] === undefined) {
        let baseValue: string | number | undefined = 0;

        //As long as it isn't the start of the array, set the baseValue to value in the previous entry
        if (i !== 0) {
          baseValue = activityDataSortedByDate[i - 1][activityTypes[j]];
        }
        // Call the function to fill the space
        fillActivitySpace(
          activityDataSortedByDate,
          i,
          activityTypes[j],
          baseValue
        );
      }
    }
  }

  return activityDataSortedByDate;
};

export const fillActivitySpace = (
  activityDataSortedByDate: ActivitySortedByDate[],
  index: number,
  activityType: keyof ActivitySortedByDate,
  baseValue: string | number | undefined
) => {
  // Type resolution
  if (typeof baseValue !== "number") {
    baseValue = 0;
  }

  // If we're at the start of the array, set the start mood value to zero.
  if (index === 0) {
    activityDataSortedByDate[0][activityType] = 0 as never;
    return;
  }
  // If we're at the end of the data, set it to the previous mood value.
  else if (index === activityDataSortedByDate.length - 1) {
    activityDataSortedByDate[index][activityType] = activityDataSortedByDate[
      index - 1
    ][activityType] as never;
  }

  let baseIndex = index + 1;
  // n counts the steps forwards we've taken
  let n = 1;
  // next value tracks when we've found a next value in the array for the mood we're concerned with
  let nextValue: number | undefined = undefined;

  while (baseIndex < activityDataSortedByDate.length) {
    if (activityDataSortedByDate[baseIndex][activityType] === undefined) {
      // If we don't find the values in the next entry, increase the step count and the index
      n++;
      baseIndex++;
    } else {
      // otherwise set the nextValue to the found value and exit while loop
      nextValue = activityDataSortedByDate[baseIndex][activityType] as number;
      break;
    }
  }
  // If we do find a value, add the missing data between the two found values
  if (nextValue !== undefined) {
    for (let j = 0; j < n; j++) {
      activityDataSortedByDate[index + j][activityType] = (baseValue -
        ((baseValue - nextValue) * (j + 1)) / (n + 1)) as never;
    }
  }
  // If we don't find a future value, spread value from behind
  else if (nextValue === undefined) {
    activityDataSortedByDate[index][activityType] = activityDataSortedByDate[
      index - 1
    ][activityType] as never;
  }
};
