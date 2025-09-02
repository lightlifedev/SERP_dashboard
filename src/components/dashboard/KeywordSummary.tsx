import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, TrendingUp, TrendingDown, SeparatorVertical } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, ReferenceLine } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import trendingUp from "@/assets/trending_up.png";
import trendingDown from "@/assets/trending_down.png";

interface KeywordSummaryProps {
  compareMode?: boolean;
  domainData?: {
    id: number;
    domain: string;
    labels: string[];
    status: string;
    lastUpdated: string;
    avgPosition: { current: number; change: number };
    improvedKW: { current: number; total: number };
    opd: any;
  } | null;
}

const KeywordSummary = ({ compareMode = false, domainData }: KeywordSummaryProps) => {
  const analyticsCards = [
    {
      title: "Average Position",
      icon: "🔵",
      bgColor: "inherit",
      borderColor: "inherit",
      current: { value: "3", change: "-3.3%", trend: "down" },
      previous: { value: "43", change: "15.1%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Improved Keywords",
      icon: "🟢",
      bgColor: "inherit",
      borderColor: "inherit",
      current: { value: "5/10", change: "-47.7%", trend: "down" },
      previous: { value: "4/6", change: "65.8%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "A.I. Snip",
      icon: "🟣",
      bgColor: "inherit",
      borderColor: "inherit",
      current: { value: "4/10", change: "15.7%", trend: "up" },
      previous: { value: "5/6", change: "37.1%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 3",
      icon: "🟡",
      bgColor: "bg-[#F6FFFB]",
      borderColor: "border-[#A6FAD3B2]",
      current: { value: "3/10", change: "-3.3%", trend: "down" },
      previous: { value: "0/6", change: "", trend: "neutral" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 10",
      icon: "🟠",
      bgColor: "bg-[#EEFCF6]",
      borderColor: "border-[#8CECC080]",
      current: { value: "7/10", change: "16.3%", trend: "up" },
      previous: { value: "1/6", change: "5.2%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 20",
      icon: "🩷",
      bgColor: "bg-[#FFFBF2]",
      borderColor: "border-[#FFDB8080]",
      current: { value: "8/10", change: "-15.6%", trend: "down" },
      previous: { value: "3/6", change: "55.4%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    }
  ];

  const opdData1 = [
    { name: "1-3", value: 47.2, color: "#00F281" },
    { name: "4-10", value: 28.5, color: "#00D572" },
    { name: "11-20", value: 8.21, color: "#FFC300" },
    { name: "21-50", value: 6.09, color: "#f97316" },
    { name: "51-100", value: 10.0, color: "#ef4444" }
  ];

  const opdData2 = [
    { name: "1-3", value: 8.21, color: "#00F281" },
    { name: "4-10", value: 28.5, color: "#00D572" },
    { name: "11-20", value: 47.2, color: "#FFC300" },
    { name: "21-50", value: 10.0, color: "#f97316" },
    { name: "51-100", value: 6.09, color: "#ef4444" }
  ];

  const chartData = [
    { date: "Nov 1", top3: 25, top10: 15, top20: 8, top3_p1: 25, top10_p1: 15, top20_p1: 8, top3_p2: 22, top10_p2: 12, top20_p2: 5 },
    { date: "Nov 5", top3: 22, top10: 18, top20: 12, top3_p1: 22, top10_p1: 18, top20_p1: 12, top3_p2: 19, top10_p2: 15, top20_p2: 9 },
    { date: "Nov 10", top3: 28, top10: 20, top20: 15, top3_p1: 28, top10_p1: 20, top20_p1: 15, top3_p2: 25, top10_p2: 17, top20_p2: 12 },
    { date: "Nov 15", top3: 24, top10: 16, top20: 10, top3_p1: 24, top10_p1: 16, top20_p1: 10, top3_p2: 21, top10_p2: 13, top20_p2: 7 },
    { date: "Nov 20", top3: 26, top10: 19, top20: 14, top3_p1: 26, top10_p1: 19, top20_p1: 14, top3_p2: 23, top10_p2: 16, top20_p2: 11 },
    { date: "Nov 25", top3: 23, top10: 17, top20: 11, top3_p1: 23, top10_p1: 17, top20_p1: 11, top3_p2: 20, top10_p2: 14, top20_p2: 8 },
    { date: "Nov 30", top3: 25, top10: 18, top20: 13, top3_p1: 25, top10_p1: 18, top20_p1: 13, top3_p2: 22, top10_p2: 15, top20_p2: 10 },
    { date: "Dec 1", top3: 27, top10: 21, top20: 16, top3_p1: 27, top10_p1: 21, top20_p1: 16, top3_p2: 24, top10_p2: 18, top20_p2: 13 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Mock data for tooltip - in real implementation, this would come from props or context
      const currentData = {
        top3: { count: 3, total: 10, percentage: 3.3 },
        top10: { count: 7, total: 10, percentage: 16.3 },
        top20: { count: 8, total: 10, percentage: -15.6 }
      };
      
      const previousData = {
        top3: { count: 0, total: 6, percentage: 3.3 },
        top10: { count: 1, total: 6, percentage: 5.2 },
        top20: { count: 3, total: 6, percentage: 55.4 }
      };

      return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg min-w-[280px]">
          <p className="text-sm p-4 font-medium text-gray-900">January 30, 2025</p>
          {compareMode ? (
            <>
              <div className="px-4 space-y-2 pt-2 mb-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-normal">Top 3</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-normal">{currentData.top3.count}/{currentData.top3.total}</span>
                    <span className={`text-sm ml-2 ${currentData.top3.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({currentData.top3.percentage > 0 ? '+' : ''}{currentData.top3.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    <span className="text-sm font-normal">Top 10</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-normal">{currentData.top10.count}/{currentData.top10.total}</span>
                    <span className={`text-sm ml-2 ${currentData.top10.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({currentData.top10.percentage > 0 ? '+' : ''}{currentData.top10.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-normal">Top 20</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-normal">{currentData.top20.count}/{currentData.top20.total}</span>
                    <span className={`text-sm ml-2 ${currentData.top20.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({currentData.top20.percentage > 0 ? '+' : ''}{currentData.top20.percentage}%)
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm px-4 font-medium text-gray-900 mb-2">November 30, 2024</p>
                <div className="space-y-2 p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-300 opacity-60"></div>
                      <span className="text-sm font-normal text-foreground">Top 3</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-normal text-foreground">{previousData.top3.count}/{previousData.top3.total}</span>
                      <span className={`text-sm ml-2 ${previousData.top3.percentage > 0 ? 'text-green-500' : 'text-red-500'} opacity-60`}>
                        ({previousData.top3.percentage > 0 ? '+' : ''}{previousData.top3.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-400 opacity-60"></div>
                      <span className="text-sm font-normal text-foreground">Top 10</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-normal text-foreground">{previousData.top10.count}/{previousData.top10.total}</span>
                      <span className={`text-sm ml-2 ${previousData.top10.percentage > 0 ? 'text-green-500' : 'text-red-500'} opacity-60`}>
                        ({previousData.top10.percentage > 0 ? '+' : ''}{previousData.top10.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-300 opacity-60"></div>
                      <span className="text-sm font-normal text-foreground">Top 20</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-normal text-foreground">{previousData.top20.count}/{previousData.top20.total}</span>
                      <span className={`text-sm ml-2 ${previousData.top20.percentage > 0 ? 'text-green-500' : 'text-red-500'} opacity-60`}>
                        ({previousData.top20.percentage > 0 ? '+' : ''}{previousData.top20.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2 p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-normal">Top 3</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-normal">{currentData.top3.count}/{currentData.top3.total}</span>
                  <span className={`text-sm ml-2 ${currentData.top3.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({currentData.top3.percentage > 0 ? '+' : ''}{currentData.top3.percentage}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-sm font-normal">Top 10</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-normal">{currentData.top10.count}/{currentData.top10.total}</span>
                  <span className={`text-sm ml-2 ${currentData.top10.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({currentData.top10.percentage > 0 ? '+' : ''}{currentData.top10.percentage}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-normal">Top 20</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-normal">{currentData.top20.count}/{currentData.top20.total}</span>
                  <span className={`text-sm ml-2 ${currentData.top20.percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ({currentData.top20.percentage > 0 ? '+' : ''}{currentData.top20.percentage}%)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-black border-1 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-black border-1 p-4">Keyword Summary</h2>

      {/* Analytics Cards Grid */}
      <div className="flex">
        <div className={`grid ${compareMode ? "grid-cols-3" : "lg:grid-cols-6 grid-cols-3"} gap-4 mb-6 p-4`}>
          {analyticsCards.map((card, index) => (
            <Card key={index} className={`${card.bgColor} ${card.borderColor} border flex flex-col h-full`}>
              <CardHeader className="pb-2 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 mt-[2px]" style={{
                      background: card.title === "Average Position" ?
                        compareMode ? "linear-gradient(90deg, #93c5fd 50%, #3b82f6 50%)" : "#3b82f6" :
                        card.title === "Improved Keywords" ?
                          compareMode ? "linear-gradient(90deg, #86efac 50%, #10b981 50%)" : "#10b981" :
                          card.title === "A.I. Snip" ?
                            compareMode ? "linear-gradient(90deg, #c4b5fd 50%, #8b5cf6 50%)" : "#8b5cf6" :
                            card.title === "Top 20" ?
                              compareMode ? "linear-gradient(90deg, #FFC300AA 50%, #FFC300 50%)" : "#FFC300" :
                              card.title === "Top 10" ?
                                compareMode ? "linear-gradient(90deg, #00D572AA 50%, #00D572 50%)" : "#00D572" :
                                card.title === "Top 3" ?
                                  compareMode ? "linear-gradient(90deg, #00F281AA 50%, #00F281 50%)" : "#00F281" : "#6b7280"
                    }}></div>
                    <CardTitle className="text-sm font-medium text-gray-700">
                      {card.title}
                    </CardTitle>
                  </div>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="w-4 h-4 flex-shrink-0 text-gray-400 cursor-pointer align-top" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 max-w-[220px]">
                      <p className="text-[13px] text-gray-700">
                        {card.title === "Average Position" ? "The overall ranking average for all your tracked keywords." :
                          card.title === "Improved Keywords" ? "Keywords that have moved up since your last scan." :
                            card.title === "A.I. Snip" ? "Shows if your business appears in AI search results." :
                              card.title === "Top 3" ? "Number of keywords ranking in positions 1-3 on Google." :
                                card.title === "Top 10" ? "Number of keywords ranking in positions 4-10 on Google." :
                                  card.title === "Top 20" ? "Number of keywords ranking in positions 11-20 on Google." : ""}
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </div>
              </CardHeader>
              <div className="flex-grow"></div>
              <CardContent className="pt-0 flex-shrink-0">
                {compareMode ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {card.current.trend === "down" && <img src={trendingDown} className="h-[6px] w-[10px]" />}
                        {card.current.trend === "up" && <img src={trendingUp} className="h-[6px] w-[10px]" />}
                        <span className="text-2xl font-semibold text-gray-900">
                          {card.current.value}
                        </span>
                        <span className={`text-sm ${card.current.trend === "down" ? "text-red-500" : "text-green-500"}`}>
                          ({card.current.change})
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{card.currentPeriod}</p>
                    </div>
                    <div className="h-full">
                      <svg width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.65" x2="0.65" y2="42" stroke="#DDE8F7" strokeWidth="1.3" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {card.previous.trend === "up" && <img src={trendingUp} className="h-[6px] w-[10px]" />}
                        <span className="text-2xl font-semibold text-gray-900">
                          {card.previous.value}
                        </span>
                        {card.previous.change && (
                          <span className="text-sm text-green-500">
                            ({card.previous.change})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{card.previousPeriod}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">

                      <span className="text-2xl font-semibold flex items-center gap-2 text-gray-900">
                        {card.current.trend === "down" && <img src={trendingDown} className="h-[6px] w-[10px]" />}
                        {card.current.trend === "up" && <img src={trendingUp} className="h-[6px] w-[10px]" />}{card.current.value}
                      </span>
                      <span className={`text-sm ${card.current.trend === "down" ? "text-red-500" : "text-green-500"}`}>
                        ({card.current.change})
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* OPD Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Organic Position Distribution (OPD)</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              {compareMode ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Jan 1 - Feb 1, 2025</p>
                    <div className="flex h-8 rounded overflow-hidden">
                      {opdData1.map((item, index) => (
                        <UITooltip key={index}>
                          <TooltipTrigger asChild>
                            <div
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.color
                              }}
                              className="h-full cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm font-medium text-gray-900">{item.name}</span>
                            </div>
                          </TooltipContent>
                        </UITooltip>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {opdData1.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-gray-600">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-3">Nov 1 - Dec 1, 2024</p>
                    <div className="flex h-8 rounded overflow-hidden">
                      {opdData2.map((item, index) => (
                        <UITooltip key={index}>
                          <TooltipTrigger asChild>
                            <div
                              style={{
                                width: `${item.value}%`,
                                backgroundColor: item.color
                              }}
                              className="h-full cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm font-medium text-gray-900">{item.name}</span>
                            </div>
                          </TooltipContent>
                        </UITooltip>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {opdData2.map((item, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-gray-600">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Nov 1 - Dec 1, 2024</p>
                  <div className="flex h-8 rounded overflow-hidden">
                    {opdData1.map((item, index) => (
                      <UITooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: item.color
                            }}
                            className="h-full cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          </div>
                        </TooltipContent>
                      </UITooltip>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3">
                    {opdData1.map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-600">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Average Position Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Average Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={compareMode ? "h-56" : "h-28"}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    axisLine={true}
                    tickLine={compareMode ? false : true}
                    tick={{ fontSize: compareMode ? 0 : 12, fill: '#9ca3af' }}
                    interval={1}
                  />
                  <YAxis
                    domain={[0, 40]}
                    axisLine={true}
                    tickLine={true}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} offset={20} position={{ y: compareMode ? -300 : -175 }} />

                  {compareMode ? (
                    <>
                      {/* Period 1 lines - lighter versions */}
                      <Line
                        type="monotone"
                        dataKey="top3_p1"
                        stroke="#a7f3d0"
                        strokeWidth={1}
                        dot={false}
                        name="Top 3 (Period 1)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10_p1"
                        stroke="#86efac"
                        strokeWidth={1}
                        dot={false}
                        name="Top 10 (Period 1)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20_p1"
                        stroke="#fde047"
                        strokeWidth={1}
                        dot={false}
                        name="Top 20 (Period 1)"
                      />
                      {/* Period 2 lines - solid, darker versions */}
                      <Line
                        type="monotone"
                        dataKey="top3_p2"
                        stroke="#10b981"
                        strokeWidth={1}
                        dot={false}
                        name="Top 3 (Period 2)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10_p2"
                        stroke="#059669"
                        strokeWidth={1}
                        dot={false}
                        name="Top 10 (Period 2)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20_p2"
                        stroke="#eab308"
                        strokeWidth={1}
                        dot={false}
                        name="Top 20 (Period 2)"
                      />
                    </>
                  ) : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="top3"
                        stroke="#10b981"
                        strokeWidth={1}
                        dot={false}
                        name="Top 3"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10"
                        stroke="#059669"
                        strokeWidth={1}
                        dot={false}
                        name="Top 10"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20"
                        stroke="#eab308"
                        strokeWidth={1}
                        dot={false}
                        name="Top 20"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center text-xs text-gray-500 mt-4">
              {compareMode ? (
                <span className="px-6">Nov 1 - Dec 1, 2024&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jan 1 - Feb 1, 2025</span>
              ) : (
                <span>Nov 1 - Dec 1, 2024</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KeywordSummary;
