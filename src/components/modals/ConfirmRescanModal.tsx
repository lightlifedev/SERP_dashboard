import React from "react";
import { CheckCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmRescanModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  credits?: number;
}

const ConfirmRescanModal = ({
  open,
  onClose,
  onConfirm,
  credits = 2400
}: ConfirmRescanModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg border-0 shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7580_149919)">
                  <path d="M14.2189 20.1565L27.6638 6.88243C27.7654 6.78073 27.8861 6.70006 28.0188 6.64502C28.1516 6.58998 28.2939 6.56165 28.4377 6.56165C28.5814 6.56165 28.7237 6.58998 28.8565 6.64502C28.9893 6.70006 29.1099 6.78073 29.2115 6.88243L32.4928 10.109C32.5944 10.2106 32.6751 10.3312 32.7302 10.464C32.7852 10.5968 32.8135 10.7391 32.8135 10.8828C32.8135 11.0266 32.7852 11.1689 32.7302 11.3017C32.6751 11.4344 32.5944 11.5551 32.4928 11.6566L14.9381 29.2113C14.8365 29.313 14.7159 29.3937 14.5831 29.4487C14.4503 29.5038 14.308 29.5321 14.1642 29.5321C14.0205 29.5321 13.8782 29.5038 13.7454 29.4487C13.6126 29.3937 13.492 29.313 13.3904 29.2113L3.60135 19.3676C3.39639 19.1625 3.28125 18.8844 3.28125 18.5944C3.28125 18.3045 3.39639 18.0264 3.60135 17.8213L6.8826 14.54C6.98418 14.4384 7.10481 14.3577 7.23759 14.3026C7.37036 14.2476 7.51269 14.2193 7.65643 14.2193C7.80016 14.2193 7.94249 14.2476 8.07527 14.3026C8.20805 14.3577 8.32867 14.4384 8.43025 14.54L14.2189 20.1565Z" stroke="#20B00A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_7580_149919">
                    <rect width="35" height="35" fill="white" />
                  </clipPath>
                </defs>
              </svg>

            </div>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Confirm Rescan
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-gray-600">
            This scan will require <span className="font-semibold text-gray-900">{credits} credits</span>. Please confirm to proceed.
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
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Run now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRescanModal;