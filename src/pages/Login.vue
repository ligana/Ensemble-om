<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/logo.png" alt="SmartEnsemble-om<" width="120" height="120">
                  <h1 class="flex my-4 primary--text">神州数码-产品工厂</h1>
                  <h2 class="flex my-4 primary--text">SmartEnsemble-om</h2>
                </div>
                <v-form  ref="model">
                  <v-text-field append-icon="person" name="login" label="用户名" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="密码" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {getMenu} from '@/api/menu'
    export default {
        data: () => ({
            loading: false,
            model: {
                username: 'admin',
                password: 'password'
            }
        }),

        methods: {
            login () {
                this.loading = true
                this.$store.dispatch('LoginByUsername', this.model).then(response => {

                    this.loading = false;
                    if(this.model.username=='para') {
                        const menu = getMenu()
                    }
                    this.$router.push('/dashboard');
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    };
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
