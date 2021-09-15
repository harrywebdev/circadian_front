import {
  ACTION_INIT_STORE,
  ACTION_FETCH_DAYLOGS,
  ACTION_SELECT_CALENDAR_DATES,
  ACTION_CREATE_DAYLOG,
} from '@/store/action-types';

import {
  MUTATION_ADD_DAYLOGS,
  MUTATION_UPDATE_CALENDAR_DATES,
  MUTATION_ADD_DAYLOGS_RANGE_CACHE,
} from '@/store/mutation-types';

import { startOfMonth, endOfMonth } from 'date-fns';
import { fetchDaylogs, storeDaylog } from '@/api/daylogs';
import transformRangeForDaylogsCaching from '@/domain/transform-range-for-daylogs-caching';

export default {
  [ACTION_INIT_STORE]({ commit }) {
    commit(MUTATION_UPDATE_CALENDAR_DATES, { from: startOfMonth(new Date()), to: endOfMonth(new Date()) });
  },

  async [ACTION_FETCH_DAYLOGS]({ commit, state }, { from, to }) {
    const dateRangeCacheKey = transformRangeForDaylogsCaching(from, to);

    // do not re-fetch data we already have
    if (state.daylogsRangesCaching.includes(dateRangeCacheKey)) {
      return;
    }

    const daylogs = await fetchDaylogs(from, to);
    commit(MUTATION_ADD_DAYLOGS, daylogs);
    commit(MUTATION_ADD_DAYLOGS_RANGE_CACHE, dateRangeCacheKey);
  },

  [ACTION_SELECT_CALENDAR_DATES]({ commit }, date) {
    commit(MUTATION_UPDATE_CALENDAR_DATES, { from: startOfMonth(date), to: endOfMonth(date) });
  },

  async [ACTION_CREATE_DAYLOG]({ commit }, model) {
    const daylog = await storeDaylog(model);

    commit(MUTATION_ADD_DAYLOGS, [daylog]);
  },
};
