import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private baseUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getRepositories(username: string, pageSize: number, page: number): Observable<any> {
    const url = `${this.baseUrl}/search/repositories?q=user:${username}&per_page=${pageSize}&page=${page}`;
    return this.http.get<any>(url);
  }
}
