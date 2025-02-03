import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { getActivityTypes } from "@/lib/ApiService";
import { useAuth } from "@clerk/clerk-react";
import ChartTypeSelector from "./ChartTypeSelector";
import { cn } from "@/lib/utils";
import { ChartTypes, CustomChart } from "@/lib/interfaces";
interface AddToChartProps {
  setCustomCharts: Dispatch<SetStateAction<CustomChart[]>>;
}
const AddToChart = ({ setCustomCharts }: AddToChartProps) => {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [chosenChart, setChosenChart] = useState<ChartTypes>("Area");
  useEffect(() => {
    fetchActivityTypes();
  }, []);

  const fetchActivityTypes = async () => {
    try {
      const token = await getToken();
      if (token) {
        const data = await getActivityTypes(token);
        setActivityTypes(data);
      }
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleCustomChartAdd = () => {
    setCustomCharts((prev) => [
      ...prev,
      {
        type: chosenChart,
        data: selectedActivities,
      },
    ]);
    setSelectedActivities([]);
    setChosenChart("Area");
    setOpen(false);
  };
  return (
    <div>
      <Button className="mx-auto h-[100%] w-full" onClick={() => setOpen(true)}>
        Add a chart <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="p-4 ">
          Select a type of chart
          <ChartTypeSelector
            chosenChart={chosenChart}
            setChosenChart={setChosenChart}
          />
        </DialogTitle>

        <DialogTitle className="p-4 gap-4 flex items-center ">
          Select activities{" "}
          <div className="font-thin italic flex gap-2">
            {selectedActivities.map((activity, idx) => (
              <p>
                {activity}
                {idx < selectedActivities.length - 1 && ","}
              </p>
            ))}
          </div>
          {selectedActivities.length > 0 && (
            <Button className="ml-auto" onClick={handleCustomChartAdd}>
              Add <Plus />
            </Button>
          )}
        </DialogTitle>

        <CommandInput placeholder="Search for an activity..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Activities">
            {activityTypes.map((activity) => (
              <CommandItem
                key={activity}
                onSelect={() => toggleActivity(activity)}
                className={cn(
                  selectedActivities.includes(activity) && "bg-hover"
                )}
              >
                <span>{activity[0].toUpperCase() + activity.slice(1)}</span>
                {selectedActivities.includes(activity) && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default AddToChart;
