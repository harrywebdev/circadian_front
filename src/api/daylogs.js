import { format, parseISO } from 'date-fns';
import { applySpec, compose, prop, filter, map } from 'ramda';
import { specDateField, specBoolField } from '@/api/model-specs';
import ErrorService from '@/domain/error-service';
import isValid from 'date-fns/isValid';

const baseUrl = `${process.env.VUE_APP_API_URL}/daylogs`;

export async function fetchDaylogs(from, to) {
  try {
    const response = await fetch(`${baseUrl}?from=${format(from, 'yyyy-MM-dd')}&to=${format(to, 'yyyy-MM-dd')}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();

    // apply model spec and filter out invalid records (based on `log_date` validity)
    return compose(filter(prop('log_date')), map(daylogModelSpec))(data.daylogs);
  } catch (e) {
    e.message = `[fetchDaylogs] ${e.message}`;
    ErrorService.onError(e);

    return [];
  }
}

export async function storeDaylog(daylogData) {
  try {
    const normalized = normalizeData(daylogData);

    const response = await fetch(baseUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(normalized),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message) {
        throw Error(data.message);
      }

      throw Error(`${response.status} ${response.statusText}`);
    }

    return daylogModelSpec(data.daylog);
  } catch (e) {
    e.message = `[storeDaylog] ${e.message}`;
    ErrorService.onError(e);

    throw e;
  }
}

const daylogModelSpec = applySpec({
  id: compose(Number, prop('id')),
  is_complete: compose(Boolean, prop('is_complete')),
  log_date: specDateField('log_date'),
  has_alcohol: specBoolField('has_alcohol'),
  has_alcohol_in_evening: specBoolField('has_alcohol_in_evening'),
  has_smoked: specBoolField('has_smoked'),
  wake_at: specDateField('wake_at'),
  first_meal_at: specDateField('first_meal_at'),
  last_meal_at: specDateField('last_meal_at'),
  sleep_at: specDateField('sleep_at'),
});

function normalizeData(data) {
  const normalized = {
    log_date: format(parseISO(data.log_date), 'yyyy-MM-dd'),
    has_alcohol: normalizeChoice(data.has_alcohol),
    has_alcohol_in_evening: normalizeChoice(data.has_alcohol_in_evening),
    has_smoked: normalizeChoice(data.has_smoked),
    wake_at: normalizeTime(data.wake_at),
    first_meal_at: normalizeTime(data.first_meal_at),
    last_meal_at: normalizeTime(data.last_meal_at),
    sleep_at: normalizeTime(data.sleep_at),
  };

  return normalized;
}

function normalizeChoice(value) {
  if (value === 'yes') {
    return true;
  }

  if (value === 'no') {
    return false;
  }

  return null;
}

function normalizeTime(value) {
  const dateTime = typeof value == 'string' ? parseISO(value) : value;

  if (isValid(dateTime)) {
    return format(dateTime, 'HH:mm');
  }

  return null;
}
