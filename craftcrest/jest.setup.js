import '@testing-library/jest-dom'
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
