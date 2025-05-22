document.getElementById("registerForm").addEventListener("submit",async function(e){
 e.preventDefault();
})

const genderInput = form.querySelector('input[name="gender"]:checked');
const gender =genderInput?genderInput.value:"";

const form = e.target;
const data = {
   fullname:form.name.value,
   username:form.username.value,
   dob:form.dob.value,
   gender:form.gender.value,
   password:form.password.value,
};

const result = await registerPatient(data)


const status = document.getElementById("registration Status")
if (result){
    status.innerText="Registration Successful";
    status.style.color="green";
}else{
    status.innerText="Registration failed";
    status.style.color="red"
}



