const link = "http://localhost:3000/expense/expensetable";

const form = document.getElementById('expense');
form.addEventListener('submit', addexpense);
const deleteexpense = document.getElementById("addedexpense");
deleteexpense.addEventListener('click', deleteExpense);
window.addEventListener("DOMContentLoaded", showexpense);

async function addexpense(event){
   event.preventDefault();
   const amount = event.target.amount.value;
   const description = event.target.description.value;
   const category = event.target.category.value;

   const myObj = {
    amount: amount,
    description: description,
    category: category
   }
   try{
      const response = await axios.post(link, myObj);
      console.log(response.data.expense);
      displayexpense(response.data.expense);
   }catch{
     console.log(error);
   }
}

async function displayexpense(obj){
    const {id, amount, description, category} = obj;
    const ul = document.getElementById('addedexpense');
    const li = document.createElement('li');
    li.innerHTML = `${amount} - ${description} - ${category}`;
    let btn = document.createElement('button');
    btn.id = id;
    btn.type='click';
    btn.textContent = "Delete Expense";
    btn.className ='delete';
    li.appendChild(btn);

    ul.appendChild(li);
}

async function showexpense(){
    try{
        const details  = await axios.get(link);
        console.log(details);
        details.data.forEach(element=>{
           console.log(element);
           displayexpense(element);
        })
        }
        catch(err){
            console.log(err);
        }
    
}

async function deleteExpense(event){
   
    if(event.target.classList.contains("delete")){
    const parentele = event.target.parentElement;
    const idvalue = event.target.id;
    try{
        const response = await axios.delete(`${link}/${idvalue}`);
        console.log(response);
        parentele.remove();
    }
    catch(err){
        console.log(err);
    }
    

}
}