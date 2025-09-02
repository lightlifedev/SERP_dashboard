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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LabelsModalProps {
  open: boolean;
  onClose: () => void;
}

const SAMPLE_LABELS = [
  "Single-line item 1",
  "Single-line item 2",
  "Single-line item 3", 
  "Single-line item 4",
  "Single-line item 5",
  "Single-line item 6"
];

const LabelsModal: React.FC<LabelsModalProps> = ({ open, onClose }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev => 
      prev.includes(label) 
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const filteredLabels = SAMPLE_LABELS.filter(label =>
    label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Labels (67)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex flex-col items-end">
          {/* Search with Add button */}
          <div className="flex gap-2 w-full border-[1.3px] border-gray-300 rounded-lg px-3 py-2 focus:border-[#6999DC]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search a label here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 focus:border-[1.3px] focus:border-[#6999DC]"
              />
            </div>
            <Button variant="outline" className="px-6">
              Add
            </Button>
          </div>
          
          {/* Labels list */}
          <div className="border rounded-lg w-full">
            <ScrollArea className="h-64 p-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default LabelsModal;