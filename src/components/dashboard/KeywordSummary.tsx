import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, TrendingUp, TrendingDown, SeparatorVertical } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, ReferenceLine } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import trendingUp from "@/assets/trending_up.png";
import trendingDown from "@/assets/trending_down.png";

interface KeywordSummaryProps {
  compareMode?: boolean;
}

const KeywordSummary = ({ compareMode = false }: KeywordSummaryProps) => {
  const analyticsCards = [
    {
      title: "Average Position",
      icon: "🔵",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      current: { value: "3", change: "-3.3%", trend: "down" },
      previous: { value: "43", change: "15.1%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Improved Keywords",
      icon: "🟢",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      current: { value: "5/10", change: "-47.7%", trend: "down" },
      previous: { value: "4/6", change: "65.8%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "A.I. Snip",
      icon: "🟣",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      current: { value: "4/10", change: "15.7%", trend: "up" },
      previous: { value: "5/6", change: "37.1%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 3",
      icon: "🟡",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      current: { value: "3/10", change: "-3.3%", trend: "down" },
      previous: { value: "0/6", change: "", trend: "neutral" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 10",
      icon: "🟠",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      current: { value: "7/10", change: "16.3%", trend: "up" },
      previous: { value: "1/6", change: "5.2%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    },
    {
      title: "Top 20",
      icon: "🩷",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      current: { value: "8/10", change: "-15.6%", trend: "down" },
      previous: { value: "3/6", change: "55.4%", trend: "up" },
      currentPeriod: "Nov 1 - Dec 1, 2024",
      previousPeriod: "Jan 1 - Feb 1, 2025"
    }
  ];

  const opdData1 = [
    { name: "1-3", value: 47.2, color: "#10b981" },
    { name: "4-10", value: 28.5, color: "#34d399" },
    { name: "11-20", value: 8.21, color: "#fbbf24" },
    { name: "21-50", value: 6.09, color: "#f97316" },
    { name: "51-100", value: 10.0, color: "#ef4444" }
  ];

  const opdData2 = [
    { name: "1-3", value: 8.21, color: "#10b981" },
    { name: "4-10", value: 28.5, color: "#34d399" },
    { name: "11-20", value: 47.2, color: "#fbbf24" },
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
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {compareMode ? (
            <>
              <div className="space-y-1 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm">Top 3: 3/10 (3.3%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                  <span className="text-sm">Top 10: 7/10 (16.3%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  <span className="text-sm">Top 20: 8/10 (15.6%)</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t">
                <p className="text-sm font-medium">November 30, 2024</p>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-sm">Top 3: 0/6 (3.3%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    <span className="text-sm">Top 10: 1/6 (5.2%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                    <span className="text-sm">Top 20: 3/6 (55.4%)</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-1 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm">Top 3: 3/10 (3.3%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-sm">Top 10: 7/10 (16.3%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <span className="text-sm">Top 20: 8/10 (15.6%)</span>
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
      <div className="flex flex-wrap gap-4 mb-6 p-4">
        {analyticsCards.map((card, index) => (
          <Card key={index} className={`${card.bgColor} ${card.borderColor} border w-[320px]`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full relative" style={{
                    background: card.title === "Average Position" ?
                      "linear-gradient(90deg, #93c5fd 50%, #3b82f6 50%)" :
                      card.title === "Improved Keywords" ?
                        "linear-gradient(90deg, #86efac 50%, #10b981 50%)" :
                        card.title === "A.I. Snip" ?
                          "linear-gradient(90deg, #c4b5fd 50%, #8b5cf6 50%)" :
                          card.title === "Top 3" ?
                            "linear-gradient(90deg, #fde047 50%, #eab308 50%)" :
                            card.title === "Top 10" ?
                              "linear-gradient(90deg, #fdba74 50%, #f59e0b 50%)" :
                              card.title === "Top 20" ?
                                "linear-gradient(90deg, #fca5a5 50%, #f97316 50%)" : "#6b7280"
                  }}></div>
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {card.title}
                  </CardTitle>
                </div>
                <InfoIcon className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
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
              )}
            </CardContent>
          </Card>
        ))}
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 80]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={3} stroke="#eab308" strokeDasharray="3 3" />
                  <ReferenceLine y={10} stroke="#f59e0b" strokeDasharray="3 3" />
                  <ReferenceLine y={20} stroke="#f97316" strokeDasharray="3 3" />
                  
                  {compareMode ? (
                    <>
                      {/* Period 1 lines */}
                      <Line
                        type="monotone"
                        dataKey="top3_p1"
                        stroke="#fde047"
                        strokeWidth={2}
                        dot={{ fill: "#fde047", strokeWidth: 2, r: 4 }}
                        name="Top 3 (Period 1)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10_p1"
                        stroke="#fdba74"
                        strokeWidth={2}
                        dot={{ fill: "#fdba74", strokeWidth: 2, r: 4 }}
                        name="Top 10 (Period 1)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20_p1"
                        stroke="#fca5a5"
                        strokeWidth={2}
                        dot={{ fill: "#fca5a5", strokeWidth: 2, r: 4 }}
                        name="Top 20 (Period 1)"
                      />
                      {/* Period 2 lines */}
                      <Line
                        type="monotone"
                        dataKey="top3_p2"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
                        name="Top 3 (Period 2)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10_p2"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        name="Top 10 (Period 2)"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20_p2"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                        name="Top 20 (Period 2)"
                      />
                    </>
                  ) : (
                    <>
                      <Line
                        type="monotone"
                        dataKey="top3"
                        stroke="#eab308"
                        strokeWidth={2}
                        dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
                        name="Top 3"
                      />
                      <Line
                        type="monotone"
                        dataKey="top10"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        name="Top 10"
                      />
                      <Line
                        type="monotone"
                        dataKey="top20"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                        name="Top 20"
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center text-xs text-gray-500 mt-2">
              {compareMode ? (
                <span>Nov 1 - Dec 1, 2024 vs Jan 1 - Feb 1, 2025</span>
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