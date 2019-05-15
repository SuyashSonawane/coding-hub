<template>
    <div class="navbar">
      <div class="navbar-fixed">
      <nav class="deep-purple darken-1" id="nav-bar">
        <div class="container">
          <router-link :to="{name:'GMap'}" class="brandlogo left" id="logo"><img src="/static/images/logo.png" alt="">  CodingHub</router-link>
          <ul class="right">
            <li><router-link v-if="!user" :to="{name:'Signup'}">SignUp</router-link></li>
            <li><router-link v-if="!user" :to="{name:'Login'}">LogIn</router-link></li>
            <li><a v-if="user" >{{user.email}}</a></li>
            <li><a @click="logout" v-if="user">Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
</template>

<script>
import firebase, { firestore } from 'firebase'
export default {
    name:'Navbar',
    data(){
      return{
        user:null,
        username:null
      }

    },
    methods:{
        logout(){
          firebase.auth().signOut()
          .then(()=>{
            this.$router.push({name:'Login'})
          })

        }
    },
    created(){
      firebase.auth().onAuthStateChanged((user)=>{
        if(user)
        {
            this.user=user
            console.log(user)
        }
        else
          this.user=null

    })
    }

}
</script>

<style>
*{
  user-select: none;
}
body{
  margin: 0;
  padding: 0
}
.navbar{
  transform: translateY(-8vh);
  z-index: 999999999999;
}
#logo{
  font-size: 2.2em
}
#logo img{
  height: 1em;
  transform: translateY(5px) 
}

</style>
