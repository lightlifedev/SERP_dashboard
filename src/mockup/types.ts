// Shared types for mock/mockup data used across the app

export type ScheduleType = 'Manually' | 'Weekly' | 'Monthly'

export interface ScheduleInfo {
	type: ScheduleType
	details?: string
	nextRun?: string
	icon?: string
}

export interface ImprovedKeywords {
	current: number
	total: number
}

export interface AveragePosition {
	current: number
	change: number
}

export interface OrganicPositionDistribution {
	'1-3': number
	'4-10': number
	'11-20': number
	'21-50': number
	'51-100': number
}

export type ScanStatus = 'Active' | 'Paused'

export interface KeywordRow {
	id: number
	domain: string
	schedule: ScheduleInfo
	improvedKW: ImprovedKeywords
	avgPosition: AveragePosition
	opd: OrganicPositionDistribution
	status: ScanStatus
	lastUpdated: string
	labels: string[]
}

// Dashboard Keywords Table Types
export type TrendDirection = 'up' | 'down'
export type AIStatus = 'in' | 'out'

export interface DashboardKeywordData {
	id: string
	keyword: string
	url: string
	// Nov 1 - Dec 1, 2024
	bestPosition1: number
	nov1Position: number
	dec1Position: number
	diff1: number
	diffTrend1: TrendDirection
	aiStatus1: AIStatus
	// Jan 1 - Feb 1, 2025
	bestPosition2: number
	jan1Position: number
	feb1Position: number
	diff2: number
	diffTrend2: TrendDirection
	aiStatus2: AIStatus
}

export interface ChartDataPoint {
	date: string
	current: number
	previous: number
	label: string
}

export interface SERPData {
	urls: string[]
}

// OPD Chart Types
export interface OPDChartDataPoint {
	range: string
	percentage: number
	color: string
}

export interface OPDChartConfig {
	radius: number
	innerRadius: number
	gapAngle: number
}
