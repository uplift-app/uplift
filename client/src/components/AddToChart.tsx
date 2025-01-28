import React, { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
const AddToChart = () => {
  const handleOpenChange = () => {
    console.log("hello world");
  };

  const [open, setOpen] = useState(false);
  const moods = ["Happy", "Angry", "Chirpy"];
  const activities = ["Smoking", "Eating", "Drinking"];
  return (
    <>
      <Button className="mx-auto h-[100%]" onClick={() => setOpen(true)}>
        Add to chart <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for something to add..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Moods">
            {moods.map((mood) => (
              <CommandItem>
                <span>{mood}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Activities">
            {activities.map((activity) => (
              <CommandItem>
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
