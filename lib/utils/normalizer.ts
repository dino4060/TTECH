export const normalizePositiveNumber = (value: string): string => {
  const onlyDigits = value.replace(/\D/g, ""); // clean non numeric
  return onlyDigits.replace(/^0+/, ""); // clean 0
};
