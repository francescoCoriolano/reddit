const userCredential = {
  email: "hello@gmail.com",
  password: "hello123",
};

// Checks if the user is currently authenticated by looking for a token in localStorage
export const isAuthenticated = () => {
  const token = localStorage.getItem("auth");
  return token !== null;
};

// Stores the authentication token in localStorage to maintain the user's logged-in state
export const login = (email: string, password: string) => {
  if (email === userCredential.email && password === userCredential.password) {
    localStorage.setItem("auth", "true");
    return true;
  }
  return false;
};

// Removes the authentication token from localStorage, effectively logging out the user
export const logout = () => {
  localStorage.removeItem("auth");
};
