import {
  ActivityFromBackend,
  ActivitySortedByDate,
  MoodFromBackend,
  MoodSortedByDate,
  MoodTypes,
} from "./interfaces";
const moodTypes: MoodTypes[] = ["happiness", "stress", "energy"];

export const transformMoodData = (
  moodDataFromBackend: MoodFromBackend[],
  timeFrame: string
): MoodSortedByDate[] => {
  const groupedData: Record<string, MoodSortedByDate> =
    moodDataFromBackend.reduce((acc, { date, moodType, intensity }) => {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      if (!acc[formattedDate]) {
        acc[formattedDate] = { date: formattedDate };
      }
      (acc[formattedDate][moodType as keyof MoodSortedByDate] as number) =
        intensity;
      return acc;
    }, {} as Record<string, MoodSortedByDate>);

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

export const fillSpace = (
  moodDataSortedByDate: MoodSortedByDate[],
  index: number,
  moodType: keyof MoodSortedByDate,
  baseValue: string | number | undefined
) => {
  if (typeof baseValue !== "number") {
    baseValue = 0;
  }

  if (index === 0) {
    moodDataSortedByDate[0][moodType] = 0 as never;
    return;
  } else if (index === moodDataSortedByDate.length - 1) {
    moodDataSortedByDate[index][moodType] = moodDataSortedByDate[index - 1][
      moodType
    ] as never;
  }

  let baseIndex = index + 1;
  let n = 1;
  let nextValue: number | undefined = undefined;

  while (baseIndex < moodDataSortedByDate.length) {
    if (moodDataSortedByDate[baseIndex][moodType] === undefined) {
      n++;
      baseIndex++;
    } else {
      nextValue = moodDataSortedByDate[baseIndex][moodType] as number;
      break;
    }
  }
  if (nextValue !== undefined) {
    for (let j = 0; j < n; j++) {
      moodDataSortedByDate[index + j][moodType] = (baseValue -
        ((baseValue - nextValue) * (j + 1)) / (n + 1)) as never;
    }
  } else if (nextValue === undefined) {
    moodDataSortedByDate[index][moodType] = moodDataSortedByDate[index - 1][
      moodType
    ] as never;
  }
};

export const interpolateMoodData = (
  moodDataSortedByDate: MoodSortedByDate[]
) => {
  for (let i = 0; i < moodDataSortedByDate.length; i++) {
    for (let j = 0; j < moodTypes.length; j++) {
      const moodType = moodTypes[j] as keyof MoodSortedByDate;

      if (moodDataSortedByDate[i][moodType] === undefined) {
        let baseValue: string | number | undefined = 0;

        if (i !== 0) {
          baseValue = moodDataSortedByDate[i - 1][moodType];
        }

        fillSpace(moodDataSortedByDate, i, moodType, baseValue);
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
    activityDataFromBackend.reduce((acc, { date, activityType, duration }) => {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      if (!acc[formattedDate]) {
        acc[formattedDate] = { date: formattedDate };
      }
      acc[formattedDate][activityType] = duration;
      return acc;
    }, {} as Record<string, ActivitySortedByDate>);

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
    for (let j = 0; j < activityTypes.length; j++) {
      if (activityDataSortedByDate[i][activityTypes[j]] === undefined) {
        let baseValue: string | number | undefined = 0;

        if (i !== 0) {
          baseValue = activityDataSortedByDate[i - 1][activityTypes[j]];
        }

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
  if (typeof baseValue !== "number") {
    baseValue = 0;
  }

  if (index === 0) {
    activityDataSortedByDate[0][activityType] = 0 as never;
    return;
  } else if (index === activityDataSortedByDate.length - 1) {
    activityDataSortedByDate[index][activityType] = activityDataSortedByDate[
      index - 1
    ][activityType] as never;
  }

  let baseIndex = index + 1;
  let n = 1;
  let nextValue: number | undefined = undefined;

  while (baseIndex < activityDataSortedByDate.length) {
    if (activityDataSortedByDate[baseIndex][activityType] === undefined) {
      n++;
      baseIndex++;
    } else {
      nextValue = activityDataSortedByDate[baseIndex][activityType] as number;
      break;
    }
  }
  if (nextValue !== undefined) {
    for (let j = 0; j < n; j++) {
      activityDataSortedByDate[index + j][activityType] = (baseValue -
        ((baseValue - nextValue) * (j + 1)) / (n + 1)) as never;
    }
  } else if (nextValue === undefined) {
    activityDataSortedByDate[index][activityType] = activityDataSortedByDate[
      index - 1
    ][activityType] as never;
  }
};
