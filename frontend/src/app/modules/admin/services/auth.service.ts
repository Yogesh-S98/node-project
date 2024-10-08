import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class apis {
    baseUrl = environment.API_URL;
    // private encryptionKey: string = '2c1c722cd37ec25908a5233037839a1cb8cfaa1a6eff4c7e5444bc1e339f512c';
    constructor(private http: HttpClient) {
        // this.encryptionKey = this.generateEncryptionKey();
    }

    // code using cryptojs for data

    // private generateEncryptionKey(): string {
    //     // Generate 32 bytes (256 bits) of random data and convert to hex string
    //     const randomBytes = CryptoJS.lib.WordArray.random(32);
    //     return randomBytes.toString(); // This returns the key in a hex string format
    // }
    // encryptData(data: any): string {
    //     return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
    // }
    // decryptData(encryptedData: string): any {
    //     const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    //     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // }

    login(payload: any) {
        // const encryptedPayload = this.encryptData(payload);
        // console.log('asdfaf', encryptedPayload);
        return this.http.post(`${this.baseUrl}/login`, payload);
    }
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