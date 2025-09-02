import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Download, FileText, FileSpreadsheet, Trash2, Link, Upload, RotateCcw, Tags, Tag, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [runBulkScansOpen, setRunBulkScansOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [processingType, setProcessingType] = useState<"pdf" | "csv">("pdf");
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);
  const [removeLabelsModalOpen, setRemoveLabelsModalOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = async () => {
    setProcessingType("pdf");
    setProcessingModalOpen(true);

    // Simulate export process
    setTimeout(async () => {
      try {
        const { exportToPDF } = await import("@/lib/exportUtils");
        await exportToPDF();
        setProcessingModalOpen(false);
        toast({
          title: "PDF exported!",
          description: "Your PDF export has been generated successfully.",
        });
      } catch (err) {
        setProcessingModalOpen(false);
        toast({
          title: "Export failed",
          description: "Could not generate PDF export.",
          variant: "destructive",
        });
      }
    }, 3000);
  };

  const handleExportCSV = async () => {
    setProcessingType("csv");
    setProcessingModalOpen(true);

    // Simulate export process
    setTimeout(async () => {
      try {
        const { exportToCSV } = await import("@/lib/exportUtils");
        await exportToCSV();
        setProcessingModalOpen(false);
        toast({
          title: "CSV exported!",
          description: "Your CSV export has been generated successfully.",
        });
      } catch (err) {
        setProcessingModalOpen(false);
        toast({
          title: "Export failed",
          description: "Could not generate CSV export.",
          variant: "destructive",
        });
      }
    }, 3000);
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
                className="h-[40px] w-[40px] bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]"
              >
                {/* <Link className="h-4 w-4" /> */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7531_127449)">
                    <path d="M7.5 12.5L12.5 7.5" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.75 5.94609L11.0984 3.60234C11.8036 2.90854 12.7544 2.5215 13.7437 2.52553C14.7329 2.52956 15.6805 2.92433 16.3801 3.62385C17.0796 4.32337 17.4743 5.27096 17.4784 6.26023C17.4824 7.24949 17.0954 8.20027 16.4016 8.90547L14.0531 11.25" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.94598 8.75L3.60223 11.0984C2.90843 11.8036 2.52139 12.7544 2.52542 13.7437C2.52945 14.7329 2.92422 15.6805 3.62374 16.3801C4.32326 17.0796 5.27086 17.4743 6.26012 17.4784C7.24938 17.4824 8.20016 17.0954 8.90536 16.4016L11.2499 14.0531" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7531_127449">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
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
              {/* <Upload className="h-4 w-4 mr-1" /> */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83398 10.8333H5.00065C4.08018 10.8333 3.33398 11.5795 3.33398 12.5V14.1667C3.33398 15.0872 4.08018 15.8333 5.00065 15.8333H15.0007C15.9211 15.8333 16.6673 15.0872 16.6673 14.1667V12.5C16.6673 11.5795 15.9211 10.8333 15.0007 10.8333H14.1673" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 4.16666V11.6667M10 4.16666L12.5 6.66666M10 4.16666L7.5 6.66666" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2" onClick={handleExportPDF}>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7775_184267)">
                  <path d="M17.375 11.875H14.875V16.25" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16.75 14.375H14.875" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4.25 15H5.5C5.9144 15 6.31183 14.8354 6.60485 14.5424C6.89788 14.2493 7.0625 13.8519 7.0625 13.4375C7.0625 13.0231 6.89788 12.6257 6.60485 12.3326C6.31183 12.0396 5.9144 11.875 5.5 11.875H4.25V16.25" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.25 11.875V16.25H10.5C11.0802 16.25 11.6366 16.0195 12.0468 15.6093C12.457 15.1991 12.6875 14.6427 12.6875 14.0625C12.6875 13.4823 12.457 12.9259 12.0468 12.5157C11.6366 12.1055 11.0802 11.875 10.5 11.875H9.25Z" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4.25 8.75V3.125C4.25 2.95924 4.31585 2.80027 4.43306 2.68306C4.55027 2.56585 4.70924 2.5 4.875 2.5H12.375L16.75 6.875V8.75" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.375 2.5V6.875H16.75" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_7775_184267">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={handleExportCSV}>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7775_184287)">
                  <path d="M6.75 15.693C6.59055 15.866 6.39743 16.0047 6.18249 16.1005C5.96754 16.1963 5.7353 16.2472 5.5 16.25C4.46406 16.25 3.625 15.2703 3.625 14.0625C3.625 12.8547 4.46406 11.875 5.5 11.875C5.7353 11.8778 5.96754 11.9287 6.18249 12.0245C6.39743 12.1203 6.59055 12.259 6.75 12.432" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.4296 12C11.4296 12 9.13043 11.3922 8.94527 12.8594C8.76011 14.3265 11.9476 13.65 11.7406 15.2594C11.5476 16.7562 9.25777 16.1187 9.25777 16.1187" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4.25 8.75V3.125C4.25 2.95924 4.31585 2.80027 4.43306 2.68306C4.55027 2.56585 4.70924 2.5 4.875 2.5H12.375L16.75 6.875V8.75" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.375 2.5V6.875H16.75" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M13.625 11.875L15.1875 16.25L16.75 11.875" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_7775_184287">
                    <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
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