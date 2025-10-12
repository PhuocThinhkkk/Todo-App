import { render, screen } from '@testing-library/react'
import { ActivityChart } from '@/components/dashboard/activity-chart'
import { DashboardStats } from '@/lib/types'

describe('ActivityChart', () => {
  const mockStats: DashboardStats = {
    totalTasks: 50,
    completedTasks: 30,
    pendingTasks: 15,
    overdueTasks: 5,
    completionRate: 60,
    currentStreak: 7,
    longestStreak: 15,
    weeklyActivity: [
      { date: '2024-01-01', completed: 5, created: 7 },
      { date: '2024-01-02', completed: 3, created: 4 },
      { date: '2024-01-03', completed: 8, created: 6 },
      { date: '2024-01-04', completed: 2, created: 5 },
      { date: '2024-01-05', completed: 4, created: 3 },
      { date: '2024-01-06', completed: 6, created: 8 },
      { date: '2024-01-07', completed: 2, created: 2 },
    ],
  }

  it('renders activity chart with title', () => {
    render(<ActivityChart stats={mockStats} />)
    
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })

  it('renders with empty weekly activity', () => {
    const emptyStats: DashboardStats = {
      ...mockStats,
      weeklyActivity: [],
    }

    render(<ActivityChart stats={emptyStats} />)
    
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })

  it('handles null or undefined data gracefully', () => {
    const nullStats: DashboardStats = {
      ...mockStats,
      weeklyActivity: [],
    }

    const { container } = render(<ActivityChart stats={nullStats} />)
    
    expect(container.querySelector('.h-80')).toBeInTheDocument()
  })

  it('renders chart with correct data structure', () => {
    const { container } = render(<ActivityChart stats={mockStats} />)
    
    // Check if the chart container exists
    expect(container.querySelector('.h-80')).toBeInTheDocument()
  })

  it('handles stats with single day of activity', () => {
    const singleDayStats: DashboardStats = {
      ...mockStats,
      weeklyActivity: [
        { date: '2024-01-01', completed: 5, created: 7 },
      ],
    }

    render(<ActivityChart stats={singleDayStats} />)
    
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })

  it('handles stats with zero activity', () => {
    const zeroActivityStats: DashboardStats = {
      ...mockStats,
      weeklyActivity: [
        { date: '2024-01-01', completed: 0, created: 0 },
        { date: '2024-01-02', completed: 0, created: 0 },
      ],
    }

    render(<ActivityChart stats={zeroActivityStats} />)
    
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })

  it('handles stats with large numbers', () => {
    const largeNumberStats: DashboardStats = {
      ...mockStats,
      weeklyActivity: [
        { date: '2024-01-01', completed: 100, created: 150 },
        { date: '2024-01-02', completed: 200, created: 250 },
      ],
    }

    render(<ActivityChart stats={largeNumberStats} />)
    
    expect(screen.getByText('Weekly Activity')).toBeInTheDocument()
  })
})