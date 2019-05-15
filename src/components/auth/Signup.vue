<template>
    <div class="signup container">
      <form @submit.prevent="onSignup" class="card-panel">
        <h2 class="conatiner deep-purple-text">SIGNUP</h2>
        <div class="field container">
          <label for="email">Email:</label>
          <input type="email" name="email" v-model="email" required>
        </div>
        <div class="field container">
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password" required>
        </div>
        <div class="field container">
          <label for="username">username:</label>
          <input type="text" name="username" v-model="username" required>
        </div>
        <div class="field container btn-cont">
          <p class="red-text" v-if="feedback">{{feedback}}</p>
          <button class="btn deep-purple">SignUp</button>
        </div>
      </form>
    </div>
</template>

<script>
import sliugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
import { constants } from 'fs';
export default {
    name:'SignUp',
    data(){
      return{
        email:null,
        password:null,
        username:null,
        feedback:null,
        slug:null
      }    

    },
    methods:{
        onSignup(){
          if(this.username){
              this.slug=sliugify(this.username,{
                replacement:'-',
                lower:true,
                remove:/[$*_+~,()'"!\-:@]/g
              })
               let ref=db.collection('users').doc(this.slug)
                ref.get().then(doc=>{
                console.log(doc.data())
                if(doc.exists){
                   this.feedback="This username alreday exits"
                  }
                  else{
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(cred=>{
                      ref.set({
                        username:this.username,
                        geolocation:null,
                        user_id:cred.user.uid,
                        email:this.email
                      })
                      .then(()=>{
                        this.$router.push({name:'GMap'})
                      })
                    })
                    .catch(err=>{
                      console.log(err)
                      this.feedback=err.message
                    })
                  }
                })
          }else{
            this.feedback="You must enter an username"
          }
        }
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');
*{
  font-family: 'Poppins', sans-serif;
}
.signup{
  max-width: 400px
}
.field{
  max-width: 80%
}
.signup .btn-cont{
  margin-top: 20px
}
</style>
