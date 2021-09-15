<template>
  <div>
    <Calendar
      :attributes="calendarData"
      @update:from-page="onPageUpdate"
      @dayclick="onDayClick"
      is-dark
      timezone="utc"
    />
  </div>
</template>

<script>
import { Calendar } from 'v-calendar';
import { mapState } from 'vuex';
import { formatISO } from 'date-fns';
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
    this.$store.dispatch(ACTION_FETCH_DAYLOGS, { from: this.currentFrom, to: this.currentTo });
  },

  methods: {
    async onPageUpdate(currentDate) {
      // v-calendar triggers this with current date right after first load - we can skip that
      if (currentDate.date) {
        return;
      }

      // select new dates (Month-1 because v-calendar supplies natural number with January = 1)
      await this.$store.dispatch(ACTION_SELECT_CALENDAR_DATES, new Date(currentDate.year, currentDate.month - 1));

      // fetch new daylogs
      this.$store.dispatch(ACTION_FETCH_DAYLOGS, { from: this.currentFrom, to: this.currentTo });
    },

    onDayClick(day) {
      this.$router.push({ name: 'daylogform', params: { date: formatISO(day.date) } });
    },
  },
};
</script>
