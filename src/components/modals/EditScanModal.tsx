import React, { useState } from "react";
import { X, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface EditScanModalProps {
  open: boolean;
  onClose: () => void;
  onDeleteProject: () => void;
}

const EditScanModal = ({ open, onClose, onDeleteProject }: EditScanModalProps) => {
  const [domain, setDomain] = useState("yourdomain.com");
  const [locations, setLocations] = useState(["Arizona", "Dallas", "Texas"]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [labelSearchValue, setLabelSearchValue] = useState("");
  const [sampleLabels, setSampleLabels] = useState<string[]>([
    "Single-line item 1",
    "Single-line item 2",
    "Single-line item 3",
    "Single-line item 4",
    "Single-line item 5",
    "Single-line item 6"
  ]);

  const removeLocation = (locationToRemove: string) => {
    setLocations(locations.filter(loc => loc !== locationToRemove));
  };

  const addLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addLocation();
    }
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const filteredLabels = sampleLabels.filter(label =>
    label.toLowerCase().includes(labelSearchValue.toLowerCase())
  );

  const addLabelValue = (label: string) => {
    if (label.trim() && !selectedLabels.includes(label.trim())) {
      setSelectedLabels(prev => [...prev, label.trim()]);
      setSampleLabels(prev => [...prev, label.trim()]);
      setLabelSearchValue("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl font-semibold mt-4">Edit Scan Setup</DialogTitle>
            <p className="text-foreground text-sm mt-2">
              Discover where you stand in Google search results.
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Domain Field */}
          <div className="space-y-2 p-8 bg-sky-50 rounded-lg">
            <Label htmlFor="domain" className="text-base font-medium">
              Domain
            </Label>
            <Input
              id="domain"
              placeholder="yourdomain.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="text-base bg-muted/30 bg-white"
            />
            <p className="text-sm text-muted-foreground">
              * Enter a domain or subdomain. Subfolders not supported.
            </p>
          </div>

          {/* Target Locations */}
          <div className="space-y-2">
            <Label className="text-base font-normal ">
              Target locations ({locations.length})
            </Label>
            <div className="group p-2 border rounded-lg bg-muted/20 focus-within:border-[1.3px] focus-within:border-[#6999DC]">
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  // <Badge
                  //   key={index}
                  //   variant="secondary"
                  //   className="h-8 bg-sky-blue-bg text-foreground font-normal border border-sky-blue/30 px-3 text-sm"
                  // >
                  //   {location}
                  //   <button
                  //     onClick={() => removeLocation(location)}
                  //     className="ml-2 hover:text-destructive"
                  //   >
                  //     <X className="h-3 w-3" />
                  //   </button>
                  // </Badge>
                  <div
                    key={index}
                    className="bg-[#DDE8F7] text-foreground border border-[#6999DC] hover:bg-[#CDDDF3] focus-within:bg-white focus-within:hover:bg-white cursor-pointer text-sm font-normal flex items-center group h-8 rounded-full overflow-hidden relative"
                  >
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => {
                        const newLocations = [...locations];
                        newLocations[index] = e.target.value;
                        setLocations(newLocations);
                      }}
                      className={`my-4 ml-4 mx-2 bg-transparent border-none outline-none focus:ring-0 text-sm`}
                      style={{ width: `${location.length === 0 ? 10 : location.length * 8}px` }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    <button
                      onClick={() => removeLocation(location)}
                      className="text-gray-500 hover:text-black bg-inherit hover:bg-[#BDC8D7] transition-colors h-full w-[30px] flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <Input
                  placeholder="Add here with Enter"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 min-w-[200px] h-8 border-none bg-transparent focus:ring-0 focus:border-none shadow-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-3 pt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                  {selectedLabels.length > 0 ? `Add Labels (${selectedLabels.length})` : "Add Labels"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0 bg-white border shadow-lg" align="start">
                <div className="p-4 space-y-4 flex flex-col items-end">
                  {/* Search input */}
                  <div className="flex gap-2 w-full border-[1.3px] border-gray-300 rounded-lg px-3 py-2 focus:border-[#6999DC]">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search a label here..."
                        value={labelSearchValue}
                        onChange={(e) => setLabelSearchValue(e.target.value)}
                        className="pl-10 border-none bg-inherit"
                      />
                    </div>
                    <Button variant="outline"
                      onClick={() => addLabelValue(labelSearchValue)}
                      disabled={!labelSearchValue.trim()}
                      className={cn(
                        "border-[1.3px] rounded-lg",
                        labelSearchValue.trim() ? "bg-[#DDE8F7] border-[#6999DC] hover:bg-[#CDDDF3]" : "opacity-50 bg-gray-200 border-gray-300"
                      )}>
                      Add
                    </Button>
                  </div>

                  {/* Labels list */}
                  <div className="border rounded-lg w-full overflow-hidden">
                    <ScrollArea className="h-64">
                      <div className="p-4">
                        {filteredLabels.length > 0 ? (
                          <div className="space-y-3">
                            {filteredLabels.map((label, index) => (
                              <div
                                key={index}
                                onClick={() => toggleLabel(label)}
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
                              >
                                <Checkbox
                                  checked={selectedLabels.includes(label)}
                                  className="h-4 w-4 rounded border-2"
                                />
                                <span className="text-sm text-gray-700 flex-1">
                                  {label}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center py-8">
                            <h3 className="text-lg font-medium text-gray-400 mb-2">No labels found</h3>
                            <p className="text-sm text-gray-400">
                              We can't find any item matching<br />
                              your search.
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Manage labels button */}
                  <Button
                    variant="outline"
                    className={selectedLabels.length > 0 ? `text-white bg-sky-600 max-w-[160px]` : `w-full py-3 text-gray-700 bg-gray-50 hover:bg-gray-100`}
                  >
                    {selectedLabels.length > 0 ? `Apply (${selectedLabels.length})` : "Manage labels"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Continue
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              onClick={onDeleteProject}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete project
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                Edit Labels
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditScanModal;