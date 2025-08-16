import { Home, Plus } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { NewSerpScanModal } from "@/components/modals/NewSerpScanModal";

interface NavbarProps {
  showSerpTrackingBreadcrumb?: boolean;
}

const Navbar = ({ showSerpTrackingBreadcrumb = false }: NavbarProps) => {
  return (
    <nav className="w-full bg-navbar-bg px-6 py-4">
      <div className="flex flex-col space-y-3">
        {/* First line - Breadcrumbs */}
        <div className="flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {showSerpTrackingBreadcrumb && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span className="text-foreground">SERP Tracking</span>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Second line - Title and New Scan button */}
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center justify-between w-full max-w-[1300px]">
            <h1 className="text-2xl font-semibold text-foreground">SERP Tracking</h1>
            <NewSerpScanModal>
              <Button variant="sky" className="bg-sky-500 text-white border-sky-600 border-[1px]">
                <Plus className="h-4 w-4 mr-2" />
                New SERP scan
              </Button>
            </NewSerpScanModal>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;