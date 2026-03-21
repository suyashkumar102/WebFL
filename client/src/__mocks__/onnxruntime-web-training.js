// Stub for onnxruntime-web/training — the /training subpath was removed in
// onnxruntime-web@1.20.0. Training functionality requires a browser WASM
// environment and cannot run in jsdom. This stub allows the test suite to
// import modules that depend on onnxruntime-web/training without crashing.
const ort = {
  env: { wasm: { wasmPaths: '' } },
  TrainingSession: { create: async () => ({}) },
};

module.exports = ort;
