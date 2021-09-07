export const API_TOKEN = "mmaMhC56Wmwbu66WkoWfFcQA7MT86hoLyN9ftcFQ"

export function findRandomObject(array) {
  const object = array[Math.floor(Math.random() * array.length)]
  return object
}
