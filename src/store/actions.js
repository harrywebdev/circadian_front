import { ACTION_INIT_STORE, ACTION_FETCH_DAYLOGS, ACTION_SELECT_CALENDAR_DATES } from '@/store/action-types';
import { MUTATION_ADD_DAYLOGS, MUTATION_UPDATE_CALENDAR_DATES } from '@/store/mutation-types';
import { startOfMonth, endOfMonth } from 'date-fns';

export default {
  [ACTION_INIT_STORE]({ commit }) {
    commit(MUTATION_UPDATE_CALENDAR_DATES, { from: startOfMonth(new Date()), to: endOfMonth(new Date()) });
  },

  [ACTION_FETCH_DAYLOGS]({ commit }, daylogs) {
    commit(MUTATION_ADD_DAYLOGS, daylogs);
  },

  [ACTION_SELECT_CALENDAR_DATES]({ commit }, date) {
    commit(MUTATION_UPDATE_CALENDAR_DATES, { from: startOfMonth(date), to: endOfMonth(date) });
  },
};
