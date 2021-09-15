import { formatISO, parseISO } from 'date-fns';
import { applySpec, compose, prop, filter, map } from 'ramda';
import { specDateField, specBoolField } from '@/api/model-specs';
import ErrorService from '@/domain/error-service';
import isValid from 'date-fns/isValid';
import formatDate from '@/domain/format-date';

const baseUrl = `${process.env.VUE_APP_API_URL}/daylogs`;

export async function fetchDaylogs(from, to) {
  try {
    const response = await fetch(`${baseUrl}?from=${formatDate(from)}&to=${formatDate(to)}`, {
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

export async function fetchDaylog(log_date) {
  try {
    const response = await fetch(`${baseUrl}/${formatDate(log_date)}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // it's okay to not find a record
      if (response.status === 404) {
        return null;
      }

      if (data.message) {
        throw Error(data.message);
      }

      throw Error(`${response.status} ${response.statusText}`);
    }

    return daylogModelSpec(data.daylog);
  } catch (e) {
    e.message = `[fetchDaylogs] ${e.message}`;
    ErrorService.onError(e);
  }
}

export async function storeDaylog(daylogData) {
  const updatingId = daylogData.id;

  try {
    const normalized = normalizeData(daylogData);

    const response = await fetch(baseUrl + (updatingId ? `/${updatingId}` : ''), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: updatingId ? 'PATCH' : 'POST',
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
    log_date: formatDate(data.log_date),
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
    return formatISO(dateTime);
  }

  return null;
}

export function serializeData(data) {
  const serialized = {
    id: Number(data.id),
    log_date: formatDate(data.log_date),
    has_alcohol: serializeChoice(data.has_alcohol),
    has_alcohol_in_evening: serializeChoice(data.has_alcohol_in_evening),
    has_smoked: serializeChoice(data.has_smoked),
    wake_at: serializeTime(data.wake_at),
    first_meal_at: serializeTime(data.first_meal_at),
    last_meal_at: serializeTime(data.last_meal_at),
    sleep_at: serializeTime(data.sleep_at),
  };

  return serialized;
}

function serializeChoice(value) {
  if (value === true) {
    return 'yes';
  }

  if (value === false) {
    return 'no';
  }

  return '';
}

function serializeTime(value) {
  const dateTime = typeof value == 'string' ? parseISO(value) : value;

  if (isValid(dateTime)) {
    return dateTime;
  }

  return null;
}
