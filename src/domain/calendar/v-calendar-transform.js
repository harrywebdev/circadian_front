import { prop } from 'ramda';

export default function transformDaylogsForVCalendar(daylogs) {
  // group daylogs by the completeness (presented by dots)
  const items = groupDaylogsByCompleteness(daylogs);

  // set highlights and dots
  return Object.keys(items).reduce((attributes, completeType) => {
    // highlight attributes
    if (completeType.match(/complete/)) {
      attributes = [
        ...attributes,
        {
          dates: items[completeType].map(prop('log_date')),
          highlight:
            completeType == 'complete' ? { color: 'green', fillMode: 'outline' } : { color: 'gray', fillMode: 'light' },
        },
      ];

      return attributes;
    }

    // dot attributes
    attributes = [
      ...attributes,
      {
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
      } else {
        acc.incomplete = [...acc.incomplete, cur];
      }

      return acc;
    },
    {
      sleep: [],
      meals: [],
      vices: [],
      complete: [],
      incomplete: [],
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
