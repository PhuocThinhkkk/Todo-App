import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TaskForm } from '@/components/tasks/task-form'
import { Task } from '@/lib/types'
import { TaskService } from '@/lib/services/task-service'
import { useTaskStore } from '@/lib/stores/task-store'
import { useAuthStore } from '@/lib/stores/auth-store'
import toast from 'react-hot-toast'

jest.mock('@/lib/services/task-service')
jest.mock('@/lib/stores/task-store')
jest.mock('@/lib/stores/auth-store')
jest.mock('react-hot-toast')

describe('TaskForm', () => {
  const mockUser = {
    uid: 'user-1',
    email: 'test@example.com',
  }

  const mockAddTask = jest.fn()
  const mockUpdateTask = jest.fn()
  const mockOnClose = jest.fn()
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
    })
  })

  it('renders create form with empty fields', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    expect(screen.getByText('Create New Task')).toBeInTheDocument()
    expect(screen.getByLabelText(/Title/i)).toHaveValue('')
    expect(screen.getByLabelText(/Description/i)).toHaveValue('')
  })

  it('renders edit form with task data', () => {
    const mockTask: Task = {
      id: 'task-1',
      userId: 'user-1',
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      status: 'pending',
      dueDate: new Date('2024-12-31'),
      category: 'Work',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    render(<TaskForm task={mockTask} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    expect(screen.getByText('Edit Task')).toBeInTheDocument()
    expect(screen.getByLabelText(/Title/i)).toHaveValue('Test Task')
    expect(screen.getByLabelText(/Description/i)).toHaveValue('Test Description')
    expect(screen.getByLabelText(/Category/i)).toHaveValue('Work')
  })

  it('creates new task on form submission', async () => {
    ;(TaskService.createTask as jest.Mock).mockResolvedValue('new-task-id')

    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    await waitFor(() => {
      expect(TaskService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Task',
          userId: 'user-1',
          status: 'pending',
        })
      )
      expect(mockAddTask).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith('Task created successfully!')
      expect(mockOnSuccess).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('updates existing task on form submission', async () => {
    const mockTask: Task = {
      id: 'task-1',
      userId: 'user-1',
      title: 'Old Title',
      description: 'Old Description',
      priority: 'low',
      status: 'pending',
      dueDate: new Date('2024-11-30'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ;(TaskService.updateTask as jest.Mock).mockResolvedValue(undefined)

    render(<TaskForm task={mockTask} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Updated Title' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /Update/i }).closest('form')!)

    await waitFor(() => {
      expect(TaskService.updateTask).toHaveBeenCalledWith(
        'task-1',
        expect.objectContaining({
          title: 'Updated Title',
        })
      )
      expect(mockUpdateTask).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith('Task updated successfully!')
      expect(mockOnSuccess).toHaveBeenCalled()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('validates required title field', async () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument()
    })
  })

  it('validates required due date field', async () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Task' },
    })
    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText(/Due date is required/i)).toBeInTheDocument()
    })
  })

  it('closes form when cancel button is clicked', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes form when X button is clicked', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const closeButton = screen.getByRole('button', { name: '' }).closest('button')
    if (closeButton) fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('handles priority selection', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const prioritySelect = screen.getByLabelText(/Priority/i)
    fireEvent.change(prioritySelect, { target: { value: 'high' } })

    expect(prioritySelect).toHaveValue('high')
  })

  it('handles description input', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const descriptionField = screen.getByLabelText(/Description/i)
    fireEvent.change(descriptionField, { target: { value: 'Test description' } })

    expect(descriptionField).toHaveValue('Test description')
  })

  it('handles category input', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const categoryField = screen.getByLabelText(/Category/i)
    fireEvent.change(categoryField, { target: { value: 'Personal' } })

    expect(categoryField).toHaveValue('Personal')
  })

  it('shows loading state during submission', async () => {
    ;(TaskService.createTask as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve('new-id'), 100))
    )

    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    await waitFor(() => {
      expect(screen.getByText(/Saving.../i)).toBeInTheDocument()
    })
  })

  it('disables submit button during loading', async () => {
    ;(TaskService.createTask as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve('new-id'), 100))
    )

    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31' },
    })

    const submitButton = screen.getByRole('button', { name: /Create/i })
    fireEvent.submit(submitButton.closest('form')!)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  it('handles create task error', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    ;(TaskService.createTask as jest.Mock).mockRejectedValue(new Error('Failed'))

    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to save task')
      expect(mockOnSuccess).not.toHaveBeenCalled()
      expect(mockOnClose).not.toHaveBeenCalled()
    })

    consoleError.mockRestore()
  })

  it('handles update task error', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    const mockTask: Task = {
      id: 'task-1',
      userId: 'user-1',
      title: 'Old Title',
      priority: 'low',
      status: 'pending',
      dueDate: new Date('2024-11-30'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    ;(TaskService.updateTask as jest.Mock).mockRejectedValue(new Error('Failed'))

    render(<TaskForm task={mockTask} onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.submit(screen.getByRole('button', { name: /Update/i }).closest('form')!)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to save task')
    })

    consoleError.mockRestore()
  })

  it('does not submit when user is not available', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
    })

    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Task' },
    })
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2024-12-31' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /Create/i }).closest('form')!)

    expect(TaskService.createTask).not.toHaveBeenCalled()
  })

  it('sets default priority to medium', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    const prioritySelect = screen.getByLabelText(/Priority/i)
    expect(prioritySelect).toHaveValue('medium')
  })

  it('renders all priority options', () => {
    render(<TaskForm onClose={mockOnClose} onSuccess={mockOnSuccess} />)
    
    expect(screen.getByRole('option', { name: /Low/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /Medium/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /High/i })).toBeInTheDocument()
  })
})