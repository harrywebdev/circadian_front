<template>
  <div>
    <Calendar :attributes="calendarData" />
  </div>
</template>

<script>
import { Calendar } from 'v-calendar';
import { fetchDaylogs } from '@/api/daylogs';
import { ACTION_FETCH_DAYLOGS } from '@/store/action-types';
import { startOfMonth, endOfMonth } from 'date-fns';

export default {
  components: {
    Calendar,
  },

  computed: {
    calendarData() {
      return this.$store.state.daylogs.map(daylog => {
        return {
          key: daylog.id,
          dates: daylog.log_date,
          dot: true,
        };
      });
    },
  },

  async mounted() {
    const daylogs = await fetchDaylogs(startOfMonth(new Date()), endOfMonth(new Date()));

    this.$store.dispatch(ACTION_FETCH_DAYLOGS, daylogs);
  },
};
</script>
