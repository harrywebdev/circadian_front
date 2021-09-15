import { MUTATION_ADD_DAYLOGS, MUTATION_INIT_STORE } from '@/store/mutation-types';
import { prop, uniqBy } from 'ramda';
import { startOfMonth, endOfMonth } from 'date-fns';

export default {
  [MUTATION_INIT_STORE](state) {
    state.currentFrom = startOfMonth(new Date());
    state.currentTo = endOfMonth(new Date());
  },

  [MUTATION_ADD_DAYLOGS](state, daylogs) {
    state.daylogs = uniqBy(prop('id'), [...state.daylogs, ...daylogs]);
  },
};
