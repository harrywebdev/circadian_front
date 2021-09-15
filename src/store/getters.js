import { head, prop, compose, equals } from 'ramda';
import formatDate from '@/domain/format-date';

// convert `log_date` and given `date` to the same specific format
// then compare whether they are equal
const compareLogDateInSpecificFormat = date => compose(equals(formatDate(date)), formatDate, prop('log_date'));

export default {
  findDaylogByDate: state => date => head(state.daylogs.filter(compareLogDateInSpecificFormat(date))),
};
