import React, { useState } from "react";
import { X, Plus, Search, RefreshCw, ChevronDown, Info, SeparatorHorizontal, SeparatorVerticalIcon, SeparatorVertical, LucideSeparatorVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import LabelsModal from "./LabelsModal";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { input, button } from "@/lib/component-styles";

interface NewSerpScanModalProps {
  children: React.ReactNode;
}

export const NewSerpScanModal = ({ children }: NewSerpScanModalProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [targetLocations, setTargetLocations] = useState<string[]>(["Arizona", "Dallas", "Texas"]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [labelSearchValue, setLabelSearchValue] = useState("");

  // Step 2 state
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["hvac", "plumbing", "ac repair", "plumbing TX", "ac repair TX", "hvac replacement", "plumber", "ac maintenance", "ac fix"]);
  const [sampleLabels, setSampleLabels] = useState<string[]>([
    "Single-line item 1",
    "Single-line item 2",
    "Single-line item 3",
    "Single-line item 4",
    "Single-line item 5",
    "Single-line item 6"
  ]);
  const [newKeyword, setNewKeyword] = useState("");
  const [recommendedKeywords, setRecommendedKeywords] = useState([
    { keyword: "hvac", selected: true },
    { keyword: "TX plumbing", selected: false },
    { keyword: "ac repair", selected: true },
    { keyword: "ac repair TX", selected: true },
    { keyword: "drain cleaning", selected: false },
    { keyword: "hvac maintenance", selected: false },
    { keyword: "plumber", selected: true },
    { keyword: "ac maintenance", selected: true },
    { keyword: "faucet repair", selected: false },
  ]);
  const [searchEngine, setSearchEngine] = useState("google");
  const [devices, setDevices] = useState({ desktop: true, mobile: true });
  const [schedule, setSchedule] = useState("weekly");
  const router = useRouter();

  // Check if domain has valid format to show additional fields
  const showAdditionalFields = domain.includes(".") && domain.length > 3;

  const handleAddLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLocation.trim()) {
      setTargetLocations([...targetLocations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const removeLocation = (index: number) => {
    setTargetLocations(targetLocations.filter((_, i) => i !== index));
  };

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      setSelectedKeywords([...selectedKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setSelectedKeywords(selectedKeywords.filter((_, i) => i !== index));
  };

  const toggleRecommendedKeyword = (keyword: string) => {
    setRecommendedKeywords(recommendedKeywords.map(item =>
      item.keyword === keyword ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectAllRecommended = () => {
    setRecommendedKeywords(recommendedKeywords.map(item => ({ ...item, selected: true })));
  };

  const regenerateKeywords = () => {
    // Simulate regenerating keywords
    console.log("Regenerating keywords...");
  };

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const filteredLabels = sampleLabels.filter(label =>
    label.toLowerCase().includes(labelSearchValue.toLowerCase())
  );

  const addLabelValue = (label: string) => {
    if (label.trim() && !selectedLabels.includes(label.trim())) {
      setSelectedLabels(prev => [...prev, label.trim()]);
      setSampleLabels(prev => [...prev, label.trim()]);
      setLabelSearchValue("");
    }
  }

  const onclickTracking = () => {
    router.navigate({ to: '/dashboard' });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-2">{step}/2</div>
              <DialogTitle className="text-2xl font-semibold">New Scan Setup</DialogTitle>
              <p className="text-foreground text-sm mt-2">
                Discover where you stand in Google search results.
              </p>
            </div>
          </DialogHeader>

          <div className={`transition-transform duration-300 ${step === 1 ? 'translate-x-0' : '-translate-x-full'}`}>
            {step === 1 && (
              <div className="space-y-6 mt-6">
                {/* Domain Field */}
                <div className="space-y-2 p-8 bg-sky-50 rounded-lg">
                  <Label htmlFor="domain" className="text-base font-medium">
                    Domain
                  </Label>
                  <Input
                    id="domain"
                    placeholder="yourdomain.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className={cn(input.base, input.muted)}
                  />
                  <p className="text-sm text-muted-foreground">
                    * Enter a domain or subdomain. Subfolders not supported.
                  </p>
                </div>

                {/* Additional Fields - Show when domain is entered */}
                {showAdditionalFields && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-base font-normal">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="5610 Dyer St, Dallas, TX 75206"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="text-base focus:border-[1.3px] focus:border-[#6999DC]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-base font-normal">
                        Business name for local map pack
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Public Service Plumbers"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="text-base focus:border-[1.3px] focus:border-[#6999DC]"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <a href="#" className="text-primary underline">View on Google</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg">
                      <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        We link your domain to the right business. Verify or edit if needed.
                      </p>
                    </div>
                  </>
                )}

                {/* Target Locations */}
                <div className="space-y-2">
                  <Label className="text-base font-normal">
                    Target locations ({targetLocations.length})
                  </Label>
                  <div className="group p-2 border rounded-lg bg-muted/20 focus-within:border-[1.3px] focus-within:border-[#6999DC]">
                    <div className="flex flex-wrap gap-2 ">
                      {targetLocations.map((location, index) => (
                        <div
                          key={index}
                          className="bg-[#DDE8F7] text-foreground border border-[#6999DC] hover:bg-[#CDDDF3] focus-within:bg-white focus-within:hover:bg-white cursor-pointer text-sm font-normal flex items-center group h-8 rounded-full overflow-hidden relative"
                        >
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => {
                              console.log("location.length", location.length);
                              const newLocations = [...targetLocations];
                              newLocations[index] = e.target.value;
                              setTargetLocations(newLocations);
                            }}
                            className={`my-4 ml-4 mx-2 bg-transparent border-none outline-none focus:ring-0 text-sm`}
                            style={{ width: `${location.length === 0 ? 10 : location.length * 8}px` }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              }
                            }}
                          />
                          <button
                            onClick={() => removeLocation(index)}
                            className="text-gray-500 hover:text-black bg-inherit hover:bg-[#BDC8D7] transition-colors h-full w-[30px] flex items-center justify-center"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <Input
                        placeholder="Add here with Enter"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        onKeyDown={handleAddLocation}
                        className="flex-1 min-w-[200px] h-8 border-none bg-transparent focus:ring-0 focus:border-none shadow-none group-hover:border-[1.3px] group-hover:border-[#6999DC]"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-3 pt-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        {selectedLabels.length > 0 ? `Add Labels (${selectedLabels.length})` : "Add Labels"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 bg-white border shadow-lg" align="start">
                      <div className="p-4 space-y-4 flex flex-col items-end">
                        {/* Search input */}
                        <div className="flex gap-2 w-full border-[1.3px] border-gray-300 rounded-lg px-3 py-2 focus:border-[#6999DC]">
                          <div className="relative flex-1">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search a label here..."
                              value={labelSearchValue}
                              onChange={(e) => setLabelSearchValue(e.target.value)}
                              className="pl-10 border-none bg-inherit"
                            />
                          </div>
                          <Button variant="outline"
                            onClick={() => addLabelValue(labelSearchValue)}
                            disabled={!labelSearchValue.trim()}
                            className={cn(
                              "border-[1.3px] rounded-lg",
                              labelSearchValue.trim() ? "bg-[#DDE8F7] border-[#6999DC] hover:bg-[#CDDDF3]" : "opacity-50 bg-gray-200 border-gray-300"
                            )}>
                            Add
                          </Button>
                        </div>

                        {/* Labels list */}
                        <div className="border rounded-lg w-full overflow-hidden">
                          <ScrollArea className="h-64">
                            <div className="p-4">
                              {filteredLabels.length > 0 ? (
                                <div className="space-y-3">
                                  {filteredLabels.map((label, index) => (
                                    <div
                                      key={index}
                                      onClick={() => toggleLabel(label)}
                                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2 transition-colors"
                                    >
                                      <Checkbox
                                        checked={selectedLabels.includes(label)}
                                        className="h-4 w-4 rounded border-2"
                                      />
                                      <span className="text-sm text-gray-700 flex-1">
                                        {label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                  <h3 className="text-lg font-medium text-gray-400 mb-2">No labels found</h3>
                                  <p className="text-sm text-gray-400">
                                    We can't find any item matching<br />
                                    your search.
                                  </p>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>

                        {/* Manage labels button */}
                        <Button
                          variant="outline"
                          className={selectedLabels.length > 0 ? `text-white bg-sky-600 max-w-[160px]` : `w-full py-3 text-gray-700 bg-gray-50 hover:bg-gray-100`}
                        >
                          {selectedLabels.length > 0 ? `Apply (${selectedLabels.length})` : "Manage labels"}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    className={button.primary}
                    onClick={() => setStep(2)}
                  >
                    Continue
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className={`transition-transform duration-300 ${step === 2 ? 'translate-x-0' : 'translate-x-full'} ${step === 1 ? 'hidden' : ''}`}>
            {step === 2 && (
              <div className="space-y-12 mt-6">
                {/* Selected Keywords */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Selected keywords ({selectedKeywords.length})
                  </Label>
                  <div className="p-2 border rounded-lg bg-muted/20 focus-within:border-[1.3px] focus-within:border-[#6999DC]">
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword, index) => (
                        <div
                          key={index}
                          className="bg-[#DDE8F7] text-foreground border border-[#6999DC] hover:bg-[#CDDDF3] cursor-pointer text-sm font-normal flex items-center group h-8 rounded-full overflow-hidden relative"
                        >
                          <input
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                              const newKeywords = [...selectedKeywords];
                              newKeywords[index] = e.target.value;
                              setSelectedKeywords(newKeywords);
                            }}
                            className="my-4 ml-4 mx-2 bg-transparent border-none outline-none focus:ring-0 w-full text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                              }
                            }}
                          />
                          <button
                            onClick={() => removeKeyword(index)}
                            className="text-gray-500 hover:text-black bg-inherit hover:bg-[#BDC8D7] transition-colors h-full w-[30px] flex items-center justify-center"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <Input
                        placeholder="Add here with Enter"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyDown={handleAddKeyword}
                        className="flex-1 min-w-[200px] border-none bg-transparent focus:ring-0 focus:border-none shadow-none h-8 focus:border-[1.3px] focus:border-[#6999DC]"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add keywords separated by commas
                  </p>
                </div>

                {/* AI Recommended Keywords */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-normal flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      High-intent keywords for your business
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={regenerateKeywords}
                        className="text-sm"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllRecommended}
                        className="text-primary text-sm"
                      >
                        Select all
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recommendedKeywords.map((item, index) => (
                      <div
                        key={index}
                        className={`text-sm text-foreground cursor-pointer border-[1.3px] rounded-full border-dashed transition-all group flex items-center overflow-hidden h-8 ${item.selected
                          ? "bg-[#D8D6FF] border-[#7A74FF] hover:bg-[#C7C5FF]"
                          : "bg-background border-muted-foreground hover:border-blue-400"
                          }`}
                        onClick={() => toggleRecommendedKeyword(item.keyword)}
                      >
                        <span className="font-normal my-2 ml-4 mr-2">{item.keyword}</span>
                        <button className={`text-gray-500 hover:text-black bg-inherit transition-colors h-full w-[30px] flex items-center justify-center ${item.selected ? "hover:bg-[#7A74FF]/20" : "hover:bg-gray-300"}`}>
                          {item.selected ? (
                            <X className="h-3 w-3" />
                          ) : (
                            <Plus className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-16 items-start">
                  {/* Search Engine */}
                  <div className="space-y-3">
                    <Label className="text-base font-normal">Search engine</Label>
                    <RadioGroup value={searchEngine} onValueChange={setSearchEngine}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="google" id="google" />
                        <Label htmlFor="google" className="font-normal">Google</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Separator */}
                  <Separator orientation="vertical" className="h-16 bg-border" />

                  {/* Device */}
                  <div className="space-y-3">
                    <Label className="text-base font-normal">Device</Label>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="desktop"
                          checked={devices.desktop}
                          onCheckedChange={(checked) =>
                            setDevices({ ...devices, desktop: checked as boolean })
                          }
                        />
                        <Label htmlFor="desktop" className="font-normal">Desktop</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile"
                          checked={devices.mobile}
                          onCheckedChange={(checked) =>
                            setDevices({ ...devices, mobile: checked as boolean })
                          }
                        />
                        <Label htmlFor="mobile" className="font-normal">Mobile</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-3">
                  <Label className="text-base font-normal">Schedule</Label>
                  <Select value={schedule} onValueChange={setSchedule}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manually">Manually</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="px-8"
                  >
                    Back
                  </Button>
                  <Button
                    className={button.primary}
                    onClick={() => onclickTracking()}
                  >
                    Start tracking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
};