<template>  
    <div id="app">   
        <div>    
            <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>    
            <router-link :to="{ name: 'Login'}">Login</router-link>    
            <a href="#" v-on:click="logout">Logout</a>    
        </div>    
        <router-view/>    
    </div>
</template>  

<script> 
  import axios from "axios"  
  import router from './router'  
  export default {
    name: "App",      
    methods: {    
      logout: function (e) {  
        axios.get("/api/logout")
        .then(() => {
          console.log('bye');
          router.push("/");
        })
      }
    }
  }
</script>