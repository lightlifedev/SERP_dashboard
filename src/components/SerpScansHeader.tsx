import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Download, FileText, FileSpreadsheet, Trash2, Link, Upload, RotateCcw, Tags, Tag, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RunBulkScansModal from "@/components/modals/RunBulkScansModal";
import ProcessingModal from "@/components/modals/ProcessingModal";
import LabelsModal from "@/components/modals/LabelsModal";
import RemoveLabelsModal from "@/components/modals/RemoveLabelsModal";

const SerpScansHeader = () => {
  const [runBulkScansOpen, setRunBulkScansOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingType, setProcessingType] = useState<"pdf" | "csv">("pdf");
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);
  const [removeLabelsModalOpen, setRemoveLabelsModalOpen] = useState(false);

  const handleCopyLink = () => {
    // Copy functionality here
    console.log("Copy link clicked");
  };

  const handleExportPDF = () => {
    setProcessingType("pdf");
    setProcessingModalOpen(true);
  };

  const handleExportCSV = () => {
    setProcessingType("csv");
    setProcessingModalOpen(true);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-border-grey">
      <h1 className="text-lg font-medium text-foreground">SERP Scans</h1>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline-blue"
                size="icon"
                onClick={handleCopyLink}
                className="h-10 w-10 bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]"
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline-blue" className="bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]">
              <Upload className="h-4 w-4 mr-1" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2" onClick={handleExportPDF}>
              <FileText className="h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={handleExportCSV}>
              <FileSpreadsheet className="h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Modals */}
      <RunBulkScansModal
        open={runBulkScansOpen}
        onClose={() => setRunBulkScansOpen(false)}
        onConfirm={() => {
          setRunBulkScansOpen(false);
          setProcessingModalOpen(true);
        }}
      />
      <ProcessingModal
        open={processingModalOpen}
        onClose={() => setProcessingModalOpen(false)}
        title={processingType === "pdf" ? "Exporting PDF..." : "Exporting CSV..."}
      />
      <LabelsModal
        open={labelsModalOpen}
        onClose={() => setLabelsModalOpen(false)}
      />
      <RemoveLabelsModal
        open={removeLabelsModalOpen}
        onClose={() => setRemoveLabelsModalOpen(false)}
        onConfirm={() => {
          setRemoveLabelsModalOpen(false);
        }}
      />
    </div>
  );
};

export default SerpScansHeader;