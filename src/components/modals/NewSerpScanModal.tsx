import React, { useState } from "react";
import { X, Plus, Search, RefreshCw, ChevronDown, Info } from "lucide-react";
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
import LabelsModal from "./LabelsModal";

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
  const [showLabelsModal, setShowLabelsModal] = useState(false);

  // Step 2 state
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["hvac", "plumbing", "ac repair", "plumbing TX", "ac repair TX", "hvac replacement", "plumber", "ac maintenance", "ac fix"]);
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

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-2">{step}/2</div>
              <DialogTitle className="text-2xl font-semibold">New Scan Setup</DialogTitle>
              <p className="text-muted-foreground mt-2">
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
                    className="text-base bg-muted/30 bg-white"
                  />
                  <p className="text-sm text-muted-foreground">
                    * Enter a domain or subdomain. Subfolders not supported.
                  </p>
                </div>

                {/* Target Locations */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Target locations ({targetLocations.length})
                  </Label>
                  <div className="p-2 border rounded-lg bg-muted/20">
                    <div className="flex flex-wrap gap-2">
                      {targetLocations.map((location, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="h-8 bg-sky-blue-bg text-foreground border border-sky-blue/30 px-3 text-sm"
                        >
                          {location}
                          <button
                            onClick={() => removeLocation(index)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Input
                        placeholder="Add here with Enter"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        onKeyDown={handleAddLocation}
                        className="flex-1 min-w-[200px] h-8 border-none bg-transparent focus:ring-0 focus:border-none shadow-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Fields - Show when domain is entered */}
                {showAdditionalFields && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-base font-medium">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="5610 Dyer St, Dallas, TX 75206"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-base font-medium">
                        Business name for local map pack
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Public Service Plumbers"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="text-base"
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
                        <a href="#" className="text-primary hover:underline">View on Google</a>
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

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowLabelsModal(true)}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    Add Labels
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
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
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword, index) => (
                        <div
                          key={index}
                          className="bg-[#DDE8F7] text-foreground border border-[#6999DC] text-sm font-medium flex items-center group h-8 rounded-full overflow-hidden"
                        >
                          <span className="my-4 ml-4 mx-2">{keyword}</span>
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
                        className="flex-1 min-w-[200px] border-none bg-transparent focus:ring-0 focus:border-none shadow-none h-8"
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
                    <Label className="text-base font-medium flex items-center gap-2">
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
                        className={`text-sm text-foreground cursor-pointer border-2 rounded-full border-dashed transition-all group flex items-center overflow-hidden h-8 ${item.selected
                            ? "bg-[#D8D6FF] border-[#7A74FF]"
                            : "bg-background border-muted-foreground hover:border-blue-400"
                          }`}
                        onClick={() => toggleRecommendedKeyword(item.keyword)}
                      >
                        <span className="font-medium my-2 ml-4 mr-2">{item.keyword}</span>
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

                <div className="flex gap-16">
                  {/* Search Engine */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Search engine</Label>
                    <RadioGroup value={searchEngine} onValueChange={setSearchEngine}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="google" id="google" />
                        <Label htmlFor="google">Google</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Device */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Device</Label>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="desktop"
                          checked={devices.desktop}
                          onCheckedChange={(checked) =>
                            setDevices({ ...devices, desktop: checked as boolean })
                          }
                        />
                        <Label htmlFor="desktop">Desktop</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile"
                          checked={devices.mobile}
                          onCheckedChange={(checked) =>
                            setDevices({ ...devices, mobile: checked as boolean })
                          }
                        />
                        <Label htmlFor="mobile">Mobile</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Schedule</Label>
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
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                    onClick={() => setOpen(false)}
                  >
                    Start tracking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LabelsModal
        open={showLabelsModal}
        onClose={() => setShowLabelsModal(false)}
      />
    </>
  );
};