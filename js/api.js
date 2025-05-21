async function registerPatient(data) {
    try {
        const response = await fetch("/patients",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    }); 
    const result=await response.json();

    if (!response.ok){
        throw new Error("Registration failed")
    }
    
    alert("Registration successful")
    return result;
    
}catch (err) {
    console.error("Registration error",err.message);
    alert("Registration failed:"+ err.message);
}
}