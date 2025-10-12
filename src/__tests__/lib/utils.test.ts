import { formatDate, formatRelativeDate, getPriorityColor, getStatusColor, cn } from '@/lib/utils'

describe('Utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-03-15')
      const formatted = formatDate(date)
      
      expect(formatted).toMatch(/Mar 15, 2024/)
    })

    it('handles different months', () => {
      const date = new Date('2024-12-31')
      const formatted = formatDate(date)
      
      expect(formatted).toMatch(/Dec 31, 2024/)
    })

    it('handles leap year dates', () => {
      const date = new Date('2024-02-29')
      const formatted = formatDate(date)
      
      expect(formatted).toMatch(/Feb 29, 2024/)
    })
  })

  describe('formatRelativeDate', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-06-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('returns "Today" for current date', () => {
      const date = new Date('2024-06-15T15:00:00Z')
      expect(formatRelativeDate(date)).toBe('Today')
    })

    it('returns "Tomorrow" for next day', () => {
      const date = new Date('2024-06-16T12:00:00Z')
      expect(formatRelativeDate(date)).toBe('Tomorrow')
    })

    it('returns "Yesterday" for previous day', () => {
      const date = new Date('2024-06-14T12:00:00Z')
      expect(formatRelativeDate(date)).toBe('Yesterday')
    })

    it('returns "In X days" for future dates', () => {
      const date = new Date('2024-06-20T12:00:00Z')
      expect(formatRelativeDate(date)).toBe('In 5 days')
    })

    it('returns "X days ago" for past dates', () => {
      const date = new Date('2024-06-10T12:00:00Z')
      expect(formatRelativeDate(date)).toBe('5 days ago')
    })

    it('handles dates far in the future', () => {
      const date = new Date('2024-12-31T12:00:00Z')
      const result = formatRelativeDate(date)
      expect(result).toMatch(/In \d+ days/)
    })

    it('handles dates far in the past', () => {
      const date = new Date('2024-01-01T12:00:00Z')
      const result = formatRelativeDate(date)
      expect(result).toMatch(/\d+ days ago/)
    })
  })

  describe('getPriorityColor', () => {
    it('returns red classes for high priority', () => {
      expect(getPriorityColor('high')).toBe('text-red-600 bg-red-50 border-red-200')
    })

    it('returns yellow classes for medium priority', () => {
      expect(getPriorityColor('medium')).toBe('text-yellow-600 bg-yellow-50 border-yellow-200')
    })

    it('returns green classes for low priority', () => {
      expect(getPriorityColor('low')).toBe('text-green-600 bg-green-50 border-green-200')
    })
  })

  describe('getStatusColor', () => {
    it('returns green classes for completed status', () => {
      expect(getStatusColor('completed')).toBe('text-green-600 bg-green-50 border-green-200')
    })

    it('returns red classes for overdue status', () => {
      expect(getStatusColor('overdue')).toBe('text-red-600 bg-red-50 border-red-200')
    })

    it('returns blue classes for pending status', () => {
      expect(getStatusColor('pending')).toBe('text-blue-600 bg-blue-50 border-blue-200')
    })
  })

  describe('cn utility', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('base', false && 'conditional', 'always')).toBe('base always')
    })

    it('handles tailwind conflicts', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('handles empty inputs', () => {
      expect(cn()).toBe('')
    })

    it('handles undefined values', () => {
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2')
    })
  })
})