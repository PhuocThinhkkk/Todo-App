import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { signInWithPopup } from 'firebase/auth'
import SignInPage from '@/app/(auth)/signin/page'
import { UserService } from '@/lib/services/user-service'
import toast from 'react-hot-toast'

jest.mock('firebase/auth')
jest.mock('@/lib/services/user-service')
jest.mock('react-hot-toast')

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders sign in page with all elements', () => {
    render(<SignInPage />)
    
    expect(screen.getByText(/Organize Your Life with/i)).toBeInTheDocument()
    expect(screen.getByText(/TodoApp/i)).toBeInTheDocument()
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign in with your Google account/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continue with Google/i })).toBeInTheDocument()
  })

  it('displays feature list', () => {
    render(<SignInPage />)
    
    expect(screen.getByText(/Smart task organization/i)).toBeInTheDocument()
    expect(screen.getByText(/Progress tracking & analytics/i)).toBeInTheDocument()
    expect(screen.getByText(/Streak system for motivation/i)).toBeInTheDocument()
  })

  it('handles successful sign in for existing user', async () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
    }

    ;(signInWithPopup as jest.Mock).mockResolvedValue({
      user: mockUser,
    })
    ;(UserService.getUser as jest.Mock).mockResolvedValue({
      uid: 'test-uid',
      email: 'test@example.com',
    })

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled()
      expect(UserService.getUser).toHaveBeenCalledWith('test-uid')
      expect(toast.success).toHaveBeenCalledWith('Welcome back!')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles successful sign in for new user', async () => {
    const mockUser = {
      uid: 'new-uid',
      email: 'new@example.com',
      displayName: 'New User',
      photoURL: 'https://example.com/new-photo.jpg',
    }

    ;(signInWithPopup as jest.Mock).mockResolvedValue({
      user: mockUser,
    })
    ;(UserService.getUser as jest.Mock).mockResolvedValue(null)
    ;(UserService.createUser as jest.Mock).mockResolvedValue(undefined)

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(UserService.createUser).toHaveBeenCalledWith({
        uid: 'new-uid',
        email: 'new@example.com',
        displayName: 'New User',
        photoURL: 'https://example.com/new-photo.jpg',
      })
      expect(toast.success).toHaveBeenCalledWith('Welcome back!')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles sign in failure', async () => {
    const error = new Error('Sign in failed')
    ;(signInWithPopup as jest.Mock).mockRejectedValue(error)

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to sign in')
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  it('shows loading state during sign in', async () => {
    ;(signInWithPopup as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText(/Signing in.../i)).toBeInTheDocument()
    })
  })

  it('disables button during loading', async () => {
    ;(signInWithPopup as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(signInButton).toBeDisabled()
    })
  })

  it('handles missing user data gracefully', async () => {
    const mockUser = {
      uid: 'test-uid',
      email: null,
      displayName: null,
      photoURL: null,
    }

    ;(signInWithPopup as jest.Mock).mockResolvedValue({
      user: mockUser,
    })
    ;(UserService.getUser as jest.Mock).mockResolvedValue(null)
    ;(UserService.createUser as jest.Mock).mockResolvedValue(undefined)

    render(<SignInPage />)
    
    const signInButton = screen.getByRole('button', { name: /Continue with Google/i })
    fireEvent.click(signInButton)

    await waitFor(() => {
      expect(UserService.createUser).toHaveBeenCalledWith({
        uid: 'test-uid',
        email: '',
        displayName: '',
        photoURL: '',
      })
    })
  })

  it('displays terms of service text', () => {
    render(<SignInPage />)
    
    expect(screen.getByText(/By signing in, you agree to our Terms of Service and Privacy Policy/i)).toBeInTheDocument()
  })
})