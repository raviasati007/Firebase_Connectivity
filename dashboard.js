/* Firebase Connectivity */


const firebaseConfig = {
    apiKey: "AIzaSyDLYpp6bV4HeN21dh0cQyZliXiYPAfQjqw",
    authDomain: "kenshuu-onlinetest.firebaseapp.com",
    databaseURL: "https://kenshuu-onlinetest-default-rtdb.firebaseio.com",
    projectId: "kenshuu-onlinetest",
    storageBucket: "kenshuu-onlinetest.appspot.com",
    messagingSenderId: "351856145614",
    appId: "1:351856145614:web:9d8a7f9970135c82a6cc9f",
    measurementId: "G-1FST25EMND"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const databse = firebase.database();



