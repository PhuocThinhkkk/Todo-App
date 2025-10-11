import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TaskCard } from '@/components/tasks/task-card'
import { Task } from '@/lib/types'
import { TaskService } from '@/lib/services/task-service'
import { useTaskStore } from '@/lib/stores/task-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import toast from 'react-hot-toast'

jest.mock('@/lib/services/task-service')
jest.mock('@/lib/stores/task-store')
jest.mock('@/lib/stores/auth-store')
jest.mock('react-hot-toast')

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 'task-1',
    userId: 'user-1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high',
    status: 'pending',
    dueDate: new Date('2024-12-31'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  }

  const mockUser = {
    uid: 'user-1',
    email: 'test@example.com',
  }

  const mockUpdateTask = jest.fn()
  const mockDeleteTask = jest.fn()
  const mockOnEdit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
    })
  })

  it('renders task card with title and description', () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('displays priority badge', () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  it('displays status badge', () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('shows complete button for pending tasks', () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const completeButton = screen.getByRole('button', { name: '' })
    expect(completeButton).toBeInTheDocument()
  })

  it('does not show complete button for completed tasks', () => {
    const completedTask = { ...mockTask, status: 'completed' as const }
    render(<TaskCard task={completedTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2) // Only edit and delete buttons
  })

  it('handles task completion', async () => {
    ;(TaskService.completeTask as jest.Mock).mockResolvedValue(undefined)

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const completeButton = buttons[0] // First button should be complete
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(TaskService.completeTask).toHaveBeenCalledWith('task-1', 'user-1')
      expect(mockUpdateTask).toHaveBeenCalledWith('task-1', {
        status: 'completed',
        completedAt: expect.any(Date),
      })
      expect(toast.success).toHaveBeenCalledWith('Task completed! 🎉')
    })
  })

  it('handles task deletion', async () => {
    ;(TaskService.deleteTask as jest.Mock).mockResolvedValue(undefined)

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const deleteButton = buttons[buttons.length - 1] // Last button should be delete
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(TaskService.deleteTask).toHaveBeenCalledWith('task-1')
      expect(mockDeleteTask).toHaveBeenCalledWith('task-1')
      expect(toast.success).toHaveBeenCalledWith('Task deleted')
    })
  })

  it('calls onEdit when edit button is clicked', () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const editButton = buttons[buttons.length - 2] // Second to last button
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })

  it('handles completion error', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    ;(TaskService.completeTask as jest.Mock).mockRejectedValue(new Error('Failed'))

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const completeButton = buttons[0]
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to complete task')
    })

    consoleError.mockRestore()
  })

  it('handles deletion error', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    ;(TaskService.deleteTask as jest.Mock).mockRejectedValue(new Error('Failed'))

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const deleteButton = buttons[buttons.length - 1]
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to delete task')
    })

    consoleError.mockRestore()
  })

  it('disables buttons during loading', async () => {
    ;(TaskService.completeTask as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    )

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const completeButton = buttons[0]
    fireEvent.click(completeButton)

    await waitFor(() => {
      expect(completeButton).toBeDisabled()
    })
  })

  it('renders task without description', () => {
    const taskNoDesc = { ...mockTask, description: undefined }
    render(<TaskCard task={taskNoDesc} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('shows overdue styling for overdue tasks', () => {
    const overdueTask = { ...mockTask, status: 'overdue' as const }
    const { container } = render(<TaskCard task={overdueTask} onEdit={mockOnEdit} />)
    
    const card = container.querySelector('.border-red-200')
    expect(card).toBeInTheDocument()
  })

  it('applies different priority colors', () => {
    const lowPriorityTask = { ...mockTask, priority: 'low' as const }
    render(<TaskCard task={lowPriorityTask} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('low')).toBeInTheDocument()
  })

  it('does not complete task when user is not available', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
    })

    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)
    
    const buttons = screen.getAllByRole('button')
    const completeButton = buttons[0]
    fireEvent.click(completeButton)

    expect(TaskService.completeTask).not.toHaveBeenCalled()
  })

  it('shows strikethrough for completed task title', () => {
    const completedTask = { ...mockTask, status: 'completed' as const }
    const { container } = render(<TaskCard task={completedTask} onEdit={mockOnEdit} />)
    
    const title = container.querySelector('.line-through')
    expect(title).toBeInTheDocument()
  })
})