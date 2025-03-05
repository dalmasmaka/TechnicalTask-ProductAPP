import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.dev";
import { debug } from "node:console";
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

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
    getByuserId<HttpResponseModel>(path: string, id: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}/${id}`;
        return this.http.get<HttpResponseModel>(url);
    }
    //update 
    put<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        console.log(url)
        return this.http.put<HttpResponseModel>(url, data);
    }
    //post
    post<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> { 
        const url = `${environment.apiUrl}/${path}`;
        console.log('Full URL:', url);  // Debug log the full URL
        
        // Example of setting headers (if needed)
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          // Any other headers you may need
        });
      
        return this.http.post<HttpResponseModel>(url, data, { headers });
      }
      
    //delete 
    delete<HttpResponseModel>(path: string): Observable<HttpResponseModel> {
        const url = `${environment.apiUrl}/${path}`;
        return this.http.delete<HttpResponseModel>(url);
    }
    // postProducts<HttpResponseModel, RequestModel>(path: string, data: RequestModel, options?: { params: HttpParams }): Observable<HttpResponseModel> {
    //     const url = `${environment.apiUrl}/${path}`;
    //     console.log(url);
    //     return this.http.post<HttpResponseModel>(url, data, options); // Pass options here
    // }
    postProducts<HttpResponseModel, RequestModel>(path: string, data: RequestModel): Observable<HttpResponseModel> {
    const url = `${environment.apiUrl}/${path}`;
    console.log('Request URL:', url);
    console.log('Request Data:', data);  

    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');  

    return this.http.post<HttpResponseModel>(url, data, { headers });
}

    
}