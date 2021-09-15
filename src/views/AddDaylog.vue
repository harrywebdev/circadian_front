<template>
  <div>
    <form @submit="saveDaylog">
      <fieldset>
        <div class="field">
          <label for="log_date">Log Date:</label>
          <input type="text" readonly :value="formattedLogDate" />
        </div>
      </fieldset>

      <fieldset>
        <legend>Sleep</legend>
        <div class="field">
          <label for="wake_at">Wake up at:</label>

          <label for="has_wake_at"> <input type="checkbox" name="has_wake_at" v-model="skip_wake_at" />Skip </label>

          <DatePicker v-model="model.wake_at" mode="time" is24hr is-dark v-if="!skip_wake_at" />
        </div>

        <div class="field">
          <label for="sleep_at">Fall asleep at:</label>

          <label for="has_wake_at"> <input type="checkbox" name="has_wake_at" v-model="skip_sleep_at" />Skip </label>

          <DatePicker v-model="model.sleep_at" mode="time" is24hr is-dark v-if="!skip_sleep_at" />
        </div>
      </fieldset>

      <fieldset>
        <legend>Meals</legend>
        <div class="field">
          <label for="first_meal_at">First meal at:</label>

          <label for="has_wake_at">
            <input type="checkbox" name="has_wake_at" v-model="skip_first_meal_at" />Skip
          </label>

          <DatePicker v-model="model.first_meal_at" mode="time" is24hr is-dark v-if="!skip_first_meal_at" />
        </div>

        <div class="field">
          <label for="last_meal_at">Last meal at:</label>

          <label for="has_wake_at">
            <input type="checkbox" name="has_wake_at" v-model="skip_last_meal_at" />Skip
          </label>

          <DatePicker v-model="model.last_meal_at" mode="time" is24hr is-dark v-if="!skip_last_meal_at" />
        </div>
      </fieldset>

      <fieldset>
        <legend>Vices</legend>
        <div class="field">
          <label for="has_alcohol">Any alcohol?</label>
          <select v-model="model.has_alcohol">
            <option value="">Skip</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div class="field">
          <label for="has_alcohol">Any alcohol in the evening?</label>
          <select v-model="model.has_alcohol_in_evening">
            <option value="">Skip</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div class="field">
          <label for="has_alcohol">Any smokes?</label>
          <select v-model="model.has_smoked">
            <option value="">Skip</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </fieldset>

      <button type="submit">Save record</button>

      <button @click="goBack">Cancel</button>
    </form>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import { isValid, parseISO, format } from 'date-fns';
import { ACTION_CREATE_DAYLOG } from '@/store/action-types';

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
      skip_wake_at: true,
      skip_sleep_at: true,
      skip_first_meal_at: true,
      skip_last_meal_at: true,

      model: {
        wake_at: this.date,
        sleep_at: this.date,
        first_meal_at: this.date,
        last_meal_at: this.date,
        has_alcohol: '',
        has_alcohol_in_evening: '',
        has_smoked: '',
      },
    };
  },

  computed: {
    recordDate() {
      var parsedDate = parseISO(this.date);

      return isValid(parsedDate) ? parsedDate : null;
    },

    formattedLogDate() {
      return this.recordDate ? format(this.recordDate, 'd. M. yyyy') : null;
    },
  },

  async mounted() {
    if (!this.recordDate) {
      alert('Invalid date, navigating back...');
      this.$router.push({ name: 'index' });
    }
  },

  methods: {
    async saveDaylog(event) {
      event.preventDefault();

      const model = { ...this.model, log_date: this.date };
      if (this.skip_wake_at) model.wake_at = null;
      if (this.skip_sleep_at) model.sleep_at = null;
      if (this.skip_first_meal_at) model.first_meal_at = null;
      if (this.skip_last_meal_at) model.last_meal_at = null;

      try {
        await this.$store.dispatch(ACTION_CREATE_DAYLOG, model);

        this.goBack();
      } catch (e) {
        // oops
      }
    },

    goBack() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>
