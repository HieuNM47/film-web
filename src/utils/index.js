import * as moment from 'moment';
import 'moment/locale/vi';
import format from 'date-fns/format';
import { isToday } from 'date-fns';

export const replaceStringBy = (str_origin, str_needToReplace, str_by) => {
  const regex = new RegExp(`${str_needToReplace}`, 'g');

  let result = str_origin.replace(regex, `${str_by}`);
  return result;
};

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname) => {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const currentDate = () => {
  return new Date();
};

export const FORMAT_DATETIME = 'DD/MM/YYYY HH:mm';

export const FORMAT_DATE = 'DD/MM/YYYY';

export const formatRelativeTime = (currentDate) => {
  return currentDate ? moment(currentDate).from(moment()) : null;
};

export const formatDateTime = (date) => {
  return date ? moment(date).format(FORMAT_DATETIME) : null;
};

export const formatDate = (date) => {
  return date ? moment(date).format(FORMAT_DATE) : null;
};

export const checkToday = (dateCheck) => {
  return dateCheck
    ? moment(dateCheck).format(FORMAT_DATE) ===
    moment(currentDate()).format(FORMAT_DATE)
    : false;
};

export const convertArrayToObject = (data, key) => {
  if (!key || !data[0][key]) return {};
  return data.reduce(
    (result, item) => ({ ...result, [item[key]]: { ...item } }),
    {}
  );
};

export const findValueInArrayeBy = (list = [], key, value) => {
  const currentIndex = list.findIndex((item) => item[key] === value);
  if (currentIndex < 0) return '';
  return list[currentIndex];
};

export const formatCurrencyVnd = (value) => {
  return (
    `${value}`
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      }) + '??'
  );
};
export const formatInterviewDate = (raw) => {
  return `${getDayOfWeek(raw)} ${format(raw, 'd/M/yyyy')}`;
};

export const formatInterviewTime = (raw) => {
  return format(raw, 'HH:mm');
};

export const formatInterviewDateTime = (raw) => {
  return `${getDayOfWeek(raw)} ${format(raw, 'd')} Th??ng ${format(
    raw,
    'M'
  )} v??o ${format(raw, 'HH:mm')}`;
};

export const getDayOfWeek = (date) => {
  const day = format(date, 'E');

  switch (day) {
    case 'Mon':
      return 'T2';
    case 'Tue':
      return 'T3';
    case 'Wed':
      return 'T4';
    case 'Thu':
      return 'T5';
    case 'Fri':
      return 'T6';
    case 'Sat':
      return 'T7';
    default:
      return 'CN';
  }
};
export const formatChatDateTime = (raw) => {
  if (isToday(raw)) {
    return format(raw, 'HH:mm');
  }

  return `${getDayOfWeek(raw)} ${format(raw, 'HH:mm d')} Th??ng ${format(
    raw,
    'M, y'
  )}`;
};

export const formatExperience = (min, max) => {
  if (min) {
    if (max) {
      return `${min} - ${max} n??m KN`;
    }
    return `0 - ${min} n??m KN`;
  } else {
    if (max) {
      return `0 - ${max} n??m KN`;
    }
  }
  return `Kh??ng y??u c???u kinh nghi???m`;
};

export const formatSalary = (min, max) => {
  if (min) {
    if (max) {
      return `${min} - ${max} tri???u VN??`;
    }
    return `L??n ?????n ${min} tri???u VN??`;
  } else {
    if (max) {
      return `L??n ?????n ${max} tri???u VN??`;
    }
  }
  return `Kh??ng l????ng`;
};

export const convertString = (str) => {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e');
  str = str.replace(/??|??|???|???|??/g, 'i');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u');
  str = str.replace(/???|??|???|???|???/g, 'y');
  str = str.replace(/??/g, 'd');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'A');
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'E');
  str = str.replace(/??|??|???|???|??/g, 'I');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'O');
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'U');
  str = str.replace(/???|??|???|???|???/g, 'Y');
  str = str.replace(/??/g, 'D');
  str = str.replace(/\s+/g, ' ');
  str = str.trim();
  return str;
};

export const patternPhone = /(02|03|07|08|09|01[2|6|8|9])+([0-9]{8,9})\b/;
export const patternEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-z0-9]{2,}){1,3}$/;
export const patternWebsite =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const patternNormal = /^[ a-zA-Z0-9.,&()-]+$/;


export const getTotalYearMonth = (startDate, endDate) => {
  let totalDays =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  return `${years < 1 ? '' : `${years} n??m`} ${months < 1 ? '' : `${months} th??ng`
    }`;
};

export const uniqueItemArray = (arr) => {
  var newArr = []
  newArr = arr.filter(item => {
    return newArr.includes(item) ? '' : newArr.push(item)
  })
  return newArr
}