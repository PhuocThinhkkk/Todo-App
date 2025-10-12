import { render, screen } from '@testing-library/react'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { DashboardStats } from '@/lib/types'

describe('StatsCards', () => {
  const mockStats: DashboardStats = {
    totalTasks: 50,
    completedTasks: 30,
    pendingTasks: 15,
    overdueTasks: 5,
    completionRate: 60,
    currentStreak: 7,
    longestStreak: 15,
    weeklyActivity: [],
  }

  it('renders all stat cards', () => {
    render(<StatsCards stats={mockStats} />)
    
    expect(screen.getByText('Total Tasks')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Overdue')).toBeInTheDocument()
  })

  it('displays correct stat values', () => {
    render(<StatsCards stats={mockStats} />)
    
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders with zero values', () => {
    const zeroStats: DashboardStats = {
      ...mockStats,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      overdueTasks: 0,
    }

    render(<StatsCards stats={zeroStats} />)
    
    const zeroValues = screen.getAllByText('0')
    expect(zeroValues).toHaveLength(4)
  })

  it('renders with large numbers', () => {
    const largeStats: DashboardStats = {
      ...mockStats,
      totalTasks: 1000,
      completedTasks: 999,
      pendingTasks: 1,
      overdueTasks: 0,
    }

    render(<StatsCards stats={largeStats} />)
    
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('999')).toBeInTheDocument()
  })

  it('applies correct styling classes to cards', () => {
    const { container } = render(<StatsCards stats={mockStats} />)
    
    const cards = container.querySelectorAll('.hover\\:shadow-md')
    expect(cards).toHaveLength(4)
  })

  it('displays icons for each card', () => {
    const { container } = render(<StatsCards stats={mockStats} />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(4)
  })

  it('handles negative values gracefully', () => {
    const negativeStats: DashboardStats = {
      ...mockStats,
      totalTasks: -1,
      completedTasks: -2,
      pendingTasks: -3,
      overdueTasks: -4,
    }

    render(<StatsCards stats={negativeStats} />)
    
    expect(screen.getByText('-1')).toBeInTheDocument()
    expect(screen.getByText('-2')).toBeInTheDocument()
  })

  it('renders in grid layout', () => {
    const { container } = render(<StatsCards stats={mockStats} />)
    
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
  })
})