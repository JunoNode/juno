// jest.setup.js

import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch'; // ensures fetch is available in tests
import 'jest-canvas-mock'; // mock canvas for chart components if used

// Optional: silence act() warnings for async components
// jest.spyOn(console, 'error').mockImplementation((msg) => {
//   if (msg.includes('not wrapped in act')) return;
//   console.error(msg);
// });
