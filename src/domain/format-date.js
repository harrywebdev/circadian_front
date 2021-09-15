import { parseISO, format } from 'date-fns';

export default function formatDate(date, dateFormat = 'yyyy-MM-dd') {
  if (typeof date == 'string') {
    date = parseISO(date);
  }

  return format(date, dateFormat);
}
