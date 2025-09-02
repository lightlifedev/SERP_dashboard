import React from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProjectModal = ({ open, onClose, onConfirm }: DeleteProjectModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
              <Trash2 className="h-4 w-4 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Delete Project
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              This action is permanent and cannot be undone. Once deleted, you will not be able to recover this scan.
            </p>
            
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">This action cannot be undone.</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;