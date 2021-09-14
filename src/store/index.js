import { createStore } from 'vuex';
import actions from '@/store/actions';
import mutations from '@/store/mutations';

const store = createStore({
  state() {
    return {
      daylogs: [],
    };
  },

  actions,
  mutations,
});

export default store;
