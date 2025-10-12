# Testing Documentation

This document provides comprehensive information about the testing setup for the TodoApp project.

## Overview

The project uses Jest and React Testing Library for comprehensive unit and integration testing. Tests are written for all modified components and pages to ensure code quality and prevent regressions.

## Installation

To install all testing dependencies, run:

```bash
npm install --save-dev @testing-library/react@14.1.2 @testing-library/jest-dom@6.1.5 @testing-library/user-event@14.5.1 jest@29.7.0 jest-environment-jsdom@29.7.0 @types/jest@29.5.11 --legacy-peer-deps
```

Note: Use `--legacy-peer-deps` flag due to React 19 compatibility.

## Running Tests

### Available Scripts

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

### Files Tested (9 test files, 120+ test cases)

#### Pages (42 tests)
1. **signin/page.test.tsx** (10 tests)
   - Google authentication flow
   - User creation and login
   - Error handling and loading states

2. **profile/page.test.tsx** (11 tests)
   - User profile display
   - Statistics rendering
   - Achievement tracking

3. **tasks/page.test.tsx** (17 tests)
   - Task list display
   - Filtering and search
   - Form interactions

4. **tasks/new/page.test.tsx** (4 tests)
   - Task form rendering
   - Navigation handling

#### Components (62 tests)

5. **activity-chart.test.tsx** (7 tests)
   - Chart rendering
   - Data visualization
   - Edge cases

6. **stats-cards.test.tsx** (9 tests)
   - Statistics display
   - Value formatting
   - Layout testing

7. **task-card.test.tsx** (18 tests)
   - Task display
   - Completion handling
   - Deletion handling
   - Error states

8. **task-form.test.tsx** (21 tests)
   - Form creation and editing
   - Validation
   - Submission handling
   - Error handling

#### Utilities (16 tests)

9. **utils.test.ts** (16 tests)
   - Date formatting
   - Color utilities
   - Class name merging

## Test Structure