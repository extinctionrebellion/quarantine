/**
 * Little helper to transform an api endpoint
 *
 * @param endpoint
 * @param params
 * @returns {string}
 */
const getApiUrl = (endpoint, params) => {

  /**
   * If params is set => will replace :var with the value of an array
   *
   * @exemple getUrl('users/:id', {id: user.id}) will return users/{user.id}
   */
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

export default getApiUrl;