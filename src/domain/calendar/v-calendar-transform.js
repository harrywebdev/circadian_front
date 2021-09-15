import { prop } from 'ramda';

export default function transformDaylogsForVCalendar(daylogs) {
  // group daylogs by the completeness (presented by dots)
  const items = groupDaylogsByCompleteness(daylogs);

  return Object.keys(items).reduce((attributes, completeType) => {
    // skip this one - it shouldn't have a dot for now
    if (completeType === 'complete') {
      return attributes;
    }

    attributes = [
      ...attributes,
      {
        // key: daylog.id,
        dates: items[completeType].map(prop('log_date')),
        dot: getDotColorByCompleteType(completeType),
      },
    ];

    return attributes;
  }, []);
}

function groupDaylogsByCompleteness(daylogs) {
  return daylogs.reduce(
    (acc, cur) => {
      if (hasSleepComplete(cur)) {
        acc.sleep = [...acc.sleep, cur];
      }
      if (hasMealsComplete(cur)) {
        acc.meals = [...acc.meals, cur];
      }
      if (hasVicesComplete(cur)) {
        acc.vices = [...acc.vices, cur];
      }
      if (isComplete(cur)) {
        acc.complete = [...acc.complete, cur];
      }

      return acc;
    },
    {
      sleep: [],
      meals: [],
      vices: [],
      complete: [],
    }
  );
}

function hasSleepComplete(daylog) {
  return daylog.wake_at !== null && daylog.sleep_at !== null;
}

function hasMealsComplete(daylog) {
  return daylog.first_meal_at !== null && daylog.last_meal_at !== null;
}

function hasVicesComplete(daylog) {
  return daylog.has_alcohol !== null && daylog.has_alcohol_in_evening !== null && daylog.has_smoked !== null;
}

function isComplete(daylog) {
  return daylog.is_complete === true;
}

function getDotColorByCompleteType(completeType) {
  switch (completeType) {
    case 'sleep':
      return 'purple';

    case 'meals':
      return 'red';

    case 'vices':
      return 'yellow';

    default:
      return 'gray';
  }
}
