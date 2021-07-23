export const getAlertString = msg =>
  msg?.errorMessage ??
  msg?.data?.message ??
  msg?.response?.data.message ??
  msg?.message ??
  msg?.msg ??
  msg

export const isBrowser = typeof window !== "undefined"
