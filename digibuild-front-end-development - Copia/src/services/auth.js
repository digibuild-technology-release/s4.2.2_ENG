import axios from 'axios';
//import config from "./global";
import { jwtDecode } from "jwt-decode";

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
  };

const API_URL = config.host + "/auth/";

class AuthService {
    /* constructor() {
        this.role = null;
        this.dblStructure = null;
    }
 */
    async login(data) {
        console.log(API_URL)
        const response = await axios.post(API_URL + "login", data).then(response => {
            /* const token = response.data.data; // Assume che il token sia incluso nella chiave "data"
            const decodedToken = jwtDecode(token);
    
            // Verifica se il ruolo è già stato impostato
            if (!this.role) {
                this.role = decodedToken.role;
                console.log("Ruolo impostato:", this.role);
            }
            // Verifica se il ruolo è già stato impostato
            if (!this.dblStructure) {
                this.dblStructure = decodedToken.dblStructure;
                console.log("Pilot:", this.dblStructure);
            } */
    
            return response;
        }).catch(error => {
            // Gestione degli errori
            console.log(error);
            if (error.message === "Network Error") {
                error.response = {}
                error.response.message = "ERR_NETWORK"
                error.response.status = 503;
            }
            return error.response;
        });
        return response;
    };
    
    /* getRole() {
        return this.role;
    }
    getDblStructure() {
        return this.dblStructure;
    } */
}

export default new AuthService();
