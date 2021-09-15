export function hasSleepComplete(daylog) {
  return daylog.wake_at !== null && daylog.sleep_at !== null;
}

export function hasMealsComplete(daylog) {
  return daylog.first_meal_at !== null && daylog.last_meal_at !== null;
}

export function hasVicesComplete(daylog) {
  return daylog.has_alcohol !== null && daylog.has_alcohol_in_evening !== null && daylog.has_smoked !== null;
}

export function isComplete(daylog) {
  return daylog.is_complete === true;
}
