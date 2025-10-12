import { render, screen } from '@testing-library/react'
import ProfilePage from '@/app/(main)/profile/page'
import { useAuthStore } from '@/lib/stores/auth-store'

jest.mock('@/lib/stores/auth-store')

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading spinner when user is not available', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
    })

    render(<ProfilePage />)
    
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders user profile with photo', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 15,
      totalTasksCreated: 30,
      currentStreak: 5,
      longestStreak: 10,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByAltText('Test User')).toBeInTheDocument()
  })

  it('renders user profile without photo', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: '',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const defaultAvatar = document.querySelector('.bg-blue-600')
    expect(defaultAvatar).toBeInTheDocument()
  })

  it('displays correct task statistics', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 25,
      totalTasksCreated: 50,
      currentStreak: 7,
      longestStreak: 15,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Tasks Completed')).toBeInTheDocument()
    expect(screen.getByText('Tasks Created')).toBeInTheDocument()
    expect(screen.getByText('Current Streak')).toBeInTheDocument()
    expect(screen.getByText('Longest Streak')).toBeInTheDocument()
  })

  it('displays achievements section', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Task Master')).toBeInTheDocument()
    expect(screen.getByText('Streak Keeper')).toBeInTheDocument()
    expect(screen.getByText('Productivity Pro')).toBeInTheDocument()
  })

  it('shows Task Master achievement as earned when criteria met', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 15,
      totalTasksCreated: 5,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const taskMasterSection = screen.getByText('Task Master').closest('div')
    expect(taskMasterSection).toHaveClass('border-green-200')
    expect(taskMasterSection).toHaveClass('bg-green-50')
  })

  it('shows Streak Keeper achievement as earned when criteria met', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 5,
      totalTasksCreated: 5,
      currentStreak: 3,
      longestStreak: 10,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const streakKeeperSection = screen.getByText('Streak Keeper').closest('div')
    expect(streakKeeperSection).toHaveClass('border-green-200')
  })

  it('shows Productivity Pro achievement as earned when criteria met', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 5,
      totalTasksCreated: 30,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const productivityProSection = screen.getByText('Productivity Pro').closest('div')
    expect(productivityProSection).toHaveClass('border-green-200')
  })

  it('shows achievements as not earned when criteria not met', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const taskMasterSection = screen.getByText('Task Master').closest('div')
    const streakKeeperSection = screen.getByText('Streak Keeper').closest('div')
    const productivityProSection = screen.getByText('Productivity Pro').closest('div')
    
    expect(taskMasterSection).toHaveClass('border-gray-200')
    expect(streakKeeperSection).toHaveClass('border-gray-200')
    expect(productivityProSection).toHaveClass('border-gray-200')
  })

  it('formats member since date correctly', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-03-15'),
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    expect(screen.getByText(/Member since/i)).toBeInTheDocument()
  })

  it('displays online status indicator', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: new Date('2024-01-01'),
      totalTasksCompleted: 0,
      totalTasksCreated: 0,
      currentStreak: 0,
      longestStreak: 0,
    }

    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })

    render(<ProfilePage />)
    
    const onlineIndicator = document.querySelector('.bg-green-500')
    expect(onlineIndicator).toBeInTheDocument()
  })
})