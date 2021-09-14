import { MUTATION_ADD_DAYLOGS } from '@/store/mutation-types';
import { prop, uniqBy } from 'ramda';

export default {
  [MUTATION_ADD_DAYLOGS](state, daylogs) {
    state.daylogs = uniqBy(prop('id'), [...state.daylogs, ...daylogs]);
  },
};
