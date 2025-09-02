import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface AddKeywordModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (keywords: string) => void;
}

const AddKeywordModal = ({ open, onClose, onConfirm }: AddKeywordModalProps) => {
  const [keywords, setKeywords] = useState("");

  const handleSubmit = () => {
    onConfirm(keywords);
    setKeywords("");
    onClose();
  };

  const clearKeywords = () => {
    setKeywords("");
  };

  const keywordCount = keywords.split('\n').filter(k => k.trim().length > 0).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Add keywords</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-600">Keywords ({keywordCount})</label>
              <button
                onClick={clearKeywords}
                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
              >
                Clear all
              </button>
            </div>
            <Textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="1.&#10;2.&#10;3.&#10;4.&#10;5.&#10;6."
              className="h-32 resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">*Enter keywords one per line</p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add keyword
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddKeywordModal;