// Returns true if the value is empty.
// This function was created due to the fact that if there is a false value,
// the function will still return false (non empty value).
export const isEmpty = (val: any): boolean =>
  val === undefined || val == null || val.length <= 0;
