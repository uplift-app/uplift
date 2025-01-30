import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { DialogTitle } from "./ui/dialog";
import { getActivityTypes } from "@/lib/ApiService";
import { Card } from "./ui/card";
import ChartTypeSelector from "./ChartTypeSelector";
const AddToChart = () => {
  const [open, setOpen] = useState(false);
  const moods = ["Energetic", "Happy", "Relaxed"];
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  useEffect(() => {
    fetchActivityTypes();
  }, []);

  const fetchActivityTypes = async () => {
    try {
      console.log("inside fetchActivityTypes");
      const data = await getActivityTypes();
      console.log(data);
      setActivityTypes(data);
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };
  return (
    <>
      <Button className="justify-center h-[100%]" onClick={() => setOpen(true)}>
        Add a chart
        <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="p-4">
          Select a mood or an activity to add
        </DialogTitle>
        <ChartTypeSelector />

        <CommandInput placeholder="Search for something to add..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Moods">
            {moods.map((mood) => (
              <CommandItem key={mood}>
                <span>{mood}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Activities">
            {activityTypes.map((activity) => (
              <CommandItem key={activity}>
                <span>{activity}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default AddToChart;
