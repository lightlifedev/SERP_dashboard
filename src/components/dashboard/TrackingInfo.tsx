import { Monitor, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TrackingInfoProps {
  domainData?: {
    id: number;
    domain: string;
    labels: string[];
    status: string;
    lastUpdated: string;
  } | null;
}

const TrackingInfo = ({ domainData }: TrackingInfoProps) => {
  return (
    <div className="bg-white p-6">
      <div className="flex gap-[5%]">
        {/* Search Engine part */}
        <div className="space-y-4">
          <div className="text-sm font-normal text-foreground">Search Engine</div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-sm text-foreground">Google</span>
          </div>
        </div>

        {/* Device part */}
        <div className="space-y-4">
          <div className="text-sm font-normal text-foreground">Device</div>
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Desktop</span>
          </div>
        </div>

        {/* Labels part */}
        <div className="space-y-4">
          <div className="text-sm font-normal text-foreground">Labels</div>
          <div className="flex items-center gap-2 flex-wrap">
            {domainData ? domainData.labels.slice(0, 4).map((label, index) => (
              <Badge key={index} variant="secondary" className="text-[11px] font-normal h-4 bg-gray-100 text-gray-500 border border-gray-300 rounded-md">
                {label}
              </Badge>
            )) : (
              <>
                <Badge variant="secondary" className="text-[11px] font-normal h-4 bg-gray-100 text-gray-500 border border-gray-300 rounded-md">
                  Arizona client
                </Badge>
                <Badge variant="secondary" className="text-[11px] font-normal h-4 bg-gray-100 text-gray-500 border border-gray-300 rounded-md">
                  priority
                </Badge>
                <Badge variant="secondary" className="text-[11px] font-normal h-4 bg-gray-100 text-gray-500 border border-gray-300 rounded-md">
                  plumbing niche
                </Badge>
                <Badge variant="secondary" className="text-[11px] font-normal h-4 bg-gray-100 text-gray-500 border border-gray-300 rounded-md">
                  service city
                </Badge>
              </>
            )}
            <Button size="sm" variant="ghost" className="h-4 w-4 p-0 bg-gray-100 border border-gray-300 rounded-md">
              <Plus className="h-1 scale-75" />
            </Button>
          </div>
        </div>

        {/* Updated part */}
        <div className="space-y-4">
          <div className="text-sm font-normal text-foreground">Updated</div>
          <div className="flex items-center gap-2">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_7531_70783)">
                <path d="M17.5 11.125C17.182 14.975 13.932 18 10 18C8.01088 18 6.10322 17.2098 4.6967 15.8033C3.29018 14.3968 2.5 12.4891 2.5 10.5C2.5 6.56797 5.525 3.31797 9.375 3" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10 6.125V10.5H14.375" stroke="#6B7280" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.5 4.25C13.0178 4.25 13.4375 3.83027 13.4375 3.3125C13.4375 2.79473 13.0178 2.375 12.5 2.375C11.9822 2.375 11.5625 2.79473 11.5625 3.3125C11.5625 3.83027 11.9822 4.25 12.5 4.25Z" fill="#6B7280" />
                <path d="M15.3125 6.125C15.8303 6.125 16.25 5.70527 16.25 5.1875C16.25 4.66973 15.8303 4.25 15.3125 4.25C14.7947 4.25 14.375 4.66973 14.375 5.1875C14.375 5.70527 14.7947 6.125 15.3125 6.125Z" fill="#6B7280" />
                <path d="M17.1875 8.9375C17.7053 8.9375 18.125 8.51777 18.125 8C18.125 7.48223 17.7053 7.0625 17.1875 7.0625C16.6697 7.0625 16.25 7.48223 16.25 8C16.25 8.51777 16.6697 8.9375 17.1875 8.9375Z" fill="#6B7280" />
              </g>
              <defs>
                <clipPath id="clip0_7531_70783">
                  <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm text-foreground">{domainData ? domainData.lastUpdated : '0 hours ago'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingInfo;