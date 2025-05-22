const baseUrl = "http://localhost:5000/api";
async function registerPatient(data) {
  try {
    const response = await fetch(`${baseUrl}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    // alert("Registration successful")
    return result;
  } catch (err) {
    console.error("Registration error", err.message);
    // alert("Registration failed:"+ err.message);
  }
}

async function loginPatient(data) {
  try {
    const response = await fetch("http://127.0.0.1:5500/sessions", {
      method: "POST",
      headers: {
        "Content-Type ": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  } catch (err) {
    console.error("Login error", err.message);
  }
}
