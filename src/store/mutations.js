import { MUTATION_ADD_DAYLOGS, MUTATION_UPDATE_CALENDAR_DATES } from '@/store/mutation-types';
import { prop, uniqBy } from 'ramda';

export default {
  [MUTATION_ADD_DAYLOGS](state, daylogs) {
    state.daylogs = uniqBy(prop('id'), [...state.daylogs, ...daylogs]);
  },

  [MUTATION_UPDATE_CALENDAR_DATES](state, { from, to }) {
    state.currentFrom = from;
    state.currentTo = to;
  },
};
