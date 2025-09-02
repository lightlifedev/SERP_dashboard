import { Home, Plus, ArrowLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { NewSerpScanModal } from "@/components/modals/NewSerpScanModal";
import { useRouter } from "@tanstack/react-router";
import { navbar } from "@/lib/component-styles";

interface NavbarProps {
  showSerpTrackingBreadcrumb?: boolean;
}

const Navbar = ({ showSerpTrackingBreadcrumb = false }: NavbarProps) => {
  const router = useRouter();

  return (
    <nav className={navbar.container}>
      <div className={navbar.inner}>
        <div className={navbar.content}>
          <div className={navbar.wrapper}>
            {showSerpTrackingBreadcrumb && (
              <Button
                variant="ghost"
                onClick={() => router.navigate({ to: '/' })}
                className={navbar.backButton}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <div className="flex items-center gap-4">
              <h1 className={navbar.title}>SERP Tracking</h1>
            </div>
            <NewSerpScanModal>
              <Button variant="sky" className={navbar.actionButton}>
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