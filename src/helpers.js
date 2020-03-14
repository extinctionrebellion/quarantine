/**
 * Little helper to transform api end point
 *
 * @param endpoint
 * @param params
 * @returns {string}
 */
const getURL = (endpoint, params) => {

  if (typeof params !== "undefined") {
    for (var placeholder in params) {
      endpoint = endpoint.replace(
        `:${placeholder}`,
        params[placeholder]
      );
    }
  }

  return (
    process.env.API_URL.replace(/\/$/, "") +
    "/" +
    endpoint.replace(/^\//, "")
  );
};

export default {
  getURL
}