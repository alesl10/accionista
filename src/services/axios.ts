import https from 'https';
import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://localhost:7243/api/',
      httpsAgent: new https.Agent({
    rejectUnauthorized: false, // ⚠️ Solo para desarrollo
  }),
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false //cambiar cuando cambies cors en el api para prod
})

export default instance