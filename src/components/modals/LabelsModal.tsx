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
  "Single-line item",
  "Single-line item",
  "Single-line item", 
  "Single-line item",
  "Single-line item",
  "Single-line item"
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Labels (67)
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search with Add button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search a label here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="px-6">
              Add
            </Button>
          </div>
          
          {/* Labels list */}
          <div className="border rounded-lg">
            <ScrollArea className="h-64 p-4">
              <div className="space-y-3">
                {SAMPLE_LABELS.map((label, index) => (
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
            </ScrollArea>
          </div>
          
          {/* Manage labels button */}
          <Button 
            variant="outline" 
            className="w-full py-3 text-gray-700 bg-gray-50 hover:bg-gray-100"
          >
            Manage labels
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LabelsModal;