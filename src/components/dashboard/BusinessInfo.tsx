import { MapPin, ExternalLink, Phone, Globe, RefreshCw, Link, Download, Upload, FileText, FileSpreadsheet, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BusinessInfo = () => {
  return (
    <TooltipProvider>
      <div className="bg-white border-b border-border-grey pb-6">
        <div className="flex items-center justify-between">
          {/* Left part - Business info */}
          <div className="space-y-2">
            {/* First line - Business name with location and link icons */}
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-location-red" />
              <span className="text-lg font-medium text-foreground">Public Service Plumbers</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            
            {/* Second line - Contact details */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground px-6">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>561 Dyer St Dallas, TX 75206</span>
              </div>
              <div className="w-px h-4 bg-border-grey"></div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>+1 (214) 433 - 6926</span>
              </div>
              <div className="w-px h-4 bg-border-grey"></div>
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>https://www.publicserviceplumbers.com</span>
              </div>
            </div>
          </div>
          
          {/* Right part - Action buttons */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline-blue" size="icon" className="bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Return</p>
              </TooltipContent>
            </Tooltip>
            
            <Button variant="outline-blue" size="icon" className="bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]">
              <Link className="h-4 w-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline-blue" className="bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20] hover:text-[#1E1F20]">
                  <Upload className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
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
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BusinessInfo;