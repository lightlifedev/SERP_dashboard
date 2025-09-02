import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProcessingModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const ProcessingModal = ({ open, onClose, title = "Processing scans..." }: ProcessingModalProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (open) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <DialogTitle className="text-2xl font-semibold text-gray-900 text-center flex-1">
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            We're processing your download. Do not close this window.
          </p>
          
          <div className="space-y-4">
            <Progress value={progress} className="w-full h-3" />
            <div className="text-center text-sm text-gray-500">
              {Math.round(progress)}% complete
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-8 py-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingModal;