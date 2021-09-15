import { createStore } from 'vuex';
import actions from '@/store/actions';
import mutations from '@/store/mutations';
import state from '@/store/state';

const store = createStore({
  state() {
    return state;
  },

  actions,
  mutations,
});

export default store;
