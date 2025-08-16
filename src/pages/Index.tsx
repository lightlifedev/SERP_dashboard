import Navbar from "@/components/Navbar";
import SerpScansHeader from "@/components/SerpScansHeader";
import FilterBadges from "@/components/FilterBadges";
import SearchFilters from "@/components/SearchFilters";
import KeywordsTable from "@/components/KeywordsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-white">
        <div className="max-w-[1300px] mx-auto px-6 mb-8">
          <SerpScansHeader />
          <FilterBadges />
          <SearchFilters />
          <KeywordsTable />
        </div>
      </div>
    </div>
  );
};

export default Index;