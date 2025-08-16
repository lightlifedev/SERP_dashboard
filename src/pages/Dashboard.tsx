import { useState } from "react";
import Navbar from "@/components/Navbar";
import BusinessInfo from "@/components/dashboard/BusinessInfo";
import TrackingInfo from "@/components/dashboard/TrackingInfo";
import SearchFilters from "@/components/dashboard/SearchFilters";
import KeywordSummary from "@/components/dashboard/KeywordSummary";
import KeywordsTable from "@/components/dashboard/KeywordsTable";

const Dashboard = () => {
  const [compareMode, setCompareMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSerpTrackingBreadcrumb />

      {/* Main content area */}
      <div className="flex justify-center px-6 py-8">
        <div className="w-full max-w-[1300px] bg-white rounded-lg">
          <BusinessInfo />
          <TrackingInfo />
          <SearchFilters onCompareChange={setCompareMode} />
          <KeywordSummary compareMode={compareMode} />
          <KeywordsTable compareMode={compareMode} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;