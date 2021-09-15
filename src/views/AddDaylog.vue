<template>
  <div>
    {{ datePickerDate }}
    <DatePicker v-model="wakeUpAt" />
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import { parseISO } from 'date-fns/esm';
import { isValid } from 'date-fns';

export default {
  components: {
    DatePicker,
  },

  props: {
    date: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      wakeUpAt: null,
    };
  },

  computed: {
    datePickerDate() {
      var parsedDate = parseISO(this.date);

      return isValid(parsedDate) ? parsedDate : null;
    },
  },

  async mounted() {
    if (!this.datePickerDate) {
      alert('Invalid date, navigating back...');
      this.$router.push({ name: 'index' });
    }
  },
};
</script>
