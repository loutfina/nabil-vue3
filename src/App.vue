<template>
<div>
  <Navbar />
</div>

  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '@/components/navbar.vue'; // @ is an alias to /src
import { mapState } from 'vuex'

@Options({
  components: {
    Navbar,
  },
  methods: {
      alert(message:string, variant:'danger'|'success'|'info'|'warning') {
        this.$oruga.notification.open({
          duration: variant=='danger' ? 10000 : 2000,
          message,
          //position: 'top',  // bottom-right or remove to default top-right
          variant,
          closable: true,
          rootClass: 'toast-notification',
          iconPack:'fas',
          closeIcon: 'times',
          hasIcon: true,
          icon: variant == 'danger' ? 'times-circle' : variant == 'warning' ? 'exclamation-triangle' : '',
          iconSize: 'medium'
          //onClose: () => { this.$oruga.notification.open('Custom action !'))}
          //component: LoginForm,
        })
      }      
  },
  computed :{
    ...mapState( 'alertSlice',  ['message','type'])
  },
  watch: {
    message(newValue) {
      this.alert(newValue, this.type);
    },
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
    --oruga-variant-primary: rgb(109, 126, 221);
    --oruga-variant-danger: rgb(248, 85, 85);
    --oruga-variant-success: rgb(77, 201, 77);
    --oruga-variant-warning: rgb(250, 191, 81);
    --oruga-table-hoverable-background-color: rgb(109, 126, 221);
    --oruga-notification-padding: .75em 2.5em
  }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

    label {
        display: inline-block;
        font-weight: bolder;
    }

  .toast-notification {
    margin: 0.5em 0;
    box-shadow: 0 1px 4px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.2);
    border-radius: 0.5em;
    padding: 0.75em 2em!important;
    pointer-events: auto;
  }

}
</style>
