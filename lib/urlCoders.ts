/**
 * Decodes a URL query string into an object where the keys are the parameter names
 * and the values are the parameter values.
 *
 * @param urlString - The URL query string to decode.
 * @returns An object representing the decoded URL parameters.
 */
export const decodeUrlToObject = (urlString: string) => {
  const paramsObject: { [key: string]: string } = {};

  urlString?.split("&")?.forEach((pair) => {
    const [key, value] = pair.split("=");

    if (key) {
      paramsObject[key] = value || ""; // Ensure value is at least an empty string
    }
  });

  return paramsObject;
};

/**
 * Encodes an object into a URL query string.
 *
 * @param paramsObject - An object containing key-value pairs to be encoded.
 * @returns A string representing the URL-encoded key-value pairs.
 */
export const encodeObjectToUrl = (paramsObject: { [key: string]: string }) => {
  const urlPairs: string[] = [];
  Object.keys(paramsObject)?.forEach((key) => {
    if (key) urlPairs.push(`${key}=${paramsObject[key]}`);
  });

  return urlPairs?.join("&");
};
