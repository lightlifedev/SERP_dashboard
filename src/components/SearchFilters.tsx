import React, { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import RunBulkScansModal from "@/components/modals/RunBulkScansModal";
import ProcessingModal from "@/components/modals/ProcessingModal";
import LabelsModal from "@/components/modals/LabelsModal";
import RemoveLabelsModal from "@/components/modals/RemoveLabelsModal";
import { KEYWORDS, SCHEDULE_OPTIONS, TIME_PERIOD_OPTIONS } from "@/mockup/index-search-filter";

const SearchFilters = () => {
  const [selectedKeywords, setSelectedKeywords] = useState(KEYWORDS.slice(0, 2));
  const [searchValue, setSearchValue] = useState("");
  const [keywordSearchValue, setKeywordSearchValue] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState([SCHEDULE_OPTIONS[0].id]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(TIME_PERIOD_OPTIONS[0]);
  
  // Modal states
  const [isRunBulkScansModalOpen, setIsRunBulkScansModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false);
  const [isRemoveLabelsModalOpen, setIsRemoveLabelsModalOpen] = useState(false);
  const [processingTitle, setProcessingTitle] = useState("Processing scans...");

  const handleScheduleToggle = (optionId: string) => {
    if (optionId === "all") {
      setSelectedSchedule(["all"]);
    } else {
      setSelectedSchedule(prev => {
        const newSelection = prev.filter(id => id !== "all");
        if (newSelection.includes(optionId)) {
          const filtered = newSelection.filter(id => id !== optionId);
          return filtered.length === 0 ? ["all"] : filtered;
        } else {
          return [...newSelection, optionId];
        }
      });
    }
  };

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

  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(prev => prev.filter(k => k !== keyword));
  };

  const selectAllKeywords = () => {
    setSelectedKeywords(KEYWORDS);
  };

  const filteredKeywords = KEYWORDS.filter(keyword =>
    keyword.toLowerCase().includes(keywordSearchValue.toLowerCase())
  );

  const selectedCount = selectedKeywords.length;
  const checkedKeywords = filteredKeywords.filter(keyword => selectedKeywords.includes(keyword));
  const uncheckedKeywords = filteredKeywords.filter(keyword => !selectedKeywords.includes(keyword));

  return (
    <div className="bg-white pt-2 pb-4">
      <div className="flex items-center gap-4 w-full mb-4">
        {/* Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center font-normal gap-2">
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border shadow-lg z-50">
            <DropdownMenuItem 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => setIsRunBulkScansModalOpen(true)}
            >
              Rerun
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => {
                setProcessingTitle("Exporting PDF...");
                setIsProcessingModalOpen(true);
              }}
            >
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => {
                setProcessingTitle("Exporting CSV...");
                setIsProcessingModalOpen(true);
              }}
            >
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => setIsLabelsModalOpen(true)}
            >
              Add labels
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => setIsRemoveLabelsModalOpen(true)}
            >
              Remove labels
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Separator */}
        <div className="h-6 w-px bg-border" />

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search business or keyword"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full focus:border-[1.3px] focus:border-[#6999DC]"
          />
        </div>

        {/* Labels Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 font-poppins font-light">
              Labels {selectedCount > 0 && "(" + selectedCount + ")"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-white border shadow-lg" align="start">
            <div className="p-4 space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search here..."
                  value={keywordSearchValue}
                  onChange={(e) => setKeywordSearchValue(e.target.value)}
                  className="pl-10 focus:border-[1.3px] focus:border-[#6999DC]"
                />
              </div>

              {/* Select all and Clear buttons */}
              <div className="flex justify-between">
                <Button
                  variant="link"
                  size="sm"
                  onClick={selectAllKeywords}
                  className="text-primary hover:text-primary/80 p-0 h-auto underline"
                >
                  Select all
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={clearAllKeywords}
                  className="text-primary hover:text-primary/80 p-0 h-auto underline"
                >
                  Clear
                </Button>
              </div>

              {/* Checked Keywords */}
              {checkedKeywords.length > 0 && (
                <div className="space-y-1">
                  {checkedKeywords.map((keyword) => (
                    <div
                      key={keyword}
                      onClick={() => handleKeywordToggle(keyword)}
                      className="flex items-center gap-3 cursor-pointer hover:bg-accent/50 rounded-md p-2 transition-colors"
                    >
                      <Checkbox
                        checked={true}
                        className="h-4 w-4 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
                      />
                      <span className="text-sm flex-1 text-primary font-medium">
                        {keyword}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Separator if both checked and unchecked exist */}
              {checkedKeywords.length > 0 && uncheckedKeywords.length > 0 && (
                <div className="h-px bg-border" />
              )}

              {/* Unchecked Keywords */}
              {uncheckedKeywords.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {uncheckedKeywords.map((keyword) => (
                    <div
                      key={keyword}
                      onClick={() => handleKeywordToggle(keyword)}
                      className={cn(
                        "flex items-center gap-3 cursor-pointer rounded-md p-2 transition-colors",
                        keyword === "Main item (hover)"
                          ? "bg-accent/30 hover:bg-accent/50"
                          : "hover:bg-accent/30"
                      )}
                    >
                      <Checkbox
                        checked={false}
                        className="h-4 w-4 rounded border-2 border-border"
                      />
                      <span className="text-sm flex-1 text-foreground">
                        {keyword}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* All Schedule Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 font-poppins font-light">
              {selectedSchedule.includes("all") ? "All" : 
               selectedSchedule.length === 1 ? SCHEDULE_OPTIONS.find(opt => opt.id === selectedSchedule[0])?.label :
               `${selectedSchedule.length} selected`}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border shadow-lg z-50 rounded-xl p-3">
            <DropdownMenuItem
              onClick={() => handleScheduleToggle("all")}
              className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2"
            >
              <Checkbox
                checked={selectedSchedule.includes("all")}
                className="h-4 w-4 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className={cn(
                "text-sm",
                selectedSchedule.includes("all") ? "text-blue-600" : "text-foreground"
              )}>
                All
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleScheduleToggle("weekly")}
              className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2"
            >
              <Checkbox
                checked={selectedSchedule.includes("weekly")}
                className="h-4 w-4 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className={cn(
                "text-sm",
                selectedSchedule.includes("weekly") ? "text-blue-600" : "text-foreground"
              )}>
                Weekly
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleScheduleToggle("monthly")}
              className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2"
            >
              <Checkbox
                checked={selectedSchedule.includes("monthly")}
                className="h-4 w-4 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className={cn(
                "text-sm",
                selectedSchedule.includes("monthly") ? "text-blue-600" : "text-foreground"
              )}>
                Monthly
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleScheduleToggle("manually")}
              className="cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2"
            >
              <Checkbox
                checked={selectedSchedule.includes("manually")}
                className="h-4 w-4 rounded border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
              />
              <span className={cn(
                "text-sm",
                selectedSchedule.includes("manually") ? "text-blue-600" : "text-foreground"
              )}>
                Manually
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Time Period Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 font-poppins font-light">
              {selectedTimePeriod}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border shadow-lg">
            {TIME_PERIOD_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSelectedTimePeriod(option)}
                className={cn(
                  "cursor-pointer hover:bg-gray-100",
                )}
              >
                <span className={cn(
                  "text-sm",
                  selectedTimePeriod === option
                    ? "text-blue-600 hover:text-blue-700" : "text-foreground hover:text-black"
                  )}>
                  {option}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date String */}
        <div className="text-sm text-foreground whitespace-nowrap font-poppins font-light">
          July 4-18, 2024
        </div>
      </div>

      {/* Selected Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Schedule Badge Logic */}
        {!selectedSchedule.includes("all") && (
          <>
            {(selectedSchedule.includes("weekly") && selectedSchedule.includes("monthly")) && (
              <Badge
                variant="outline"
                className="px-3 py-1 bg-[#E9F0FA] text-foreground border-border-grey rounded-md font-normal flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7426_128661)">
                    <path d="M12.1875 2.33435H2.8125C2.55362 2.33435 2.34375 2.54422 2.34375 2.8031V12.1781C2.34375 12.437 2.55362 12.6469 2.8125 12.6469H12.1875C12.4464 12.6469 12.6562 12.437 12.6562 12.1781V2.8031C12.6562 2.54422 12.4464 2.33435 12.1875 2.33435Z" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.3125 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.6875 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.34375 5.14685H12.6562" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.4281C7.88833 8.4281 8.20312 8.1133 8.20312 7.72498C8.20312 7.33665 7.88833 7.02185 7.5 7.02185C7.11167 7.02185 6.79688 7.33665 6.79688 7.72498C6.79688 8.1133 7.11167 8.4281 7.5 8.4281Z" fill="#1E1F20" />
                    <path d="M10.0781 8.4281C10.4665 8.4281 10.7812 8.1133 10.7812 7.72498C10.7812 7.33665 10.4665 7.02185 10.0781 7.02185C9.6898 7.02185 9.375 7.33665 9.375 7.72498C9.375 8.1133 9.6898 8.4281 10.0781 8.4281Z" fill="#1E1F20" />
                    <path d="M4.92188 10.7719C5.3102 10.7719 5.625 10.4571 5.625 10.0687C5.625 9.6804 5.3102 9.3656 4.92188 9.3656C4.53355 9.3656 4.21875 9.6804 4.21875 10.0687C4.21875 10.4571 4.53355 10.7719 4.92188 10.7719Z" fill="#1E1F20" />
                    <path d="M7.5 10.7719C7.88833 10.7719 8.20312 10.4571 8.20312 10.0687C8.20312 9.6804 7.88833 9.3656 7.5 9.3656C7.11167 9.3656 6.79688 9.6804 6.79688 10.0687C6.79688 10.4571 7.11167 10.7719 7.5 10.7719Z" fill="#1E1F20" />
                    <path d="M10.0781 10.7719C10.4665 10.7719 10.7812 10.4571 10.7812 10.0687C10.7812 9.6804 10.4665 9.3656 10.0781 9.3656C9.6898 9.3656 9.375 9.6804 9.375 10.0687C9.375 10.4571 9.6898 10.7719 10.0781 10.7719Z" fill="#1E1F20" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7426_128661">
                      <rect width="15" height="15" fill="white" transform="translate(0 -0.00939941)" />
                    </clipPath>
                  </defs>
                </svg>
                Scheduled
                <X className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full" />
              </Badge>
            )}
            {selectedSchedule.includes("weekly") && !selectedSchedule.includes("monthly") && (
              <Badge
                variant="outline"
                className="px-3 py-1 bg-[#E9F0FA] text-foreground border-border-grey rounded-md font-normal flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7426_128661)">
                    <path d="M12.1875 2.33435H2.8125C2.55362 2.33435 2.34375 2.54422 2.34375 2.8031V12.1781C2.34375 12.437 2.55362 12.6469 2.8125 12.6469H12.1875C12.4464 12.6469 12.6562 12.437 12.6562 12.1781V2.8031C12.6562 2.54422 12.4464 2.33435 12.1875 2.33435Z" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.3125 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.6875 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.34375 5.14685H12.6562" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.4281C7.88833 8.4281 8.20312 8.1133 8.20312 7.72498C8.20312 7.33665 7.88833 7.02185 7.5 7.02185C7.11167 7.02185 6.79688 7.33665 6.79688 7.72498C6.79688 8.1133 7.11167 8.4281 7.5 8.4281Z" fill="#1E1F20" />
                    <path d="M10.0781 8.4281C10.4665 8.4281 10.7812 8.1133 10.7812 7.72498C10.7812 7.33665 10.4665 7.02185 10.0781 7.02185C9.6898 7.02185 9.375 7.33665 9.375 7.72498C9.375 8.1133 9.6898 8.4281 10.0781 8.4281Z" fill="#1E1F20" />
                    <path d="M4.92188 10.7719C5.3102 10.7719 5.625 10.4571 5.625 10.0687C5.625 9.6804 5.3102 9.3656 4.92188 9.3656C4.53355 9.3656 4.21875 9.6804 4.21875 10.0687C4.21875 10.4571 4.53355 10.7719 4.92188 10.7719Z" fill="#1E1F20" />
                    <path d="M7.5 10.7719C7.88833 10.7719 8.20312 10.4571 8.20312 10.0687C8.20312 9.6804 7.88833 9.3656 7.5 9.3656C7.11167 9.3656 6.79688 9.6804 6.79688 10.0687C6.79688 10.4571 7.11167 10.7719 7.5 10.7719Z" fill="#1E1F20" />
                    <path d="M10.0781 10.7719C10.4665 10.7719 10.7812 10.4571 10.7812 10.0687C10.7812 9.6804 10.4665 9.3656 10.0781 9.3656C9.6898 9.3656 9.375 9.6804 9.375 10.0687C9.375 10.4571 9.6898 10.7719 10.0781 10.7719Z" fill="#1E1F20" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7426_128661">
                      <rect width="15" height="15" fill="white" transform="translate(0 -0.00939941)" />
                    </clipPath>
                  </defs>
                </svg>
                Weekly
                <X className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full" />
              </Badge>
            )}
            {selectedSchedule.includes("monthly") && !selectedSchedule.includes("weekly") && (
              <Badge
                variant="outline"
                className="px-3 py-1 bg-[#E9F0FA] text-foreground border-border-grey rounded-md font-normal flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7426_128661)">
                    <path d="M12.1875 2.33435H2.8125C2.55362 2.33435 2.34375 2.54422 2.34375 2.8031V12.1781C2.34375 12.437 2.55362 12.6469 2.8125 12.6469H12.1875C12.4464 12.6469 12.6562 12.437 12.6562 12.1781V2.8031C12.6562 2.54422 12.4464 2.33435 12.1875 2.33435Z" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.3125 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.6875 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.34375 5.14685H12.6562" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.4281C7.88833 8.4281 8.20312 8.1133 8.20312 7.72498C8.20312 7.33665 7.88833 7.02185 7.5 7.02185C7.11167 7.02185 6.79688 7.33665 6.79688 7.72498C6.79688 8.1133 7.11167 8.4281 7.5 8.4281Z" fill="#1E1F20" />
                    <path d="M10.0781 8.4281C10.4665 8.4281 10.7812 8.1133 10.7812 7.72498C10.7812 7.33665 10.4665 7.02185 10.0781 7.02185C9.6898 7.02185 9.375 7.33665 9.375 7.72498C9.375 8.1133 9.6898 8.4281 10.0781 8.4281Z" fill="#1E1F20" />
                    <path d="M4.92188 10.7719C5.3102 10.7719 5.625 10.4571 5.625 10.0687C5.625 9.6804 5.3102 9.3656 4.92188 9.3656C4.53355 9.3656 4.21875 9.6804 4.21875 10.0687C4.21875 10.4571 4.53355 10.7719 4.92188 10.7719Z" fill="#1E1F20" />
                    <path d="M7.5 10.7719C7.88833 10.7719 8.20312 10.4571 8.20312 10.0687C8.20312 9.6804 7.88833 9.3656 7.5 9.3656C7.11167 9.3656 6.79688 9.6804 6.79688 10.0687C6.79688 10.4571 7.11167 10.7719 7.5 10.7719Z" fill="#1E1F20" />
                    <path d="M10.0781 10.7719C10.4665 10.7719 10.7812 10.4571 10.7812 10.0687C10.7812 9.6804 10.4665 9.3656 10.0781 9.3656C9.6898 9.3656 9.375 9.6804 9.375 10.0687C9.375 10.4571 9.6898 10.7719 10.0781 10.7719Z" fill="#1E1F20" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7426_128661">
                      <rect width="15" height="15" fill="white" transform="translate(0 -0.00939941)" />
                    </clipPath>
                  </defs>
                </svg>
                Monthly
                <X className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full" />
              </Badge>
            )}
            {selectedSchedule.includes("manually") && (
              <Badge
                variant="outline"
                className="px-3 py-1 bg-[#E9F0FA] text-foreground border-border-grey rounded-md font-normal flex items-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7426_128661)">
                    <path d="M12.1875 2.33435H2.8125C2.55362 2.33435 2.34375 2.54422 2.34375 2.8031V12.1781C2.34375 12.437 2.55362 12.6469 2.8125 12.6469H12.1875C12.4464 12.6469 12.6562 12.437 12.6562 12.1781V2.8031C12.6562 2.54422 12.4464 2.33435 12.1875 2.33435Z" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.3125 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.6875 1.39685V3.27185" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.34375 5.14685H12.6562" stroke="#1E1F20" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.5 8.4281C7.88833 8.4281 8.20312 8.1133 8.20312 7.72498C8.20312 7.33665 7.88833 7.02185 7.5 7.02185C7.11167 7.02185 6.79688 7.33665 6.79688 7.72498C6.79688 8.1133 7.11167 8.4281 7.5 8.4281Z" fill="#1E1F20" />
                    <path d="M10.0781 8.4281C10.4665 8.4281 10.7812 8.1133 10.7812 7.72498C10.7812 7.33665 10.4665 7.02185 10.0781 7.02185C9.6898 7.02185 9.375 7.33665 9.375 7.72498C9.375 8.1133 9.6898 8.4281 10.0781 8.4281Z" fill="#1E1F20" />
                    <path d="M4.92188 10.7719C5.3102 10.7719 5.625 10.4571 5.625 10.0687C5.625 9.6804 5.3102 9.3656 4.92188 9.3656C4.53355 9.3656 4.21875 9.6804 4.21875 10.0687C4.21875 10.4571 4.53355 10.7719 4.92188 10.7719Z" fill="#1E1F20" />
                    <path d="M7.5 10.7719C7.88833 10.7719 8.20312 10.4571 8.20312 10.0687C8.20312 9.6804 7.88833 9.3656 7.5 9.3656C7.11167 9.3656 6.79688 9.6804 6.79688 10.0687C6.79688 10.4571 7.11167 10.7719 7.5 10.7719Z" fill="#1E1F20" />
                    <path d="M10.0781 10.7719C10.4665 10.7719 10.7812 10.4571 10.7812 10.0687C10.7812 9.6804 10.4665 9.3656 10.0781 9.3656C9.6898 9.3656 9.375 9.6804 9.375 10.0687C9.375 10.4571 9.6898 10.7719 10.0781 10.7719Z" fill="#1E1F20" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7426_128661">
                      <rect width="15" height="15" fill="white" transform="translate(0 -0.00939941)" />
                    </clipPath>
                  </defs>
                </svg>
                Manually
                <X className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full" />
              </Badge>
            )}
          </>
        )}
        {selectedKeywords.map((keyword) => (
          <Badge
            key={keyword}
            variant="outline"
            className="px-3 py-1 bg-[#E9F0FA] text-[12px] text-foreground border-border-grey font-normal rounded-md flex items-center gap-2"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_7426_128708)">
                <path d="M2.48086 8.09646C2.39312 8.00862 2.34381 7.88956 2.34375 7.76541V2.33435H7.7748C7.89896 2.33441 8.01802 2.38372 8.10586 2.47146L13.9254 8.29099C14.0132 8.37889 14.0626 8.49807 14.0626 8.62234C14.0626 8.74661 14.0132 8.86579 13.9254 8.95369L8.96484 13.916C8.87694 14.0038 8.75776 14.0532 8.6335 14.0532C8.50923 14.0532 8.39005 14.0038 8.30215 13.916L2.48086 8.09646Z" stroke="#1E1F20" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.92188 5.6156C5.3102 5.6156 5.625 5.3008 5.625 4.91248C5.625 4.52415 5.3102 4.20935 4.92188 4.20935C4.53355 4.20935 4.21875 4.52415 4.21875 4.91248C4.21875 5.3008 4.53355 5.6156 4.92188 5.6156Z" fill="#1E1F20" />
              </g>
              <defs>
                <clipPath id="clip0_7426_128708">
                  <rect width="15" height="15" fill="white" transform="translate(0 -0.00939941)" />
                </clipPath>
              </defs>
            </svg>
            {keyword}
            <X
              className="h-3 w-3 cursor-pointer hover:bg-muted rounded-full"
              onClick={() => removeKeyword(keyword)}
            />
          </Badge>
        ))}
        {selectedKeywords.length > 0 && <Button
          variant="ghost"
          size="sm"
          onClick={clearAllKeywords}
          className="text-foreground hover:text-foreground/80 font-normal h-auto p-0"
        >
          Clear
        </Button>}
      </div>
      
      {/* Modals */}
      <RunBulkScansModal 
        open={isRunBulkScansModalOpen}
        onClose={() => setIsRunBulkScansModalOpen(false)}
        onConfirm={() => {
          setIsRunBulkScansModalOpen(false);
          setProcessingTitle("Processing scans...");
          setIsProcessingModalOpen(true);
        }}
      />
      
      <ProcessingModal 
        open={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
        title={processingTitle}
      />
      
      <LabelsModal 
        open={isLabelsModalOpen}
        onClose={() => setIsLabelsModalOpen(false)}
      />
      
      <RemoveLabelsModal 
        open={isRemoveLabelsModalOpen}
        onClose={() => setIsRemoveLabelsModalOpen(false)}
        onConfirm={() => {
          setIsRemoveLabelsModalOpen(false);
          // Handle remove labels logic here
        }}
      />
    </div>
  );
};

export default SearchFilters;