import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar } from "lucide-react";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FilterBadgesProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

const FilterBadges = ({ 
  currentPage = 1, 
  totalPages = 3, 
  totalItems = 60,
  itemsPerPage = 25 
}: FilterBadgesProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-4">
      

      {/* Status Filter Badges */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className="px-4 py-2 bg-white text-sky-600 border-primary rounded-full"
          >
            All <span className="ml-1 font-normal text-sky-600 bg-sky-200  py-[1px] px-[4px] rounded-[4px]">90</span>
          </Badge>
          <Badge 
            variant="outline" 
            className="px-4 py-2 bg-background text-muted-foreground border-border-grey rounded-full hover:bg-accent"
          >
            Active <span className="ml-1 font-normal text-gray-600 bg-gray-300  py-[1px] px-[4px] rounded-[4px]">60</span>
          </Badge>
          <Badge 
            variant="outline" 
            className="px-4 py-2 bg-background text-muted-foreground border-border-grey rounded-full hover:bg-accent"
          >
            Paused <span className="ml-1 font-normal text-gray-600 bg-gray-300  py-[1px] px-[4px] rounded-[4px]">30</span>
          </Badge>
        </div>

        {/* Pagination Info and Controls */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {startItem}-{endItem} of {totalItems}
          </span>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default FilterBadges;