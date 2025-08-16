import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RunBulkScansModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RunBulkScansModal = ({ open, onClose, onConfirm }: RunBulkScansModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8  rounded flex items-center justify-center">
              <svg width="23" height="29" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0413 27.625H4.20801C2.59718 27.625 1.29134 26.3192 1.29134 24.7083V23.25V4.29167C1.29134 2.68084 2.59718 1.375 4.20801 1.375H12.958M21.708 10.125L12.958 1.375M21.708 10.125H15.8747C14.2638 10.125 12.958 8.81916 12.958 7.20833V1.375M21.708 10.125V13.0417M5.66634 21.7917H9.31217M5.66634 15.9583H12.958M5.66634 10.125H8.58301" stroke="#1E87DB" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21.708 18.875L15.8747 26.1667L12.958 23.25" stroke="#1E87DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Run Bulk Scans
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-600">
            This scan will require <span className="font-semibold text-gray-900">2400 credits</span>. Please confirm to proceed.
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
            >
              Run now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RunBulkScansModal;