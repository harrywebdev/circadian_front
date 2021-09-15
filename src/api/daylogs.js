import { format } from 'date-fns';
import { applySpec, compose, prop, filter, map } from 'ramda';
import { specDateField, specBoolField } from '@/api/model-specs';
import ErrorService from '@/domain/error-service';

export async function fetchDaylogs(from, to) {
  const baseUrl = `${process.env.VUE_APP_API_URL}/daylogs`;

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
