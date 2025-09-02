import React, { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";
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
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowDown,
  ArrowUp,
  Calendar,
  MoreVertical
} from "lucide-react";
import DeleteScanModal from "@/components/modals/DeleteScanModal";
import ProcessingModal from "@/components/modals/ProcessingModal";
import EditScanModal from "@/components/modals/EditScanModal";
import DeleteProjectModal from "@/components/modals/DeleteProjectModal";
import ConfirmRescanModal from "@/components/modals/ConfirmRescanModal";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { table, badge, button } from "@/lib/component-styles";
import WeeklyIconBlue from "@/assets/weekly_blue.png";
import WeeklyIconGray from "@/assets/weekly_gray.png";

import { mockKeywords, opdChartConfig, opdChartColors, createOPDChartData } from "@/mockup/keywords";

const KeywordsTable = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [openDropdownRow, setOpenDropdownRow] = useState<number | null>(null);
  const [openScheduleDropdown, setOpenScheduleDropdown] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const [confirmRescanModalOpen, setConfirmRescanModalOpen] = useState(false);
  const [selectedRowForAction, setSelectedRowForAction] = useState<number | null>(null);
  const [processingStates, setProcessingStates] = useState<{ [key: number]: { isProcessing: boolean; hasScannedBefore: boolean; endTime?: number } }>({});
  const [tableData, setTableData] = useState(mockKeywords);
  const [expandedLabelRows, setExpandedLabelRows] = useState<Set<number>>(new Set());

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === mockKeywords.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockKeywords.map(row => row.id));
    }
  };

  const handleDomainClick = (domain: string) => {
    const domainData = tableData.find(row => row.domain === domain);
    window.location.href = `/dashboard?domainId=${domainData?.id.toString() || ''}`;
  };

  const handleScheduleChange = (rowId: number, newSchedule: string) => {
    // Update the schedule for the specific row
    setTableData(prevData =>
      prevData.map(row => {
        if (row.id === rowId) {
          if (newSchedule === 'Manual') {
            return { ...row, schedule: { type: "Manually", icon: "⏸" } };
          } else if (newSchedule === 'Weekly') {
            return {
              ...row,
              schedule: {
                type: "Weekly",
                details: "Tue, 12:30PM",
                nextRun: "Tue, Apr 15, 2025 12:30PM"
              }
            };
          } else {
            return {
              ...row,
              schedule: {
                type: "Monthly",
                details: "Tue, 12:30PM",
                nextRun: "Tue, Apr 15, 2025 12:30PM"
              }
            };
          }
        }
        return row;
      })
    );
    toast({
      title: "Schedule Updated",
      description: `Schedule changed to ${newSchedule}`,
    });
    setOpenScheduleDropdown(null);
  };

  const handleExportAction = (type: 'PDF' | 'CSV') => {
    setProcessingModalOpen(true);
    // Simulate processing time
    setTimeout(() => {
      setProcessingModalOpen(false);
      toast({
        title: "Export Complete",
        description: `Your ${type} export has been generated successfully.`,
      });
    }, 3000);
  };

  const handleRefreshClick = (rowId: number) => {
    setSelectedRowForAction(rowId);
    setConfirmRescanModalOpen(true);
    toast({
      title: "Refresh initiated",
      description: "Starting scan refresh process...",
    });
  };

  const handleConfirmRefresh = () => {
    if (selectedRowForAction) {
      const hasScannedBefore = Math.random() > 0.5; // Simulate random previous scan history
      const duration = Math.floor(Math.random() * 4000) + 4000; // 4-7 seconds randomly

      setProcessingStates(prev => ({
        ...prev,
        [selectedRowForAction]: {
          isProcessing: true,
          hasScannedBefore,
          endTime: Date.now() + duration
        }
      }));

      setTimeout(() => {
        setProcessingStates(prev => ({
          ...prev,
          [selectedRowForAction]: { ...prev[selectedRowForAction], isProcessing: false }
        }));
      }, duration);

      setSelectedRowForAction(null);
    }
  };

  const handleDeleteAction = (rowId: number) => {
    setSelectedRowForAction(rowId);
    setDeleteModalOpen(true);
  };

  const handleEditAction = () => {
    setEditModalOpen(true);
  };

  const handleDeleteProject = () => {
    setEditModalOpen(false);
    setDeleteProjectModalOpen(true);
  };

  const confirmDelete = () => {
    toast({
      title: "Scan Deleted",
      description: "The scan has been permanently deleted.",
    });
    setDeleteModalOpen(false);
    setSelectedRowForAction(null);
  };

  const confirmDeleteProject = () => {
    toast({
      title: "Project Deleted",
      description: "The project has been permanently deleted.",
    });
    setDeleteProjectModalOpen(false);
    setEditModalOpen(false);
  };

  const ScheduleCell = ({ schedule, status, rowId }: { schedule: any; status: string; rowId: number }) => {
    if (schedule.nextRun) {
      return (
        <div className="cursor-default">
          <DropdownMenu
            open={openScheduleDropdown === rowId}
            onOpenChange={(open) => setOpenScheduleDropdown(open ? rowId : null)}
          >
            <DropdownMenuTrigger asChild>
              <div
                className="flex items-center gap-[1px] cursor-pointer hover:bg-gray-50 rounded p-1"
                onMouseEnter={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
              >
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
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 bg-white border shadow-lg rounded-xl p-2 z-50"
              align="center"
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={() => handleScheduleChange(rowId, 'Manual')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <Calendar className={cn(
                  "h-4 w-4",
                  schedule.type === "Manually" ? "text-blue-600" : "text-gray-600"
                )} />
                <div>
                  <div className={cn(
                    "text-sm font-medium",
                    schedule.type === "Manually" ? "text-blue-600" : "text-foreground"
                  )}>Manual</div>
                  <div className="text-xs text-gray-500">On demand</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleScheduleChange(rowId, 'Weekly')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer "
              >
                <img src={schedule.type === "Weekly" ? WeeklyIconBlue : WeeklyIconGray} className={cn(
                  "h-4 w-4",
                  schedule.type === "Weekly" ? "text-blue-600" : "text-gray-500"
                )} />
                <div>
                  <div className={cn(
                    "text-sm font-medium",
                    schedule.type === "Weekly" ? "text-blue-600" : "text-foreground"
                  )}>Weekly</div>
                  <div className="text-xs text-gray-500">Recurring schedule</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleScheduleChange(rowId, 'Monthly')}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
              >
                <img src={schedule.type === "Monthly" ? WeeklyIconBlue : WeeklyIconGray} className={cn(
                  "h-4 w-4",
                  schedule.type === "Monthly" ? "text-blue-600" : "text-gray-500"
                )} />
                <div>
                  <div className={cn(
                    "text-sm font-medium",
                    schedule.type === "Monthly" ? "text-blue-600" : "text-foreground"
                  )}>Monthly</div>
                  <div className="text-xs text-gray-500">Recurring schedule</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <DropdownMenu
        open={openScheduleDropdown === rowId}
        onOpenChange={(open) => setOpenScheduleDropdown(open ? rowId : null)}
      >
        <DropdownMenuTrigger asChild>
          <div
            className="flex items-center gap-[1px] cursor-pointer rounded p-1"
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
            )}>
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_7672_121958)">
                  <path d="M16.7832 3.1156H4.2832C3.93803 3.1156 3.6582 3.39542 3.6582 3.7406V16.2406C3.6582 16.5858 3.93803 16.8656 4.2832 16.8656H16.7832C17.1284 16.8656 17.4082 16.5858 17.4082 16.2406V3.7406C17.4082 3.39542 17.1284 3.1156 16.7832 3.1156Z" stroke="#6B7280" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14.2832 1.8656V4.3656" stroke="#6B7280" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.7832 1.8656V4.3656" stroke="#6B7280" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3.6582 6.8656H17.4082" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_7672_121958">
                    <rect width="20" height="20" fill="white" transform="translate(0.533203 -0.00939941)" />
                  </clipPath>
                </defs>
              </svg>

            </div>
            <span className={cn(
              "font-medium text-sm",
              status === "Paused" ? "text-gray-500" : "text-foreground"
            )}>
              {schedule.type}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 bg-white border shadow-lg rounded-xl p-2 z-50"
          align="center"
          onMouseEnter={(e) => e.stopPropagation()}
          onMouseLeave={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            onClick={() => handleScheduleChange(rowId, 'Manual')}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
            <Calendar className={cn(
              "h-4 w-4",
              schedule.type === "Manually" ? "text-blue-600" : "text-gray-600"
            )} />
            <div>
              <div className={cn(
                "text-sm font-medium",
                schedule.type === "Manually" ? "text-blue-600" : "text-foreground"
              )}>Manual</div>
              <div className="text-xs text-gray-500">On demand</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleScheduleChange(rowId, 'Weekly')}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer "
          >
            <img src={schedule.type === "Weekly" ? WeeklyIconBlue : WeeklyIconGray} className={cn(
              "h-4 w-4",
              schedule.type === "Weekly" ? "text-blue-600" : "text-gray-500"
            )} />
            <div>
              <div className={cn(
                "text-sm font-medium",
                schedule.type === "Weekly" ? "text-blue-600" : "text-foreground"
              )}>Weekly</div>
              <div className="text-xs text-gray-500">Recurring schedule</div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleScheduleChange(rowId, 'Monthly')}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
            <img src={schedule.type === "Monthly" ? WeeklyIconBlue : WeeklyIconGray} className={cn(
              "h-4 w-4",
              schedule.type === "Monthly" ? "text-blue-600" : "text-gray-500"
            )} />
            <div>
              <div className={cn(
                "text-sm font-medium",
                schedule.type === "Monthly" ? "text-blue-600" : "text-foreground"
              )}>Monthly</div>
              <div className="text-xs text-gray-500">Recurring schedule</div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const OPDChart = ({ opd }: { opd: any }) => {
    const data = createOPDChartData(opd);
    const { radius, innerRadius, gapAngle } = opdChartConfig;
    const circumference = 2 * Math.PI * radius;
    let currentAngle = 0;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-default">
            <svg width="48" height="48" viewBox="0 0 48 48" className="transform -rotate-90">
              {data.map(({ range, percentage, color }, index) => {
                const segmentAngle = ((percentage / 100) * 360) - gapAngle;
                const startAngle = currentAngle;
                const endAngle = currentAngle + segmentAngle;

                const x1 = 24 + radius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 24 + radius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 24 + radius * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 24 + radius * Math.sin((endAngle * Math.PI) / 180);

                const x3 = 24 + innerRadius * Math.cos((endAngle * Math.PI) / 180);
                const y3 = 24 + innerRadius * Math.sin((endAngle * Math.PI) / 180);
                const x4 = 24 + innerRadius * Math.cos((startAngle * Math.PI) / 180);
                const y4 = 24 + innerRadius * Math.sin((startAngle * Math.PI) / 180);

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
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: opdChartColors[range as keyof typeof opdChartColors] }}
                  />
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

  return (
    <TooltipProvider>
      <div className="bg-white">
        <div className={table.container}>
          <Table>
            <TableHeader className="">
              <TableRow className={table.header}>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === mockKeywords.length}
                    onCheckedChange={handleSelectAll}
                    className={table.checkbox}
                  />
                </TableHead>
                <TableHead className={table.headerText}>Domain {selectedRows.length > 0 && `(` + selectedRows.length + `)`}</TableHead>
                <TableHead>
                  <div className={table.headerInfo}>
                    Avg Position
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className={table.headerInfoIcon} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[240px] font-normal">
                        <span>Average ranking position across all keywords</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>
                  <div className={table.headerInfo}>
                    Improved KW
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className={table.headerInfoIcon} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[240px] font-normal">
                        <span>Number of keywords that improved in ranking</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead>
                  <div className={table.headerInfo}>
                    OPD
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className={table.headerInfoIcon} />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[240px] font-normal">
                        <span>Organic Position Distribution - breakdown of keyword rankings by position ranges</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className={cn("text-center", table.headerText)}>Schedule</TableHead>
                <TableHead className={cn("text-center", table.headerText)}>Last</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
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
                  <TableCell className="border-r border-gray-200 w-1/4">
                    <div className="flex items-start justify-between gap-4 mt-2 mb-2">
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
                      </div>
                    </div>
                    <div className="mt-1 mb-2">
                      <div className="flex gap-1 flex-wrap items-center">
                        {expandedLabelRows.has(row.id) ? (
                          // Show all labels when expanded
                          <>
                            {row.labels.map((label, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-[10px] h-4 px-2 font-normal rounded-sm color-[#6B7280] border-[0.5px] border-[#A2A8B3] bg-[#E7ECFC] hover:color-[#4A4E5A] hover:border-[#7C8392] hover:bg-[#CDD7F9] cursor-pointer"
                              >
                                {label}
                              </Badge>
                            ))}
                            {row.labels.length > 3 && (
                              <button
                                onClick={() => setExpandedLabelRows(prev => {
                                  const newSet = new Set(prev);
                                  newSet.delete(row.id);
                                  return newSet;
                                })}
                                className="text-[10px] text-gray-600 underline hover:text-gray-800 font-normal"
                              >
                                see less
                              </button>
                            )}
                          </>
                        ) : (
                          // Show only first 2 labels when collapsed
                          <>
                            {row.labels.slice(0, 3).map((label, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-[10px] h-4 px-2 font-normal rounded-sm color-[#6B7280] border-[0.5px] border-[#A2A8B3] bg-[#E7ECFC] hover:color-[#4A4E5A] hover:border-[#7C8392] hover:bg-[#CDD7F9] cursor-pointer"
                              >
                                {label}
                              </Badge>
                            ))}
                            {row.labels.length > 3 && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button className="flex items-center gap-1 text-[10px] text-blue-600 underline hover:text-blue-800 font-normal">
                                    <span>{row.labels.length - 3} more</span>
                                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M10.0551 0.747876C10.0235 0.671739 9.9701 0.606659 9.90153 0.560864C9.83296 0.51507 9.75234 0.490618 9.66986 0.490601H1.32946C1.24693 0.490536 1.16624 0.514936 1.0976 0.560713C1.02896 0.606489 0.975462 0.671583 0.943872 0.747754C0.912281 0.823926 0.904022 0.907749 0.92014 0.988613C0.936258 1.06948 0.976029 1.14374 1.03442 1.20201L5.20462 5.36841C5.24335 5.40714 5.28934 5.43788 5.33997 5.45884C5.39059 5.47981 5.44486 5.4906 5.49966 5.4906C5.55446 5.4906 5.60873 5.47981 5.65935 5.45884C5.70998 5.43788 5.75597 5.40714 5.7947 5.36841L9.9649 1.20201C10.0232 1.14371 10.0629 1.06945 10.0789 0.988611C10.095 0.907774 10.0867 0.823997 10.0551 0.747876Z" fill="currentColor" />
                                    </svg>
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 max-h-60 overflow-auto p-3 bg-white border shadow-lg rounded-xl" align="start">
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium text-muted-foreground pb-2 border-b border-gray-200">
                                      # Labels
                                    </div>
                                    {row.labels.map((label, index) => (
                                      <div key={index} className="flex items-center text-sm text-foreground py-1">
                                        <span className="text-gray-500 mr-3 w-4">{index + 1}</span>
                                        <span>{label}</span>
                                      </div>
                                    ))}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground opacity-60")}>
                    <div className="flex items-center justify-center gap-1">
                      {processingStates[row.id]?.isProcessing ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <>
                          <span>{row.avgPosition.current}</span>
                          <div className="flex items-center gap-1">
                            {row.avgPosition.change > 0 ? (
                              <ArrowUp className="h-3 w-3 text-green-600" />
                            ) : (
                              <ArrowDown className="h-3 w-3 text-red-600" />
                            )}
                            <span className={cn(
                              "text-xs",
                              row.avgPosition.change > 0 ? "text-green-600" : "text-red-600"
                            )}>
                              {row.avgPosition.change > 0 ? '+' : ''}{row.avgPosition.change}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground opacity-60")}>
                    <div className="flex items-center justify-center">
                      {processingStates[row.id]?.isProcessing ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <span>{row.improvedKW.current}/{row.improvedKW.total}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {processingStates[row.id]?.isProcessing ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <OPDChart opd={row.opd} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn(row.status === "Paused" && "text-muted-foreground text-center opacity-60")}>
                    <div className="flex items-center justify-center h-full w-full">
                      <ScheduleCell schedule={row.schedule} status={row.status} rowId={row.id} />
                    </div>
                  </TableCell>
                  <TableCell className="w-48 relative font-normal"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => {
                      if (openDropdownRow !== row.id) {
                        setHoveredRow(null);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full h-full">
                      {(hoveredRow === row.id || openDropdownRow === row.id) ? (
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
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-[#6B7280] hover:bg-[#E3E4E9] hover:text-[#1E1F20]"
                                onClick={() => handleRefreshClick(row.id)}
                              >
                                {/* <RotateCcw className="h-4 w-4" /> */}
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_7672_122017)">
                                    <path d="M14.375 8.1156H18.125V4.3656" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.7183 14.9906C13.7355 15.918 12.5013 16.5352 11.1697 16.7651C9.83816 16.995 8.46838 16.8274 7.23153 16.2832C5.99468 15.7391 4.9456 14.8426 4.21537 13.7056C3.48513 12.5687 3.10614 11.2417 3.12572 9.89064C3.14531 8.53953 3.56262 7.22415 4.3255 6.10885C5.08838 4.99355 6.16301 4.12779 7.41512 3.61974C8.66723 3.11169 10.0413 2.98389 11.3656 3.25229C12.6899 3.5207 13.9058 4.17341 14.8613 5.12888L18.1246 8.1156" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_7672_122017">
                                      <rect width="20" height="20" fill="white" transform="translate(0 -0.00939941)" />
                                    </clipPath>
                                  </defs>
                                </svg>

                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[240px] font-normal">
                              <span>Refresh</span>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#6B7280] hover:bg-[#E3E4E9] hover:text-[#1E1F20]">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[240px] font-normal">
                              <span>Share</span>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-[#6B7280] hover:bg-[#E3E4E9] hover:text-[#1E1F20]"
                                onClick={handleEditAction}
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_7672_122030)">
                                    <path d="M7.5 16.8656H3.75C3.58424 16.8656 3.42527 16.7997 3.30806 16.6825C3.19085 16.5653 3.125 16.4064 3.125 16.2406V12.7492C3.12508 12.5836 3.19082 12.4249 3.30781 12.3078L12.9422 2.67341C13.0594 2.55629 13.2183 2.49049 13.384 2.49049C13.5497 2.49049 13.7086 2.55629 13.8258 2.67341L17.3172 6.16247C17.4343 6.27967 17.5001 6.43858 17.5001 6.60427C17.5001 6.76996 17.4343 6.92886 17.3172 7.04606L7.5 16.8656Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.875 16.8656H7.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.625 4.9906L15 9.3656" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_7672_122030">
                                      <rect width="20" height="20" fill="white" transform="translate(0 -0.00939941)" />
                                    </clipPath>
                                  </defs>
                                </svg>

                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[240px] font-normal">
                              <span>Edit</span>
                            </TooltipContent>
                          </Tooltip>

                          <DropdownMenu onOpenChange={(open) => setOpenDropdownRow(open ? row.id : null)}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#6B7280] hover:bg-[#E3E4E9] hover:text-[#1E1F20]">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[240px] font-normal">
                                <span>More option</span>
                              </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent className="w-48 bg-white border shadow-lg z-[100]" align="end">
                              <DropdownMenuItem
                                onClick={() => handleExportAction('PDF')}
                                className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                              >
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
                              <DropdownMenuItem
                                onClick={() => handleExportAction('CSV')}
                                className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                              >
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
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteAction(row.id)}
                                className="flex items-center gap-2 hover:bg-accent cursor-pointer text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        <>
                          {processingStates[row.id]?.isProcessing ? (
                            <div className="flex flex-col items-center justify-center w-full">
                              <Badge className="bg-orange-50 text-[#A96C08] border-orange-200 text-xs px-3 py-1 rounded-md">
                                Processing
                              </Badge>
                              {processingStates[row.id]?.hasScannedBefore && (
                                <span className="text-xs text-gray-500 mt-1">October 5, 2024  3:20 PM</span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-between w-full ">
                              <div className="flex items-center w-full justify-center gap-2 font-normal">

                                <span className="text-sm text-foreground font-normal">{row.lastUpdated}</span>

                              </div>
                              <div className="flex items-center gap-1 absolute bottom-2 right-2">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clip-path="url(#clip0_7531_127864)">
                                    <path d="M7.5 9.3656C10.9518 9.3656 13.75 8.1064 13.75 6.5531C13.75 4.9998 10.9518 3.7406 7.5 3.7406C4.04822 3.7406 1.25 4.9998 1.25 6.5531C1.25 8.1064 4.04822 9.3656 7.5 9.3656Z" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.25 6.5531V9.6781C1.25 11.2312 4.04844 12.4906 7.5 12.4906C10.9516 12.4906 13.75 11.2312 13.75 9.6781V6.5531" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.7496 7.54684C16.6027 7.80778 18.7496 8.94216 18.7496 10.3031C18.7496 11.8562 15.9512 13.1156 12.4996 13.1156C10.9684 13.1156 9.56523 12.8679 8.47852 12.4562" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.25 12.4344V13.4281C6.25 14.9812 9.04844 16.2406 12.5 16.2406C15.9516 16.2406 18.75 14.9812 18.75 13.4281V10.3031" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_7531_127864">
                                      <rect width="20" height="20" fill="white" transform="translate(0 -0.00939941)" />
                                    </clipPath>
                                  </defs>
                                </svg>

                                <span className="text-xs text-gray-600">133</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className={table.pagination}>
          <span>Page</span>
          <select className={table.paginationSelect}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <span>of 3</span>
          <select className={cn(table.paginationSelect, "ml-4")}>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        {/* Modals */}
        <DeleteScanModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />

        <EditScanModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onDeleteProject={handleDeleteProject}
        />

        <DeleteProjectModal
          open={deleteProjectModalOpen}
          onClose={() => setDeleteProjectModalOpen(false)}
          onConfirm={confirmDeleteProject}
        />

        <ProcessingModal
          open={processingModalOpen}
          onClose={() => setProcessingModalOpen(false)}
          title="Processing export..."
        />

        <ConfirmRescanModal
          open={confirmRescanModalOpen}
          onClose={() => setConfirmRescanModalOpen(false)}
          onConfirm={handleConfirmRefresh}
        />
      </div>
    </TooltipProvider>
  );
};

export default KeywordsTable;