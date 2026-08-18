'use strict';

module.exports = async (modPath) => {
  try {
    const mod = require(modPath);
    return mod && mod.default ? mod.default : mod;
  } catch (error) {
    // Fallback to import() if the runtime supports native ESM.
    // `ERR_REQUIRE_ASYNC_MODULE` is reported by Node.js v20.19+/v22.12+, where `require()` of
    // native ES modules is supported, but not for the ones relying on top-level await
    if (error.code === 'ERR_REQUIRE_ESM' || error.code === 'ERR_REQUIRE_ASYNC_MODULE') {
      return (await require('./import-esm')(modPath)).default;
    }
    throw error;
  }
};
