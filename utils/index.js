const relativeTime = require("dayjs/plugin/relativeTime");

export const dayjs = require("dayjs").extend(relativeTime);

export const twoDecimalPlaces = (number) => {
  return parseFloat(number).toFixed(2);
};
