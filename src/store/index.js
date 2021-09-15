import { createStore } from 'vuex';
import actions from '@/store/actions';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import state from '@/store/state';

const store = createStore({
  state() {
    return state;
  },

  actions,
  mutations,
  getters
});

export default store;
