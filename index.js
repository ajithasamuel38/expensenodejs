const link = "http://localhost:3000/user/signup";
const form = document.getElementById('signup');
form.addEventListener('submit', postuserdetails);


async function postuserdetails(event){
    event.preventDefault();
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    let postObj = {
        name:name,
        email:email,
        password:password
    };
    clearForm();
    
    try{
        const response = await axios.post(link, postObj);
       
        console.log(response);
      
    }
    catch(err){
        console.log(err);
    }
    
}

function clearForm() {
    document.getElementById("signup").reset();
  }