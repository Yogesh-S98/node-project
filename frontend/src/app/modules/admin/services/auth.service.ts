import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";


@Injectable({
    providedIn: 'root'
})
export class apis {
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient) {}
    createUser(payload: any) {
        return this.http.post(`${this.baseUrl}/ping`, payload);
    }
    updateUser(payload: any) {
        return this.http.put(`${this.baseUrl}/updateUser`, payload);
    }
    list() {
        return this.http.get(`${this.baseUrl}/userList`);
    }
    deleteUser(id: any) {
        return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
    }
}