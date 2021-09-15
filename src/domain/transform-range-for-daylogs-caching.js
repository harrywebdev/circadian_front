import { format } from 'date-fns';

export default function(dateFrom, dateTo) {
  return `${format(dateFrom, 'yyyy-MM-dd')}:${format(dateTo, 'yyyy-MM-dd')}`;
}
