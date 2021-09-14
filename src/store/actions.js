import { ACTION_FETCH_DAYLOGS } from '@/store/action-types';
import { MUTATION_ADD_DAYLOGS } from '@/store/mutation-types';

export default {
  [ACTION_FETCH_DAYLOGS]({ commit }, daylogs) {
    commit(MUTATION_ADD_DAYLOGS, daylogs);
  },
};
