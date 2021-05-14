const relativeTime = require("dayjs/plugin/relativeTime");

export const dayjs = require("dayjs").extend(relativeTime);

export const twoDecimalPlaces = (number) => {
  return formatThousand(parseFloat(number).toFixed(2));
};

export const formatThousand = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// trim strings to 200 characters
export const trimString = (string) => {
  if (string === null || string === undefined) return string;

  string = string.toString();

  if (string.length < 200) return string;

  return string.toString().substring(0, 200) + "...";
};
