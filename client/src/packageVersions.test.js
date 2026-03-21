const fc = require('fast-check');
const semver = require('semver');
const packageJson = require('../package.json');

const TARGET_VERSIONS = {
  'react': '19.0.0',
  'react-dom': '19.0.0',
  '@testing-library/react': '16.0.0',
  '@testing-library/user-event': '14.0.0',
  '@testing-library/jest-dom': '6.0.0',
  'web-vitals': '4.0.0',
  'onnxruntime-web': '1.20.0',
  'socket.io-client': '4.8.0',
};

describe('package.json version ranges are satisfied', () => {
  test('each managed package declares a range that satisfies the minimum target version', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.keys(TARGET_VERSIONS)),
        (packageName) => {
          const allDeps = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
          };
          const declaredRange = allDeps[packageName];
          const minTarget = TARGET_VERSIONS[packageName];

          expect(declaredRange).toBeDefined();

          const minSatisfying = semver.minVersion(declaredRange);
          expect(minSatisfying).not.toBeNull();
          expect(semver.gte(minSatisfying.version, minTarget)).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});
