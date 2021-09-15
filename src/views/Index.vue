<template>
  <div>
    <Calendar :attributes="calendarData" @update:from-page="onPageUpdate" is-dark />
  </div>
</template>

<script>
import { Calendar } from 'v-calendar';
import { mapState } from 'vuex';
import { fetchDaylogs } from '@/api/daylogs';
import { ACTION_FETCH_DAYLOGS, ACTION_SELECT_CALENDAR_DATES } from '@/store/action-types';
import transformDaylogsForVCalendar from '@/domain/calendar/v-calendar-transform';

export default {
  components: {
    Calendar,
  },

  computed: {
    calendarData() {
      return transformDaylogsForVCalendar(this.$store.state.daylogs);
    },

    ...mapState(['currentFrom', 'currentTo']),
  },

  async mounted() {
    const daylogs = await fetchDaylogs(this.currentFrom, this.currentTo);

    this.$store.dispatch(ACTION_FETCH_DAYLOGS, daylogs);
  },

  methods: {
    onPageUpdate(currentDate) {
      this.$store.dispatch(ACTION_SELECT_CALENDAR_DATES, currentDate.date);
    },
  },
};
</script>
