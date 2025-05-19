// Check if we should skip test imports
const skipTests = import.meta.env.VITE_SKIP_TESTS === 'true';

// Only import test libraries if we're not skipping tests
import React from 'react';

// Conditionally import test dependencies
let vitest = {};
let testingLibrary = {};
let jestDomMatchers = {};

if (!skipTests) {
  vitest = await import('vitest');
  testingLibrary = await import('@testing-library/react');
  jestDomMatchers = await import('@testing-library/jest-dom/matchers');
}

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock getComputedStyle
window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn(),
}));

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => 
      React.createElement('div', props, children),
    button: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => 
      React.createElement('button', props, children),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLElement.prototype.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock window.getComputedStyle
window.getComputedStyle = vi.fn().mockImplementation(() => ({
  getPropertyValue: vi.fn(),
}));

// Mock window.requestAnimationFrame
window.requestAnimationFrame = vi.fn().mockImplementation(cb => setTimeout(cb, 0));

// Mock window.cancelAnimationFrame
window.cancelAnimationFrame = vi.fn();
