// Frontend-only build: no real network calls. This file re-exports the localStorage-backed
// mock API (src/data/localApi.js) under the same interface the Redux slices already expect
// (api.get/post/put/delete, plus configureApiAuth wired up in app/store.js). Nothing in the
// slices, pages, or components needs to know the difference.
export { default } from "../data/localApi.js";
export { configureApiAuth } from "../data/localApi.js";
