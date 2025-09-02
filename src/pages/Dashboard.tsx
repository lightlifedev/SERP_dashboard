import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BusinessInfo from "@/components/dashboard/BusinessInfo";
import TrackingInfo from "@/components/dashboard/TrackingInfo";
import SearchFilters from "@/components/dashboard/SearchFilters";
import KeywordSummary from "@/components/dashboard/KeywordSummary";
import KeywordsTable from "@/components/dashboard/KeywordsTable";
import { mockKeywords } from "@/mockup/keywords";

const Dashboard = () => {
  const [compareMode, setCompareMode] = useState(false);
  const [domainData, setDomainData] = useState<typeof mockKeywords[0] | null>(null);
  
  useEffect(() => {
    // Get domain data based on the domainId from URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const domainId = urlParams.get('domainId');
    if (domainId) {
      const foundDomain = mockKeywords.find(row => row.id.toString() === domainId);
      setDomainData(foundDomain || null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSerpTrackingBreadcrumb />

      {/* Main content area */}
      <div className="flex justify-center px-6 py-8">
        <div className="w-full max-w-[1300px] bg-white rounded-lg">
          <BusinessInfo domainData={domainData} />
          <TrackingInfo domainData={domainData} />
          <div className="sticky top-0 py-5 z-[20] bg-white">
            <SearchFilters onCompareChange={setCompareMode} />
          </div>
          <KeywordSummary compareMode={compareMode} domainData={domainData} />
          <KeywordsTable compareMode={compareMode} domainData={domainData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;