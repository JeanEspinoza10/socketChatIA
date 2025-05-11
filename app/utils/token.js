import dotenv from "dotenv";
dotenv.config();

const URL_TOKEN = process.env.URL_TOKEN

export const verifyToken = async (token) => {
    const url_verify = URL_TOKEN;
    try {
        const response = await fetch(url_verify, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = response.json();
        return true
        
      } catch (error) {
        return false
    }
}