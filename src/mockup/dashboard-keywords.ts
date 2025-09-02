import { DashboardKeywordData, ChartDataPoint, SERPData } from './types'

export const mockDashboardKeywords: DashboardKeywordData[] = [
	{
		id: "1",
		keyword: "target keyword",
		url: "info@business-website...",
		// Nov 1 - Dec 1, 2024
		bestPosition1: 7,
		nov1Position: 3,
		dec1Position: 4,
		diff1: 4,
		diffTrend1: "up",
		aiStatus1: "in",
		// Jan 1 - Feb 1, 2025
		bestPosition2: 4,
		jan1Position: 5,
		feb1Position: 10,
		diff2: 5,
		diffTrend2: "down",
		aiStatus2: "in"
	},
	{
		id: "2",
		keyword: "target keyword",
		url: "info@business-website...",
		// Nov 1 - Dec 1, 2024
		bestPosition1: 9,
		nov1Position: 11,
		dec1Position: 2,
		diff1: 2,
		diffTrend1: "down",
		aiStatus1: "out",
		// Jan 1 - Feb 1, 2025
		bestPosition2: 2,
		jan1Position: 10,
		feb1Position: 2,
		diff2: 8,
		diffTrend2: "up",
		aiStatus2: "in"
	},
	{
		id: "3",
		keyword: "target keyword",
		url: "info@business-website...",
		// Nov 1 - Dec 1, 2024
		bestPosition1: 7,
		nov1Position: 3,
		dec1Position: 4,
		diff1: 4,
		diffTrend1: "up",
		aiStatus1: "in",
		// Jan 1 - Feb 1, 2025
		bestPosition2: 4,
		jan1Position: 5,
		feb1Position: 10,
		diff2: 5,
		diffTrend2: "down",
		aiStatus2: "in"
	},
	{
		id: "4",
		keyword: "target keyword",
		url: "info@business-website...",
		// Nov 1 - Dec 1, 2024
		bestPosition1: 9,
		nov1Position: 11,
		dec1Position: 2,
		diff1: 2,
		diffTrend1: "down",
		aiStatus1: "out",
		// Jan 1 - Feb 1, 2025
		bestPosition2: 2,
		jan1Position: 10,
		feb1Position: 2,
		diff2: 8,
		diffTrend2: "up",
		aiStatus2: "in"
	},
	{
		id: "5",
		keyword: "target keyword",
		url: "info@business-website...",
		// Nov 1 - Dec 1, 2024
		bestPosition1: 9,
		nov1Position: 11,
		dec1Position: 2,
		diff1: 2,
		diffTrend1: "down",
		aiStatus1: "out",
		// Jan 1 - Feb 1, 2025
		bestPosition2: 2,
		jan1Position: 10,
		feb1Position: 2,
		diff2: 8,
		diffTrend2: "up",
		aiStatus2: "in"
	}
]

export const mockChartData: ChartDataPoint[] = [
	{ date: 'Nov 1', current: 45, previous: 55, label: 'Nov 1, 2024' },
	{ date: 'Nov 5', current: 42, previous: 52, label: 'Nov 5, 2024' },
	{ date: 'Nov 10', current: 70, previous: 62, label: 'Nov 10, 2024' },
	{ date: 'Nov 15', current: 35, previous: 45, label: 'Nov 15, 2024' },
	{ date: 'Nov 20', current: 45, previous: 50, label: 'Nov 20, 2024' },
	{ date: 'Nov 25', current: 40, previous: 48, label: 'Nov 25, 2024' },
	{ date: 'Dec 1', current: 50, previous: 55, label: 'Dec 1, 2024' },
	{ date: 'Dec 5', current: 38, previous: 45, label: 'Dec 5, 2024' },
	{ date: 'Dec 10', current: 42, previous: 50, label: 'Dec 10, 2024' },
	{ date: 'Dec 15', current: 35, previous: 40, label: 'Dec 15, 2024' },
	{ date: 'Dec 20', current: 48, previous: 52, label: 'Dec 20, 2024' },
	{ date: 'Dec 25', current: 40, previous: 45, label: 'Dec 25, 2024' },
	{ date: 'Jan 1', current: 45, previous: 50, label: 'Jan 1, 2025' },
	{ date: 'Jan 5', current: 38, previous: 42, label: 'Jan 5, 2025' },
	{ date: 'Jan 10', current: 35, previous: 38, label: 'Jan 10, 2025' },
	{ date: 'Jan 15', current: 33, previous: 35, label: 'Jan 15, 2025' },
	{ date: 'Jan 20', current: 40, previous: 42, label: 'Jan 20, 2025' },
	{ date: 'Jan 25', current: 45, previous: 48, label: 'Jan 25, 2025' },
	{ date: 'Jan 30', current: 50, previous: 52, label: 'Jan 30, 2025' },
	{ date: 'Feb 1', current: 48, previous: 50, label: 'Feb 1, 2025' }
]

export const mockSERPData: SERPData = {
	urls: [
		"https://isleys.com/plumbing/repair/",
		"https://www.yelp.com/search?find_desc=Emergency+Plumber&find_loc=Gilbert%2C+AZ",
		"https://www.cureallplumbing.com/24-hr-emergency-plumber",
		"https://www.emergencyplumbingexpert.com/gilbert-az",
		"https://iriverlandscorplumbing.com/plumbers-gilbert-az/",
		"https://www.rotorooter.com/plumbing/emergency-plumber/",
		"https://www.plumbingmedic.net/plumbing/emergency-repairs",
		"https://www.angi.com/near-me/emergency-plumber/",
		"https://publicserviceplumbers.com/plumbing",
		"https://groundscorplumbingco.com/plumbing/gilbert/"
	]
}
