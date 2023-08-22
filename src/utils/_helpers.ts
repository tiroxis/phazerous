export const getError = (e: unknown) => {
  let error;
  if (typeof e === "string") {
    error = e.toUpperCase()
  } else if (e instanceof Error) {
    error = e.message
  }

  return new Error(String(error))
}
