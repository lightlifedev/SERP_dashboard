import React, { useState } from "react";
import { Search, CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const KEYWORDS = [
  "AZ plumber contractor",
  "faucet repair",
  "plumbing Arizona",
  "plumbers",
  "emergency plumber",
  "water heater repair",
  "drain cleaning",
  "pipe repair",
  "bathroom plumbing",
  "kitchen plumbing",
  "sewer line repair",
  "water leak detection",
  "toilet repair",
  "garbage disposal",
  "water softener",
  "tankless water heater",
  "Phoenix plumber",
  "Scottsdale plumber",
  "Mesa plumber",
  "Tempe plumber"
];

interface SearchFiltersProps {
  onCompareChange?: (compare: boolean) => void;
}

const SearchFilters = ({ onCompareChange }: SearchFiltersProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState([
    "AZ plumber contractor",
    "faucet repair",
    "plumbing Arizona",
    "plumbers"
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 10, 1), // Nov 1, 2024
    to: new Date(2025, 1, 1) // Feb 1, 2025
  });
  const [timePeriod, setTimePeriod] = useState("1 month");
  const [compare, setCompare] = useState(false);
  const [dateRange2, setDateRange2] = useState({
    from: new Date(2025, 0, 1), // Jan 1, 2025
    to: new Date(2025, 1, 1) // Feb 1, 2025
  });

  const handleKeywordToggle = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearAllKeywords = () => {
    setSelectedKeywords([]);
  };

  const displayedKeywords = showAllKeywords ? selectedKeywords : selectedKeywords.slice(0, 4);
  const hiddenCount = selectedKeywords.length - displayedKeywords.length;

  return (
    <div className="bg-white mb-6">
      <div className="flex gap-1 w-full">
        {/* First Part - Search and Keywords */}
        <div className="flex-1 space-y-3">
          {/* Search input and Keywords dropdown */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search here"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  Keywords ({selectedKeywords.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-white border shadow-lg z-50 p-2">
                <div className="p-3 ">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search here..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 bg-white border-gray-300"
                    />
                  </div>
                </div>
                <div className="p-3 ">
                  <div className="flex justify-between">
                    <button 
                      className="text-sm text-blue-500 hover:text-blue-700 font-medium underline"
                      onClick={() => setSelectedKeywords(KEYWORDS.filter(keyword => 
                        keyword.toLowerCase().includes(searchValue.toLowerCase())
                      ))}
                    >
                      Select all
                    </button>
                    <button 
                      className="text-sm text-blue-500 hover:text-blue-700 font-medium underline"
                      onClick={() => setSelectedKeywords([])}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {/* Selected keywords first */}
                  {selectedKeywords
                    .filter(keyword => keyword.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((keyword) => (
                      <div
                        key={keyword}
                        onClick={() => handleKeywordToggle(keyword)}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
                      >
                        <Checkbox
                          checked={true}
                          className="h-4 w-4"
                        />
                        <span className="text-sm flex-1">{keyword}</span>
                      </div>
                    ))}
                  
                  {/* Separator if there are selected keywords and unselected keywords */}
                  {selectedKeywords.filter(keyword => keyword.toLowerCase().includes(searchValue.toLowerCase())).length > 0 && 
                   KEYWORDS.filter(keyword => 
                     !selectedKeywords.includes(keyword) && 
                     keyword.toLowerCase().includes(searchValue.toLowerCase())
                   ).length > 0 && (
                    <div className="border-t border-gray-200 my-2"></div>
                  )}
                  
                  {/* Unselected keywords */}
                  {KEYWORDS
                    .filter(keyword => 
                      !selectedKeywords.includes(keyword) && 
                      keyword.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((keyword) => (
                      <div
                        key={keyword}
                        onClick={() => handleKeywordToggle(keyword)}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
                      >
                        <Checkbox
                          checked={false}
                          className="h-4 w-4"
                        />
                        <span className="text-sm flex-1">{keyword}</span>
                      </div>
                    ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Selected keywords display */}
          <div className="flex items-center gap-2 flex-wrap">
            {displayedKeywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="text-xs bg-[#E9F0FA] text-gray-700 border border-gray-300 flex items-center gap-1 rounded-sm"
              >
                {keyword}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-gray-900"
                  onClick={() => handleKeywordToggle(keyword)}
                />
              </Badge>
            ))}
            {hiddenCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllKeywords(!showAllKeywords)}
                className="text-xs h-6 px-2 text-blue-600 hover:text-blue-800"
              >
                {showAllKeywords ? 'Show less' : `+${hiddenCount} more`}
              </Button>
            )}
            {selectedKeywords.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllKeywords}
                className="text-xs h-6 px-2 text-gray-600 hover:text-gray-800"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Second Part - Date Range and Options */}
        <div className="flex-1 flex items-center justify-end gap-3">
          {/* Date range display */}
          <div className="text-sm text-foreground">
            {compare ? (
              <>
                {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")} / {format(dateRange2.from, "MMM d")} - {format(dateRange2.to, "MMM d, yyyy")}
              </>
            ) : (
              <>
                {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
              </>
            )}
          </div>

          {/* Time period selector */}
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 month">1 month</SelectItem>
              <SelectItem value="1 quarter">1 quarter</SelectItem>
              <SelectItem value="1 year">1 year</SelectItem>
            </SelectContent>
          </Select>

          {/* Date picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-10 p-0">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              {compare ? (
                <div className="space-y-4 p-4 flex">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Date range 1</h4>
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to
                    }}
                    onSelect={(range) => {
                      if (range?.from) {
                        if (range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        } else {
                          setDateRange({ from: range.from, to: range.from });
                        }
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Date range 2</h4>
                    <Calendar
                      mode="range"
                      selected={{
                        from: dateRange2.from,
                        to: dateRange2.to
                      }}
                    onSelect={(range) => {
                      if (range?.from) {
                        if (range?.to) {
                          setDateRange2({ from: range.from, to: range.to });
                        } else {
                          setDateRange2({ from: range.from, to: range.from });
                        }
                      }
                    }}
                      className="pointer-events-auto"
                    />
                  </div>
                </div>
              ) : (
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to
                  }}
                  onSelect={(range) => {
                    if (range?.from) {
                      if (range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      } else {
                        setDateRange({ from: range.from, to: range.from });
                      }
                    }
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              )}
            </PopoverContent>
          </Popover>

          {/* Compare checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="compare"
              checked={compare}
              onCheckedChange={(checked) => {
                const newCompare = checked === true;
                setCompare(newCompare);
                onCompareChange?.(newCompare);
              }}
            />
            <label htmlFor="compare" className="text-sm text-foreground cursor-pointer">
              Compare
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;