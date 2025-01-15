
const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('signInBtn')

console.log(button);

const sendLoginEmail = async () => {
  const data = {
    email: email.value,
  };
  fetch('https://omegaexchangebackend.onrender.com/api/loginemailsand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.json())
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

button.onclick = async (event) => {
  event.preventDefault();

  const data = {
    email: email.value,
    password: password.value,
  };

  console.log(data);
  button.innerHTML = "Loading...";

  fetch('https://omega-exchange-back-end-one.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.json())
    .then(response => {
      localStorage.setItem('userId', response?._id)
      console.log(response)
      const userId = localStorage?.getItem('userId')
      console.log("Local User Id", userId);
      if (response.message === 'User have not been verified'){
        window.location = `https://omega-exchange-dashboard.vercel.app/`;
        console.log("object");
        return
      }if (response._id === '' || response._id === undefined){
        alert('Please enter your valid credentials');
        button.innerHTML = "Sign In";
        return
      }else{
        console.log("object2");
         const id = localStorage?.getItem('userId')
        //  console.log(userId)
        sendLoginEmail()
        window.location = `https://omega-exchange-dashboard.vercel.app/#/${id}`;
      }
    })  
    .catch((error) => {
      console.log(error);
      button.innerHTML = "Sign In";
    });
};