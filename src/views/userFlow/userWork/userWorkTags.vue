<template>
  <div>
    <v-tabs
            v-model="active"

            slider-color="yellow"
    >
      <v-tab
              v-for="n in userWork"
              :key="n"
              ripple
      >
         {{ n }}

      </v-tab>
      <v-tab-item
              v-for="n in 3"
              :key="n"
      >
        <v-card flat>
          <v-card-text>
            <user-work-table></user-work-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import userWorkTable from './userWorkTable'
    export default {
        data () {
            return {
                active: null,
                text: '.',
                userWork:['待复核','待发布']
            }
        },
        components: {
            userWorkTable
        },
        methods: {
        }
    }
</script>