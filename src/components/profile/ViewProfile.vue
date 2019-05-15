<template>
    <div class="view-profile container">
        <div v-if="profile" class="card">
            <h2 class="deep-purple-text center">{{profile.username}}'s  Wall</h2>
            <ul class="comments collection">
                <li>Comment</li>
            </ul>
            <form @submit.prevent="addComment">
                <label for="comment">Add a new comment</label>
                <input type="text" name="comment" v-model="newComment" required>
                <p v-if="feedback" class="red-text center">{{feedback}}</p>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase';
export default {
    name:'ViewProfile',
    data(){
      return{
          profile:null,
          feedback:null,
          newComment:null,
          currentUser:null
        
      }

    },
    methods:{
        addComment(){
      if(this.newComment){
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        }).then(doc => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
    }
  },
        
    created(){
    let ref = db.collection('users')
    // current user
    ref.where('user_id', '==', firebase.auth().currentUser.uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.user = doc.data()
        this.user.id = doc.id
      })
    })
    // profile data
    ref.doc(this.$route.params.id).get()
    .then(user => {
      this.profile = user.data()
    })


    db.collection('comments').where("to","==",this.$route.params.id)
    .onSnapshot(snapshot=>{
        snapshot.docChanges().forEach(change=>{
            if(change.typr=='added'){
                this.newComment.unshift({
                    from:change.doc.data().from,
                    content:change.doc.data().content
                    
                })
            }
        })

    })
  }

}
</script>

<style>

</style>
