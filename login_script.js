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



const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");
const signupEmailIn = document.getElementById("email-signup");
const usernameIn = document.getElementById("username-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const forgetBtn = document.querySelector(".forget-btn");

// const returnBtn = document.getElementById("return-btn");

var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignUpPassword,
  username,
  userId;

createacctbtn.addEventListener("click", function () {
  /* Sign-up Form Validation */
  var isVerified = true;
  signupEmail = signupEmailIn.value;

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  username = usernameIn.value;
  if (
    signupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    auth
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Success! Account created.");
        sessionStorage.setItem("userId", auth.currentUser.uid);
        // console.log(auth.currentUser.uid);
        databse
          .ref("/Users/" + auth.currentUser.uid)
          .set({
            Basic_info: {
              email_id: signupEmail,
              user_name: username,
            },
          })
          .then((res) => {
            console.log("Data added to database.");
            location.replace("./dashboard.html");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        window.alert("Error occurred. ErrorCode ", errorCode);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.setItem("userId", auth.currentUser.uid);
      console.log("Success! Welcome back!");
      // window.alert("Success! Welcome back!");
      location.replace("./dashboard.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      window.alert("Error occurred. ErrorCode ", errorCode);
    });
});

// reseting password
forgetBtn.addEventListener("click", function () {
  email = emailInput.value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      window.alert("Password reset email sent, check your inbox. ");
    })
    .catch((error) => {
      window.alert(error);
    });
});
