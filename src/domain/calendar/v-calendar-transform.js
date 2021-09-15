import { prop } from 'ramda';
import { hasMealsComplete, hasSleepComplete, hasVicesComplete, isComplete } from '@/domain/daylog-completeness';

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
            completeType == 'complete' ? { color: 'indigo', fillMode: 'light' } : { color: 'gray', fillMode: 'light' },
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
