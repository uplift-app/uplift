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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { getActivityTypes } from "@/lib/ApiService";
import { useAuth } from "@clerk/clerk-react";
import ChartTypeSelector from "./ChartTypeSelector";
const AddToChart = () => {
  const [open, setOpen] = useState(false);
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  useEffect(() => {
    fetchActivityTypes();
  }, []);

  const fetchActivityTypes = async () => {
    const { getToken } = useAuth();
    try {
      const token = await getToken();
      if (token) {
        console.log("inside fetchActivityTypes");
        const data = await getActivityTypes(token);
        console.log("data", data);
        setActivityTypes(data);
      }
    } catch (error) {
      console.error(
        error instanceof Error
          ? "Error inside of fetchActivities" + error.message
          : "An error occurred"
      );
    }
  };

  return (
    <div>
      <Button className="mx-auto h-[100%] w-full" onClick={() => setOpen(true)}>
        Add a chart <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="p-4 ">
          Select a type of chart
          <ChartTypeSelector />
        </DialogTitle>

        <DialogTitle className="p-4">Select an activity to add</DialogTitle>

        <CommandInput placeholder="Search for something to add..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Activities">
            {activityTypes.map((activity) => (
              <CommandItem key={activity}>
                <span>{activity}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default AddToChart;
