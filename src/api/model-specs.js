import { isValid, parseISO } from 'date-fns';
import { compose, ifElse, prop, identity, always } from 'ramda';

function isBoolean(value) {
  return value === true || value === false;
}

export const specDateField = fieldName => compose(ifElse(isValid, identity, always(null)), parseISO, prop(fieldName));
export const specBoolField = fieldName => compose(ifElse(isBoolean, identity, always(null)), prop(fieldName));
