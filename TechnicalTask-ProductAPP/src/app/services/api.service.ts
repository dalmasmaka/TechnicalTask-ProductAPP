import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.dev";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    //get method
    get<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`
        return this.http.get<HttpResponseModel>(url);
    }
    //get by id
    getById<HttpResponseModel>(path: string, id: number): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}/${id}`;
        return this.http.get<HttpResponseModel>(url);
    }
    //useri e ka string
    getByuserId<HttpResponseModel>(path: string, id: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}/${id}`;
        return this.http.get<HttpResponseModel>(url);
    }
    //update 
    put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        return this.http.put<HttpResponseModel>(url, data);
    }
    //post
    post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        console.log(url);
        return this.http.post<HttpResponseModel>(url, data);
    }
    //delete 
    delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        return this.http.delete<HttpResponseModel>(url);
    }
}