import { KeywordRow, OPDChartDataPoint, OPDChartConfig } from './types'

export const mockKeywords: KeywordRow[] = [
	{
		id: 1,
		domain: 'business-domain1.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 5, total: 10 },
		avgPosition: { current: 60, change: -8 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7'],
	},
	{
		id: 2,
		domain: 'business-domain2.com',
		schedule: { type: 'Weekly', details: 'Tue, 12:30PM', nextRun: 'Tue, Apr 15, 2025 12:30PM' },
		improvedKW: { current: 3, total: 7 },
		avgPosition: { current: 33, change: 2 },
		opd: { '1-3': 35.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 8.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 3,
		domain: 'business-domain3.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 5, total: 10 },
		avgPosition: { current: 60, change: -6 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
	},
	{
		id: 4,
		domain: 'business-domain4.com',
		schedule: { type: 'Weekly', details: 'Tue, 12:30PM', nextRun: 'Tue, Apr 15, 2025 12:30PM' },
		improvedKW: { current: 3, total: 7 },
		avgPosition: { current: 33, change: 2 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 5,
		domain: 'business-domain5.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 6, total: 17 },
		avgPosition: { current: 23, change: 2 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Paused',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 6,
		domain: 'business-domain6.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 5, total: 10 },
		avgPosition: { current: 60, change: -8 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3', 'label4'],
	},
	{
		id: 7,
		domain: 'business-domain7.com',
		schedule: { type: 'Weekly', details: 'Tue, 12:30PM', nextRun: 'Tue, Apr 15, 2025 12:30PM' },
		improvedKW: { current: 3, total: 7 },
		avgPosition: { current: 33, change: 2 },
		opd: { '1-3': 35.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 8.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 8,
		domain: 'business-domain8.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 5, total: 10 },
		avgPosition: { current: 60, change: -6 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 9,
		domain: 'business-domain9.com',
		schedule: { type: 'Weekly', details: 'Tue, 12:30PM', nextRun: 'Tue, Apr 15, 2025 12:30PM' },
		improvedKW: { current: 3, total: 7 },
		avgPosition: { current: 33, change: 2 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Active',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
	{
		id: 10,
		domain: 'business-domain10.com',
		schedule: { type: 'Manually', icon: '⏸' },
		improvedKW: { current: 6, total: 17 },
		avgPosition: { current: 23, change: 2 },
		opd: { '1-3': 8.8, '4-10': 11.8, '11-20': 22.9, '21-50': 21.5, '51-100': 35.0 },
		status: 'Paused',
		lastUpdated: 'October 5, 2024',
		labels: ['label1', 'label2', 'label3'],
	},
]

// OPD Chart Data
export const opdChartConfig: OPDChartConfig = {
	radius: 22,
	innerRadius: 17,
	gapAngle: 4
}

export const opdChartColors = {
	'1-3': '#00F281',
	'4-10': '#00D572',
	'11-20': '#ffc300',
	'21-50': '#f3851e',
	'51-100': '#f54750'
}

export const createOPDChartData = (opd: any): OPDChartDataPoint[] => [
	{ range: "1-3", percentage: opd["1-3"], color: opdChartColors["1-3"] },
	{ range: "4-10", percentage: opd["4-10"], color: opdChartColors["4-10"] },
	{ range: "11-20", percentage: opd["11-20"], color: opdChartColors["11-20"] },
	{ range: "21-50", percentage: opd["21-50"], color: opdChartColors["21-50"] },
	{ range: "51-100", percentage: opd["51-100"], color: opdChartColors["51-100"] }
]
