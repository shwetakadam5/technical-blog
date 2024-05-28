const dayjs = require('dayjs');
module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    const originalDate = dayjs(date);
    const newDate = originalDate.format('M/D/YYYY');
    return newDate;
  },
};
