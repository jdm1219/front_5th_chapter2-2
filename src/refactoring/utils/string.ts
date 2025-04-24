export const formatNumber = (value: number | string): string => {
  if (value === "") return "";

  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return value.toString();
  }

  return numberValue.toLocaleString("ko-KR");
};
