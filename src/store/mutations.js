import {
  MUTATION_ADD_DAYLOGS,
  MUTATION_UPDATE_CALENDAR_DATES,
  MUTATION_ADD_DAYLOGS_RANGE_CACHE,
  MUTATION_REMOVE_DAYLOG,
} from '@/store/mutation-types';

import { prop, propEq, reject, uniqBy } from 'ramda';

export default {
  [MUTATION_ADD_DAYLOGS](state, daylogs) {
    state.daylogs = uniqBy(prop('id'), [...state.daylogs, ...daylogs]);
  },

  [MUTATION_REMOVE_DAYLOG](state, daylogId) {
    state.daylogs = reject(propEq('id', daylogId), state.daylogs);
  },

  [MUTATION_UPDATE_CALENDAR_DATES](state, { from, to }) {
    state.currentFrom = from;
    state.currentTo = to;
  },

  [MUTATION_ADD_DAYLOGS_RANGE_CACHE](state, range) {
    state.daylogsRangesCaching = [...state.daylogsRangesCaching, range];
  },
};
