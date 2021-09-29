import { environment } from "../../environments/environment";

const API_URL = environment.serverApi;

export async function updateUserApi(auth, formData) {
  try {
    const url = `${API_URL}/users/${auth.idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
