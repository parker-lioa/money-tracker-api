function How_many_days_in_x(year, month) {
  switch (month) {
    case 1:
      return 30;
      break;
    case 2:
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          if (year % 400 === 0) {
            return 31;
          } else {
            return 30;
          }
        } else {
          return 31;
        }
      } else {
        return 30;
      }
      break;
    case 3:
      return 31;
      break;
    case 4:
      return 30;
      break;
    case 5:
      return 31;
      break;
    case 6:
      return 30;
      break;
    case 7:
      return 31;
      break;
    case 8:
      return 31;
      break;
    case 9:
      return 30;
      break;
    case 10:
      return 31;
      break;
    case 11:
      return 30;
      break;
    case 12:
      return 31;
      break;
    default:
      return 0;
  }
}

function How_many_days_left(date) {
  const formatedDate = new Date(date);

  let left_days =
    How_many_days_in_x(1900 + formatedDate.getYear(), formatedDate.getMonth()) -
    formatedDate.getDay();
  return left_days;
}

module.exports = { How_many_days_left };
