import { render } from '@testing-library/react';
import fc from 'fast-check';
import App from './App';

test('App renders without throwing', () => {
  expect(() => render(<App />)).not.toThrow();
});

describe('App component renders without error', () => {
  test('rendering App in jsdom completes without throwing for any invocation', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        expect(() => render(<App />)).not.toThrow();
      }),
      { numRuns: 100 },
    );
  });
});
