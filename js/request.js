const baseUrl = "http://localhost:5000/api";

export async function registerPatient(data) {
  try {
    const response = await fetch(`${baseUrl}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("raw response", response);
    const result = await response.json();
    // console.log("parsed result", result);

    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }
    console.log(result);

    // alert("Registration successful")
    return result;
  } catch (err) {
    console.error("Registration error", err.message);
    throw err;
    // alert("Registration failed:"+ err.message);
  }
}

export async function loginPatient(data) {
  
  try {
   const response = await fetch (`${baseUrl}/sessions`,{
    method:"POST",
    headers:{
    "Content-Type":"application/json",
	
    },
   body: JSON.stringify(data),
   });
  
    console.log("Raw response:", response);

    const result = await response.json();
    console.log("Parsed result:", result);
 
    if (!response.ok) {
      throw new Error(result?.error || "Login failed");
    }
    console.log(result);

    // alert("Registration successful")
    return result;
  } catch (err) {
    console.error("Login error", err.message);
    throw err;
    // alert("Registration failed:"+ err.message);
  }
}

export async function getDoctors(specialityId = null) {
  const url = specialityId
   ? `${doctorBaseUrl}/doctors?speciality=${specialityId}`
   : `${doctorBaseUrl}/doctors`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch doctors");
    return await res.json();
  } catch (err) {
    console.error("Doctor fetch error:", err.message);
    throw err;
  }
}
  

