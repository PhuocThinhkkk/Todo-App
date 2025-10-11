import { render, screen } from '@testing-library/react'
import NewTaskPage from '@/app/(main)/tasks/new/page'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

jest.mock('@/components/tasks/task-form', () => ({
  TaskForm: ({ onClose, onSuccess }: any) => (
    <div data-testid="task-form">
      <button onClick={onClose}>Close</button>
      <button onClick={onSuccess}>Success</button>
    </div>
  ),
}))

describe('NewTaskPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders task form', () => {
    render(<NewTaskPage />)
    
    expect(screen.getByTestId('task-form')).toBeInTheDocument()
  })

  it('navigates to tasks page on close', () => {
    render(<NewTaskPage />)
    
    const closeButton = screen.getByText('Close')
    closeButton.click()

    expect(mockPush).toHaveBeenCalledWith('/tasks')
  })

  it('navigates to tasks page on success', () => {
    render(<NewTaskPage />)
    
    const successButton = screen.getByText('Success')
    successButton.click()

    expect(mockPush).toHaveBeenCalledWith('/tasks')
  })

  it('passes correct props to TaskForm', () => {
    const { container } = render(<NewTaskPage />)
    
    expect(container.querySelector('[data-testid="task-form"]')).toBeInTheDocument()
  })
})