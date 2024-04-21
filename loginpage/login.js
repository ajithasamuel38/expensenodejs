const link = "http://localhost:3000/user/signup";

const errormessage = document.getElementById('error-message');

const login = document.getElementById('loginForm');
login.addEventListener('submit', handlecases);

async function handlecases(event){
    event.preventDefault();
    try{
        const response = await axios.get(link);
  
       console.log(response);
       const users = response.data; // Assuming response.data contains the user data
       const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        errormessage.textContent = '';
        const user = users.find(user => (user.email === email || user.password=== password));
    

    
        if(user){
        if(user.password === password && user.email===email){
            alert("Logged in Successfully");
        } else if(user.email===email){
            
            errormessage.textContent= "Password is incorrect";
            
        }else{
            errormessage.textContent = "Email does not exist";
        }
    }else{
        errormessage.textContent = "User does not exist";
    }
       
        
            
    
}

catch {
    console.error('Error fetching user data:');
    
   
    errormessage.textContent= "User does not exist";
}
}

