import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  ExternalLink,
  MoreHorizontal,
  RotateCcw,
  Share2,
  Edit3,
  FileText,
  FileDown,
  Pause,
  CheckCircle,
  Trash2,
  ChevronDown,
  Info,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ManuallyIconBlue from "@/assets/manually_blue.png";
import WeeklyIconBlue from "@/assets/weekly_blue.png";
import ManuallyIconGray from "@/assets/manually_gray.png";
import WeeklyIconGray from "@/assets/weekly_gray.png";

// Mock data for the table
const mockData = [
  {
    id: 1,
    domain: "business-domain.com",
    schedule: { type: "Manually", icon: "⏸" },
    improvedKW: { current: 5, total: 10 },
    avgPosition: { current: 60, change: -8 },
    opd: {
      "1-3": 8.80,
      "4-10": 11.8,
      "11-20": 22.9,
      "21-50": 21.5,
      "51-100": 35.0
    },
    status: "Active",
    lastUpdated: "October 5, 2024",
    labels: ["label1", "label2", "label3", "label4"]
  },
  {
    id: 2,
    domain: "business-domain.com",
    schedule: {
      type: "Weekly",
      details: "Tue, 12:30PM",
      nextRun: "Tue, Apr 15, 2025 12:30PM"
    },
    improvedKW: { current: 3, total: 7 },
    avgPosition: { current: 33, change: 2 },
    opd: {
      "1-3": 35.80,
      "4-10": 11.8,
      "11-20": 22.9,
      "21-50": 21.5,
      "51-100": 8.0
    },
    status: "Active",
    lastUpdated: "October 5, 2024",
    labels: ["label1", "label2", "label3"]
  },
  {
    id: 3,
    domain: "business-domain.com",
    schedule: { type: "Manually", icon: "⏸" },
    improvedKW: { current: 5, total: 10 },
    avgPosition: { current: 60, change: -6 },
    opd: {
      "1-3": 8.80,
      "4-10": 11.8,
      "11-20": 22.9,
      "21-50": 21.5,
      "51-100": 35.0
    },
    status: "Active",
    lastUpdated: "October 5, 2024",
    labels: ["label1", "label2", "label3"]
  },
  {
    id: 4,
    domain: "business-domain.com",
    schedule: {
      type: "Weekly",
      details: "Tue, 12:30PM",
      nextRun: "Tue, Apr 15, 2025 12:30PM"
    },
    improvedKW: { current: 3, total: 7 },
    avgPosition: { current: 33, change: 2 },
    opd: {
      "1-3": 8.80,
      "4-10": 11.8,
      "11-20": 22.9,
      "21-50": 21.5,
      "51-100": 35.0
    },
    status: "Active",
    lastUpdated: "October 5, 2024",
    labels: ["label1", "label2", "label3"]
  },
  {
    id: 5,
    domain: "business-domain.com",
    schedule: { type: "Manually", icon: "⏸" },
    improvedKW: { current: 6, total: 17 },
    avgPosition: { current: 23, change: 2 },
    opd: {
      "1-3": 8.80,
      "4-10": 11.8,
      "11-20": 22.9,
      "21-50": 21.5,
      "51-100": 35.0
    },
    status: "Paused",
    lastUpdated: "October 5, 2024",
    labels: ["label1", "label2", "label3"]
  }
];

const KeywordsTable = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [openDropdownRow, setOpenDropdownRow] = useState<number | null>(null);

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === mockData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map(row => row.id));
    }
  };

  const handleDomainClick = (domain: string) => {
    navigate('/dashboard');
  };

  const ScheduleTooltip = ({ schedule, status }: { schedule: any; status: string }) => {
    if (schedule.nextRun) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-default">
              <div className="flex items-center gap-[1px]">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-start justify-center",
                )}>
                  <img src={status === "Paused" ? WeeklyIconGray : WeeklyIconBlue} className={cn(
                    "h-4 w-4",
                    status === "Paused" ? "text-gray-500" : "text-blue-600"
                  )} />
                </div>
                <div>
                  <div className={cn(
                    "font-medium text-sm",
                    status === "Paused" ? "text-gray-500" : "text-foreground"
                  )}>
                    {schedule.type}
                  </div>
                  <div className={cn(
                    "text-xs",
                    status === "Paused" ? "text-gray-400" : "text-muted-foreground"
                  )}>
                    {schedule.details}
                  </div>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white border shadow-lg rounded-xl max-w-xs" side="top">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{schedule.nextRun}</span>
              <Button size="sm" className="ml-4 bg-sky-100 text-[12px] h-6 text-sky-700 hover:bg-sky-200 rounded-full">
                Next
              </Button>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div className="flex items-center gap-[1px]">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
        )}>
          <img 
            src={status === "Paused" ? ManuallyIconGray : ManuallyIconBlue} 
            alt="Manually" 
            className="h-4 w-4"
          />
        </div>
        <span className={cn(
          "font-medium text-sm",
          status === "Paused" ? "text-gray-500" : "text-foreground"
        )}>
          {schedule.type}
        </span>
      </div>
    );
  };

  const OPDChart = ({ opd }: { opd: any }) => {
    const data = [
      { range: "1-3", percentage: opd["1-3"], color: "#10b981" },
      { range: "4-10", percentage: opd["4-10"], color: "#34d399" },
      { range: "11-20", percentage: opd["11-20"], color: "#fbbf24" },
      { range: "21-50", percentage: opd["21-50"], color: "#f97316" },
      { range: "51-100", percentage: opd["51-100"], color: "#ef4444" }
    ];

    const radius = 12;
    const innerRadius = 9;
    const circumference = 2 * Math.PI * radius;
    let currentAngle = 0;
    const gapAngle = 4; // Gap between segments in degrees

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default">
            <svg width="32" height="32" viewBox="0 0 32 32" className="transform -rotate-90">
              {data.map(({ range, percentage, color }, index) => {
                const segmentAngle = ((percentage / 100) * 360) - gapAngle;
                const startAngle = currentAngle;
                const endAngle = currentAngle + segmentAngle;

                const x1 = 16 + radius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 16 + radius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 16 + radius * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 16 + radius * Math.sin((endAngle * Math.PI) / 180);

                const x3 = 16 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                const y3 = 16 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
                const x4 = 16 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                const y4 = 16 + innerRadius * Math.sin((startAngle * Math.PI) / 180);

                const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                const pathData = [
                  `M ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `L ${x3} ${y3}`,
                  `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                  `Z`
                ].join(' ');

                currentAngle += segmentAngle + gapAngle;

                return (
                  <path
                    key={range}
                    d={pathData}
                    fill={color}
                  />
                );
              })}
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white border shadow-lg rounded-xl p-4" side="top">
          <div className="space-y-2">
            {Object.entries(opd).map(([range, percentage]) => (
              <div key={range} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    range === "1-3" && "bg-green-500",
                    range === "4-10" && "bg-green-400",
                    range === "11-20" && "bg-yellow-500",
                    range === "21-50" && "bg-orange-500",
                    range === "51-100" && "bg-red-500"
                  )} />
                  <span className="text-sm text-gray-700">{range}</span>
                </div>
                <span className="text-sm font-semibold">{percentage as number}%</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  const ActionButtons = ({ row }: { row: any }) => (
    <div 
      className="flex items-center gap-1"
      onMouseEnter={() => setHoveredRow(row.id)}
      onMouseLeave={() => {
        // Only hide if dropdown is not open
        if (openDropdownRow !== row.id) {
          setHoveredRow(null);
        }
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Refresh</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Share</span>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit3 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Edit</span>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu onOpenChange={(open) => setOpenDropdownRow(open ? row.id : null)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border shadow-lg z-[100]" align="end">
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-accent cursor-pointer">
            <FileText className="h-4 w-4" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-accent cursor-pointer">
            <FileDown className="h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-accent cursor-pointer">
            <Pause className="h-4 w-4" />
            Pause
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-accent cursor-pointer">
            <CheckCircle className="h-4 w-4" />
            Activate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-accent cursor-pointer text-red-600">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="bg-white">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-weak-blue hover:bg-weak-blue">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === mockData.length}
                    onCheckedChange={handleSelectAll}
                    className="h-4 w-4"
                  />
                </TableHead>
                <TableHead>Domain ({selectedRows.length})</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Improved KW
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Number of keywords that improved in ranking</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Avg Position
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Average ranking position across all keywords</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    OPD
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Organic Position Distribution - breakdown of keyword rankings by position ranges</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "border-b transition-colors",
                    hoveredRow === row.id && "bg-gray-50",
                    selectedRows.includes(row.id) && "bg-muted/30"
                  )}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => {
                    // Don't hide hover state if dropdown is open
                    if (openDropdownRow !== row.id) {
                      setHoveredRow(null);
                    }
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => handleRowSelect(row.id)}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="border-r border-gray-200">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span 
                        className={cn(
                          "font-medium cursor-pointer",
                          hoveredRow === row.id && "text-sky-600"
                        )}
                        onClick={() => handleDomainClick(row.domain)}
                      >
                        {row.domain}
                      </span>
                      <div 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => handleDomainClick(row.domain)}
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-sky-600" />
                        <span className="text-xs text-muted-foreground">11</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="flex gap-1 flex-wrap items-center">
                        {row.labels.slice(0, 3).map((label, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-[10px] h-4 px-2 bg-blue-50 text-blue-700 border-blue-200 rounded-sm"
                          >
                            {label}
                          </Badge>
                        ))}
                        {row.labels.length > 3 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Badge
                                variant="outline"
                                className="text-[10px] h-4 px-1 bg-gray-50 text-gray-600 border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 flex items-center gap-1"
                              >
                                {row.labels.length - 3} more
                                <ChevronDown className="h-3 w-3" />
                              </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-32 bg-background border shadow-md">
                              {row.labels.slice(3).map((label, index) => (
                                <DropdownMenuItem key={index} className="text-xs py-1 px-2">
                                  {label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground opacity-60")}>
                    <ScheduleTooltip schedule={row.schedule} status={row.status} />
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground opacity-60")}>
                    {row.improvedKW.current}/{row.improvedKW.total}
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground opacity-60")}>
                    <div className="flex items-center gap-1">
                      <span>{row.avgPosition.current}</span>
                      <span className={cn(
                        "text-sm",
                        row.avgPosition.change > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {row.avgPosition.change > 0 ? '+' : ''}{row.avgPosition.change}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <OPDChart opd={row.opd} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={row.status === "Active" ? "default" : "secondary"}
                      className={cn(
                        "rounded-full",
                        row.status === "Active" && "bg-green-100 text-green-800",
                        row.status === "Paused" && "bg-sky-100 text-sky-800"
                      )}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-48">
                    <div className="flex items-center justify-between w-full">
                      {(hoveredRow === row.id || openDropdownRow === row.id) ? (
                        <ActionButtons row={row} />
                       ) : (
                         <div className="flex items-center gap-2">
                           <Tooltip>
                             <TooltipTrigger asChild>
                               <div className="flex items-center gap-1">
                                 <RefreshCw className="h-3 w-3 text-gray-400" />
                                 <span className="text-sm text-gray-600">0 hours ago</span>
                               </div>
                             </TooltipTrigger>
                             <TooltipContent>
                               <div className="text-sm">
                                 <div className="font-medium">Updated</div>
                                 <div className="text-gray-600">{row.lastUpdated}</div>
                               </div>
                             </TooltipContent>
                           </Tooltip>
                         </div>
                       )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <span>Page</span>
          <select className="border border-gray-300 rounded px-2 py-1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span>of 3</span>
          <select className="border border-gray-300 rounded px-2 py-1 ml-4">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default KeywordsTable;