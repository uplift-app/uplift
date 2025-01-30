import { useState } from "react";
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
const AddToChart = () => {
  const [open, setOpen] = useState(false);
  const moods = ["Happy", "Angry", "Chirpy"];
  const activities = ["Smoking", "Eating", "Drinking"];
  return (
    <>
      <Button className="mx-auto h-[100%]" onClick={() => setOpen(true)}>
        Add to chart <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="p-4">
          Select a mood or an activity to add
        </DialogTitle>
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
            {activities.map((activity) => (
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
