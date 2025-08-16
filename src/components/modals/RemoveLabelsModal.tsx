import React from "react";
import { X, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RemoveLabelsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveLabelsModal = ({ open, onClose, onConfirm }: RemoveLabelsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8  rounded flex items-start justify-center">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7426_130990)">
                  <path d="M29.5312 7.65625H5.46875" stroke="#F54750" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14.2188 14.2188V22.9688" stroke="#F54750" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20.7812 14.2188V22.9688" stroke="#F54750" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M27.3438 7.65625V28.4375C27.3438 28.7276 27.2285 29.0058 27.0234 29.2109C26.8183 29.416 26.5401 29.5312 26.25 29.5312H8.75C8.45992 29.5312 8.18172 29.416 7.9766 29.2109C7.77148 29.0058 7.65625 28.7276 7.65625 28.4375V7.65625" stroke="#F54750" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22.9688 7.65625V5.46875C22.9688 4.88859 22.7383 4.33219 22.328 3.92195C21.9178 3.51172 21.3614 3.28125 20.7812 3.28125H14.2188C13.6386 3.28125 13.0822 3.51172 12.672 3.92195C12.2617 4.33219 12.0312 4.88859 12.0312 5.46875V7.65625" stroke="#F54750" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_7426_130990">
                    <rect width="35" height="35" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Remove Labels
              </DialogTitle>
              <div className="space-y-3">
                <p className="text-gray-600">
                  This action is permanent and cannot be undone.
                </p>
                <p className="text-gray-600">
                  Once removed, you will not be able to recover the labels.
                </p>

                <div className="flex items-center gap-2 rounded-lg p-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span className="text-md text-red-700">
                    This action cannot be undone.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
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
              Yes, remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveLabelsModal;