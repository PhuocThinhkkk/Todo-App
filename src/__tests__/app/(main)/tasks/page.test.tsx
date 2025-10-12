import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TasksPage from '@/app/(main)/tasks/page'
import { useAuthStore } from '@/lib/stores/auth-store'
import { useTaskStore } from '@/lib/stores/task-store'
import { TaskService } from '@/lib/services/task-service'

jest.mock('@/lib/stores/auth-store')
jest.mock('@/lib/stores/task-store')
jest.mock('@/lib/services/task-service')

jest.mock('@/components/tasks/task-card', () => ({
  TaskCard: ({ task, onEdit }: any) => (
    <div data-testid={`task-card-${task.id}`}>
      {task.title}
      <button onClick={() => onEdit(task)}>Edit</button>
    </div>
  ),
}))

jest.mock('@/components/tasks/task-form', () => ({
  TaskForm: ({ task, onClose }: any) => (
    <div data-testid="task-form">
      {task ? `Editing ${task.title}` : 'New Task'}
      <button onClick={onClose}>Close Form</button>
    </div>
  ),
}))

describe('TasksPage', () => {
  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
  }

  const mockTasks = [
    {
      id: '1',
      userId: 'test-uid',
      title: 'Task 1',
      description: 'Description 1',
      priority: 'high' as const,
      status: 'pending' as const,
      dueDate: new Date('2024-12-31'),
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      userId: 'test-uid',
      title: 'Task 2',
      description: 'Description 2',
      priority: 'low' as const,
      status: 'completed' as const,
      dueDate: new Date('2024-11-30'),
      createdAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      userId: 'test-uid',
      title: 'Task 3',
      description: 'Description 3',
      priority: 'medium' as const,
      status: 'overdue' as const,
      dueDate: new Date('2024-10-01'),
      createdAt: new Date('2024-01-03'),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    })
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [],
      setTasks: jest.fn(),
    })
    ;(TaskService.updateOverdueTasks as jest.Mock).mockResolvedValue(undefined)
    ;(TaskService.getUserTasks as jest.Mock).mockResolvedValue([])
  })

  it('shows loading spinner initially', () => {
    render(<TasksPage />)
    
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('loads and displays tasks', async () => {
    ;(TaskService.getUserTasks as jest.Mock).mockResolvedValue(mockTasks)
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(screen.getByText('Task 3')).toBeInTheDocument()
    })
  })

  it('calls updateOverdueTasks on mount', async () => {
    render(<TasksPage />)

    await waitFor(() => {
      expect(TaskService.updateOverdueTasks).toHaveBeenCalledWith('test-uid')
    })
  })

  it('opens new task form when New Task button clicked', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [],
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const newTaskButton = screen.getByRole('button', { name: /New Task/i })
    fireEvent.click(newTaskButton)

    expect(screen.getByTestId('task-form')).toBeInTheDocument()
    expect(screen.getByText('New Task')).toBeInTheDocument()
  })

  it('opens edit form when task edit is triggered', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const editButton = screen.getAllByText('Edit')[0]
    fireEvent.click(editButton)

    expect(screen.getByTestId('task-form')).toBeInTheDocument()
    expect(screen.getByText('Editing Task 1')).toBeInTheDocument()
  })

  it('closes form when close button clicked', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: [],
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    const newTaskButton = screen.getByRole('button', { name: /New Task/i })
    fireEvent.click(newTaskButton)

    const closeButton = screen.getByText('Close Form')
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByTestId('task-form')).not.toBeInTheDocument()
    })
  })

  it('filters tasks by status - pending', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const pendingButton = screen.getByRole('button', { name: /Pending/i })
    fireEvent.click(pendingButton)

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument()
  })

  it('filters tasks by status - completed', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 2')).toBeInTheDocument()
    })

    const completedButton = screen.getByRole('button', { name: /Completed/i })
    fireEvent.click(completedButton)

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.queryByText('Task 3')).not.toBeInTheDocument()
  })

  it('filters tasks by status - overdue', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 3')).toBeInTheDocument()
    })

    const overdueButton = screen.getByRole('button', { name: /Overdue/i })
    fireEvent.click(overdueButton)

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('filters tasks by search query', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/Search tasks.../i)
    fireEvent.change(searchInput, { target: { value: 'Task 2' } })

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument()
    })
  })

  it('searches tasks by description', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/Search tasks.../i)
    fireEvent.change(searchInput, { target: { value: 'Description 3' } })

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
      expect(screen.getByText('Task 3')).toBeInTheDocument()
    })
  })

  it('combines filter and search', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const pendingButton = screen.getByRole('button', { name: /Pending/i })
    fireEvent.click(pendingButton)

    const searchInput = screen.getByPlaceholderText(/Search tasks.../i)
    fireEvent.change(searchInput, { target: { value: 'Task 1' } })

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument()
    })
  })

  it('shows all tasks when "All" filter is selected', async () => {
    ;(useTaskStore as unknown as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      setTasks: jest.fn(),
    })

    render(<TasksPage />)

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument()
    })

    const allButton = screen.getByRole('button', { name: /^All$/i })
    fireEvent.click(allButton)

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('handles error loading tasks gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    ;(TaskService.getUserTasks as jest.Mock).mockRejectedValue(new Error('Failed to load'))

    render(<TasksPage />)

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error loading tasks:', expect.any(Error))
    })

    consoleError.mockRestore()
  })

  it('does not load tasks when user is not available', () => {
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
    })

    render(<TasksPage />)

    expect(TaskService.updateOverdueTasks).not.toHaveBeenCalled()
    expect(TaskService.getUserTasks).not.toHaveBeenCalled()
  })
})