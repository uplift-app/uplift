
//MoodFromBackend is exported for the dummydata. 
export type MoodFromBackend = {
    _id: string;
    moodType: "happiness" | "stress" | "energy"; // Add other mood types if needed
    intensity: number;
    userId: string;
    moodTime: string;
    date: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  };

  type MoodSortedByDate = {
    date: string;
    happiness?: number;
    stress?: number;
    energy?: number;
  };

  const moodTypes: (keyof MoodSortedByDate)[] = [
    "energy",
    "happiness",
    "stress",
  ];

  // DISCLAIMER transformChartData was written with AI
export const transformChartData = (moodDataFromBackend: MoodFromBackend[]): MoodSortedByDate[] => {
    const groupedData: Record<string, MoodSortedByDate> = moodDataFromBackend.reduce(
      //Reduce is used to add the entries to the accumulator
      (acc, { date, moodType, intensity }) => {
        // Only add an entry with a new date if it doesn't exist yet. This is flawed because users may enter several mood values for the same day. 
        // we'll need to change this average it when that is the case.
        //  Surely no user will want to see their mood change over one day.
        if (!acc[date]) {
          acc[date] = { date };
        }
        // Add the mood type and intensity to the date
        acc[date][moodType] = intensity;
        return acc;
      },
      {} as Record<string, MoodSortedByDate>
    );

    return interpolateMoodData(Object.values(groupedData));
  };

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
  export const interpolateMoodData = (moodDataSortedByDate:MoodSortedByDate[]) => {
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
  }