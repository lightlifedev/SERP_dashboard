import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddKeywordModal from "@/components/modals/AddKeywordModal";
import { useToast } from "@/hooks/use-toast";
import { mockDashboardKeywords, mockChartData, mockSERPData } from "@/mockup/dashboard-keywords";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  Plus,
  Info,
  MapPin,
  Check,
  X,
  ChevronUp,
  CheckIcon
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import trendingDown from "@/assets/trending_down.png";
import trendingUp from "@/assets/trending_up.png";

interface KeywordsTableProps {
  compareMode?: boolean;
  domainData?: {
    id: number;
    domain: string;
    labels: string[];
    status: string;
    lastUpdated: string;
  } | null;
}

const KeywordsTable = ({ compareMode = false, domainData }: KeywordsTableProps) => {
  const { toast } = useToast();
  const [isAddKeywordOpen, setIsAddKeywordOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const keywordData = mockDashboardKeywords;

  const handleRowSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(keywordData.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRowExpansion = (id: string) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleAddKeywords = (keywords: string) => {
    console.log("Adding keywords:", keywords);
    // Handle keywords logic here
  };

  const AIOverviewTooltip = () => (
    <div className="bg-white p-3 max-w-xs">
      <div className="space-y-6 flex flex-col justify-center items-start">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">Appears in AI:</span>
          <div className="w-4 h-4 border-green-500 border-[2px] rounded-full">
            <CheckIcon className="w-full h-full text-green-500" />
          </div>
        </div>
        <div className="text-sm text-foreground">AI model: ChatGPT</div>
        <div className="text-sm text-foreground flex flex-col items-start gap-2">
          AI Overview snippet:
          <span className="text-sm text-foreground pl-1 font-normal text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...
          </span>
        </div>
      </div>
    </div>
  );

  const AveragePositionTooltip = () => (
    <div className="bg-white p-3 max-w-xs text-left">
      <div className="font-normal text-start">
        <span className="font-semibold">Average Position</span><br/><br/>
        <span className="font-semibold">Best</span> - your best average Google Maps<br/>
        rank within the selected date range<br/><br/>
        <span className="font-semibold">Difference</span> - measures the change in<br/>
        average rank over the selected time period
      </div>
    </div>
  );

  const GooglePackTooltip = () => (
    <div className="bg-white px-2 py-1">
      <span className="text-sm">Google 3-Pack</span>
    </div>
  );

  const ChartTooltip = ({ x, y }: { x: number; y: number }) => (
    <div
      className="absolute bg-white border rounded px-2 py-1 text-sm shadow-lg z-10"
      style={{ left: x, top: y }}
    >
      Nov 15, 2024<br />
      rank: 67
    </div>
  );

  const DetailedAnalysis = ({ rowId }: { rowId: string }) => (
    <TableRow>
      <TableCell colSpan={compareMode ? 13 : 8} className="p-0">
        <div className="p-6 border-t w-full bg-blue-50">
          {/* Recent Check Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-8">Recent Check Details</h3>
            <div className="flex items-center text-md justify-between gap-4 mb-4">
              <div className="flex flex-col items-start justify-center gap-2 text-sm text-gray-600">
                <span className="mb-2">Date</span>
                <span className="flex gap-2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_7426_117354)">
                      <path d="M16.25 3.625H3.75C3.40482 3.625 3.125 3.90482 3.125 4.25V16.75C3.125 17.0952 3.40482 17.375 3.75 17.375H16.25C16.5952 17.375 16.875 17.0952 16.875 16.75V4.25C16.875 3.90482 16.5952 3.625 16.25 3.625Z" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M13.75 2.375V4.875" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M6.25 2.375V4.875" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M3.125 7.375H16.875" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10 11.75C10.5178 11.75 10.9375 11.3303 10.9375 10.8125C10.9375 10.2947 10.5178 9.875 10 9.875C9.48223 9.875 9.0625 10.2947 9.0625 10.8125C9.0625 11.3303 9.48223 11.75 10 11.75Z" fill="#6B7280" />
                      <path d="M13.4375 11.75C13.9553 11.75 14.375 11.3303 14.375 10.8125C14.375 10.2947 13.9553 9.875 13.4375 9.875C12.9197 9.875 12.5 10.2947 12.5 10.8125C12.5 11.3303 12.9197 11.75 13.4375 11.75Z" fill="#6B7280" />
                      <path d="M6.5625 14.875C7.08027 14.875 7.5 14.4553 7.5 13.9375C7.5 13.4197 7.08027 13 6.5625 13C6.04473 13 5.625 13.4197 5.625 13.9375C5.625 14.4553 6.04473 14.875 6.5625 14.875Z" fill="#6B7280" />
                      <path d="M10 14.875C10.5178 14.875 10.9375 14.4553 10.9375 13.9375C10.9375 13.4197 10.5178 13 10 13C9.48223 13 9.0625 13.4197 9.0625 13.9375C9.0625 14.4553 9.48223 14.875 10 14.875Z" fill="#6B7280" />
                      <path d="M13.4375 14.875C13.9553 14.875 14.375 14.4553 14.375 13.9375C14.375 13.4197 13.9553 13 13.4375 13C12.9197 13 12.5 13.4197 12.5 13.9375C12.5 14.4553 12.9197 14.875 13.4375 14.875Z" fill="#6B7280" />
                    </g>
                    <defs>
                      <clipPath id="clip0_7426_117354">
                        <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  Feb 15, 2025 | 03:20 PM
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-2 text-sm mb-4">
                <span className="mb-2">URL</span>
                <span className="flex gap-2">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_7426_117374)">
                      <path d="M10 18C14.1421 18 17.5 14.6421 17.5 10.5C17.5 6.35786 14.1421 3 10 3C5.85786 3 2.5 6.35786 2.5 10.5C2.5 14.6421 5.85786 18 10 18Z" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M13.125 10.5C13.125 15.5 10 18 10 18C10 18 6.875 15.5 6.875 10.5C6.875 5.5 10 3 10 3C10 3 13.125 5.5 13.125 10.5Z" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M2.92578 8H17.0727" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M2.92578 13H17.0727" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_7426_117374">
                        <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-sky-600 underline">publicserviceplumbers.com/plumbing</span>
                </span>
              </div>
              <div className="text-sm flex flex-col justify-center items-start">
                <span className="mb-2">Position</span>
                <span className="font-normal"> 9</span>
              </div>
              <Button variant="outline" size="sm" className="text-sm font-normal bg-[#DDE8F7] border-[#6999DC] border-[1px] hover:bg-[#B9CFEF] text-[#1E1F20]">
                View SERP →
              </Button>
            </div>
          </div>

          {/* Keyword Position Chart */}
          <div className="mb-10">

            <div className="bg-white border rounded-lg p-4 h-96 relative">
              <h4 className="text-md font-medium mb-4">Keyword Position</h4>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart
                  data={mockChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis
                    dataKey="date"
                    axisLine={true}
                    tickLine={compareMode ? false: true}
                    tick={{ fontSize: compareMode ? 0 : 12, fill: '#9ca3af', textAnchor: 'middle' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={[1, 80]}
                    reversed={true}
                    axisLine={true}
                    tickLine={true}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    tickFormatter={(value) => value.toString()}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg flex flex-col gap-4">
                          <div className="flex gap-4">
                            <p className="text-sm font-medium">{data.label}</p>
                            <p className="text-sm text-blue-600">rank: {payload[0].value}</p>
                          </div>
                          {compareMode && (
                            <div className="flex gap-4">
                              <p className="text-sm font-medium">{data.label}</p>
                              <p className="text-sm text-blue-600">rank: {payload[0].value}</p>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  {compareMode ? (
                    <>
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#3b82f6' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#94a3b8' }}
                      />
                    </>
                  ) : (
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
              <div className="absolute bottom-4 left-4 text-xs text-gray-500 w-full flex justify-center">
                {compareMode ? (
                  <>
                    <span className="mr-4">Nov 1 - Dec 1, 2024</span>
                    <span>vs</span>
                    <span className="ml-4">Jan 1 - Feb 1, 2025</span>
                  </>
                ) : (
                  <span>Nov 1 - Dec 1, 2024</span>
                )}
              </div>
            </div>
          </div>

          {/* Top 10 SERPs */}
          <div>
            <h4 className="text-md font-medium mb-4 h-8 border-b-2 w-3/4">Top 10 SERP's</h4>
            <div className="space-y-2">
              {mockSERPData.urls.map((url, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500 w-6">{index + 1}.</span>
                  <a href="#" className="text-blue-500 hover:underline flex-1">
                    {url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <TooltipProvider>
      <AddKeywordModal 
        open={isAddKeywordOpen}
        onClose={() => setIsAddKeywordOpen(false)}
        onConfirm={handleAddKeywords}
      />
      <div className="mt-8">
        <div className="flex justify-between bg-white p-4">
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Actions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white z-[100]">
              <DropdownMenuItem onClick={() => toast({title: "Refreshing...", description: "Data is being refreshed."})}>Rerun</DropdownMenuItem>
              <DropdownMenuItem onClick={async () => {
                try {
                  const { exportToPDF } = await import("@/lib/exportUtils");
                  await exportToPDF();
                  toast({title: "PDF exported!", description: "Your PDF export has been generated successfully."});
                } catch (err) {
                  toast({title: "Export failed", description: "Could not generate PDF export.", variant: "destructive"});
                }
              }}>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={async () => {
                try {
                  const { exportToCSV } = await import("@/lib/exportUtils");
                  await exportToCSV();
                  toast({title: "CSV exported!", description: "Your CSV export has been generated successfully."});
                } catch (err) {
                  toast({title: "Export failed", description: "Could not generate CSV export.", variant: "destructive"});
                }
              }}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Keyword Button */}
          <Button 
            onClick={() => setIsAddKeywordOpen(true)}
            className="gap-2 bg-[#DDE8F7] border-[#6999DC] border-[1.1px] text-foreground hover:bg-[#DDE8F7CC] hover:text-sky-800"
          >
            <Plus className="h-4 w-4" />
            Add keyword
          </Button>
        </div>

        {/* Keywords Table */}
        <div className="rounded-lg" style={{ border: '1.3px solid #d1d5db' }} data-compare-mode={compareMode.toString()}>
          <Table className="rounded-lg overflow-hidden">
            <TableHeader className="bg-[#D6E8FF]">
              {/* First header row */}
              <TableRow className="hover:bg-inherit">
                <TableHead className="w-12" rowSpan={2}>
                  <Checkbox
                    checked={selectedRows.length === keywordData.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead rowSpan={2} className="text-black font-medium">Keyword ({selectedRows.length})</TableHead>
                <TableHead rowSpan={2} className="text-black font-medium"><div className="flex items-center justify-start">Found in URL</div></TableHead>
                <TableHead colSpan={5} className="text-center text-black font-medium">
                  <div className="flex items-center justify-center gap-1">
                    Average Position
                    <UITooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent align="start">
                        <AveragePositionTooltip />
                      </TooltipContent>
                    </UITooltip>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">(Nov 1 - Dec 1, 2024)</div>
                </TableHead>
                {compareMode && (
                  <TableHead colSpan={5} className="text-center text-black font-medium">
                    <div className="flex items-center justify-center gap-1">
                      Average Position
                      <UITooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent align="start">
                          <AveragePositionTooltip />
                        </TooltipContent>
                      </UITooltip>
                    </div>
                     <div className="text-xs text-gray-500 mt-1">(Jan 1 - Feb 1, 2025)</div>
                   </TableHead>
                 )}
                
              </TableRow>

              {/* Second header row */}
              <TableRow className="hover:bg-inherit">
                <TableHead className="text-center">
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="text-xs">Best</span>
                    </TooltipTrigger>
                      <TooltipContent align="start">
                        <div className="text-[13px] max-w-[168px] font-normal text-left">Best average position in selected date range — lower is better.</div>
                      </TooltipContent>
                  </UITooltip>
                </TableHead>
                <TableHead className="text-center">
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="text-xs">Nov 1</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-[13px] max-w-[168px] font-normal">Start date</div>
                    </TooltipContent>
                  </UITooltip>
                </TableHead>
                <TableHead className="text-center">
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="text-xs">Dec 1</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-[13px] max-w-[168px] font-normal">End date</div>
                    </TooltipContent>
                  </UITooltip>
                </TableHead>
                <TableHead className="text-center">
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="text-xs">Diff</span>
                    </TooltipTrigger>
                      <TooltipContent align="start">
                        <div className="text-[13px] max-w-[168px] font-normal text-left">Difference of average positions from start to end of date range.</div>
                      </TooltipContent>
                  </UITooltip>
                </TableHead>
                <TableHead className="text-center">
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="text-xs flex items-center mt-1">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_7426_117013)">
                            <path d="M11.4238 15C12.9863 14.7367 14.284 13.4375 14.5488 11.875" stroke="#FF5C00" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path opacity="0.2" d="M9.54883 7.5L11.6012 1.875C13.2879 3.275 17.0488 6.88672 17.0488 11.25C17.0488 12.9076 16.3903 14.4973 15.2182 15.6694C14.0461 16.8415 12.4564 17.5 10.7988 17.5C9.14122 17.5 7.55151 16.8415 6.37941 15.6694C5.20731 14.4973 4.54883 12.9076 4.54883 11.25C4.54883 8.86172 5.67539 6.69844 6.9707 5L9.54883 7.5Z" fill="#FF5C00" />
                            <path d="M9.54883 7.5L11.6012 1.875C13.2879 3.275 17.0488 6.88672 17.0488 11.25C17.0488 12.9076 16.3903 14.4973 15.2182 15.6694C14.0461 16.8415 12.4564 17.5 10.7988 17.5C9.14123 17.5 7.55151 16.8415 6.37941 15.6694C5.20731 14.4973 4.54883 12.9076 4.54883 11.25C4.54883 8.86172 5.67539 6.69844 6.9707 5L9.54883 7.5Z" stroke="#FF5C00" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                          <defs>
                            <clipPath id="clip0_7426_117013">
                              <rect width="20" height="20" fill="white" transform="translate(0.798828)" />
                            </clipPath>
                          </defs>
                        </svg>

                        A.I.
                      </span>
                    </TooltipTrigger>
                      <TooltipContent align="start">
                        <AIOverviewTooltip />
                      </TooltipContent>
                  </UITooltip>
                </TableHead>
                {compareMode && (<>
                  <TableHead className="text-center">
                    <UITooltip>
                      <TooltipTrigger>
                        <span className="text-xs">Best</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-[13px] max-w-[168px] font-normal text-left">Best average position in selected date range — lower is better.</div>
                      </TooltipContent>
                    </UITooltip>
                  </TableHead>
                  <TableHead className="text-center">
                    <UITooltip>
                      <TooltipTrigger>
                        <span className="text-xs">Jan 1</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-[13px] max-w-[168px] font-normal">Start date</div>
                      </TooltipContent>
                    </UITooltip>
                  </TableHead>
                  <TableHead className="text-center">
                    <UITooltip>
                      <TooltipTrigger>
                        <span className="text-xs">Feb 1</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-[13px] max-w-[168px] font-normal">End date</div>
                      </TooltipContent>
                    </UITooltip>
                  </TableHead>
                  <TableHead className="text-center">
                    <UITooltip>
                      <TooltipTrigger>
                        <span className="text-xs">Diff</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-[13px] max-w-[168px] font-normal text-left">Difference of average positions from start to end of date range.</div>
                      </TooltipContent>
                    </UITooltip>
                  </TableHead>
                  <TableHead className="text-center">
                    <UITooltip>
                      <TooltipTrigger>
                        <span className="text-xs flex items-center mt-1">
                          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_7426_117013)">
                              <path d="M11.4238 15C12.9863 14.7367 14.284 13.4375 14.5488 11.875" stroke="#FF5C00" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                              <path opacity="0.2" d="M9.54883 7.5L11.6012 1.875C13.2879 3.275 17.0488 6.88672 17.0488 11.25C17.0488 12.9076 16.3903 14.4973 15.2182 15.6694C14.0461 16.8415 12.4564 17.5 10.7988 17.5C9.14122 17.5 7.55151 16.8415 6.37941 15.6694C5.20731 14.4973 4.54883 12.9076 4.54883 11.25C4.54883 8.86172 5.67539 6.69844 6.9707 5L9.54883 7.5Z" fill="#FF5C00" />
                              <path d="M9.54883 7.5L11.6012 1.875C13.2879 3.275 17.0488 6.88672 17.0488 11.25C17.0488 12.9076 16.3903 14.4973 15.2182 15.6694C14.0461 16.8415 12.4564 17.5 10.7988 17.5C9.14123 17.5 7.55151 16.8415 6.37941 15.6694C5.20731 14.4973 4.54883 12.9076 4.54883 11.25C4.54883 8.86172 5.67539 6.69844 6.9707 5L9.54883 7.5Z" stroke="#FF5C00" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                              <clipPath id="clip0_7426_117013">
                                <rect width="20" height="20" fill="white" transform="translate(0.798828)" />
                              </clipPath>
                            </defs>
                          </svg>

                          A.I.
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <AIOverviewTooltip />
                      </TooltipContent>
                    </UITooltip>
                  </TableHead>
                </>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordData.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow className={selectedRows.includes(row.id) || expandedRows.includes(row.id) ? "bg-sky-50 h-16" : "h-16"}>
                    <TableCell className="w-12">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={(checked) => handleRowSelect(row.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium w-1/6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRowExpansion(row.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedRows.includes(row.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                        {row.keyword}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a href="#" className="text-blue-500 hover:underline">
                        {row.url}
                      </a>
                    </TableCell>

                    {/* First Average Position Group */}
                    <TableCell className="text-center">{row.bestPosition1}</TableCell>
                    <TableCell className="text-center">{row.nov1Position}</TableCell>
                    <TableCell className="text-center">
                      <UITooltip>
                        <TooltipTrigger>
                          <div className="flex items-center justify-center gap-1">
                            <span>{row.dec1Position}</span>
                            <MapPin className="h-3 w-3 text-red-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <GooglePackTooltip />
                        </TooltipContent>
                      </UITooltip>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span>{row.diff1}</span>
                        {row.diffTrend1 === "up" ? (
                          <img src={trendingUp} className="h-[6px] w-[10px]" />
                        ) : (
                          <img src={trendingDown} className="h-[6px] w-[10px]" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {row.aiStatus1 === "in" ? (
                        <UITooltip>
                          <TooltipTrigger>
                            <div className="h-4 w-4 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white mx-auto" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">In AI Overview</div>
                          </TooltipContent>
                        </UITooltip>
                      ) : (
                        <UITooltip>
                          <TooltipTrigger>
                            <div className="h-4 w-4 mx-auto bg-red-500 rounded-full flex items-center justify-center">
                              <X className="h-3 w-3 text-white mx-auto" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">Not in AI Overview</div>
                          </TooltipContent>
                        </UITooltip>
                      )}
                    </TableCell>

                    {/* Second Average Position Group - Only show in compare mode */}
                    {compareMode && (
                      <>
                        <TableCell className="text-center">{row.bestPosition2}</TableCell>
                        <TableCell className="text-center">{row.jan1Position}</TableCell>
                        <TableCell className="text-center">
                          <UITooltip>
                            <TooltipTrigger>
                              <div className="flex items-center justify-center gap-1">
                                <span>{row.feb1Position}</span>
                                <MapPin className="h-3 w-3 text-red-400" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <GooglePackTooltip />
                            </TooltipContent>
                          </UITooltip>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{row.diff2}</span>
                            {row.diffTrend2 === "up" ? (
                              <img src={trendingUp} className="h-[6px] w-[10px]" />
                            ) : (
                              <img src={trendingDown} className="h-[6px] w-[10px]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {row.aiStatus2 === "in" ? (
                            <UITooltip>
                              <TooltipTrigger>
                                <div className="h-4 w-4 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white mx-auto" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-sm">In AI Overview</div>
                              </TooltipContent>
                            </UITooltip>
                          ) : (
                            <UITooltip>
                              <TooltipTrigger>
                                <X className="h-4 w-4 text-red-500 mx-auto" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-sm">Not in AI Overview</div>
                              </TooltipContent>
                            </UITooltip>
                          )}
                        </TableCell>
                      </>
                    )}
                  </TableRow>

                  {/* Expanded details row */}
                  {expandedRows.includes(row.id) && <DetailedAnalysis rowId={row.id} />}
                </React.Fragment>
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