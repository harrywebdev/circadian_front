<template>
  <div>
    <Calendar :attributes="calendarData" />
  </div>
</template>

<script>
import { Calendar } from 'v-calendar';
import { startOfMonth, endOfMonth } from 'date-fns';
import { fetchDaylogs } from '@/api/daylogs';
import { ACTION_FETCH_DAYLOGS } from '@/store/action-types';
import transformDaylogsForVCalendar from '@/domain/calendar/v-calendar-transform';

export default {
  components: {
    Calendar,
  },

  computed: {
    calendarData() {
      return transformDaylogsForVCalendar(this.$store.state.daylogs);
    },
  },

  async mounted() {
    const daylogs = await fetchDaylogs(startOfMonth(new Date()), endOfMonth(new Date()));

    this.$store.dispatch(ACTION_FETCH_DAYLOGS, daylogs);
  },
};
</script>
