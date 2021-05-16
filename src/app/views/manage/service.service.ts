import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  category(data)
  {
    return this.http.post(`${environment}category`, data);
  }
  delcat(id)
  {
    return this.http.get(`${environment}delcat/${id}`);
  }
  editcat(data)
  {
    return this.http.post(`${environment}editcat`,data);
  }
  editsubcat(data)
  {
    return this.http.post(`${environment}editsubcat`,data);
  }
  suspendCat(data)
  {
    return this.http.post(`${environment}suspendCat`,data);
  }
  fatchcatbyid(id)
  {
    return this.http.get(`${environment}fatchcatbyid/${id}`);
  }
  register(data)
  {
    return this.http.post(`${environment}register`,data);
  }
  login(data)
  {
    return this.http.post(`${environment}login`,data);
  }
  fatchuser(uid)
  {
    return this.http.get(`${environment}fatchuser/${uid}`);
  }
  post(data)
  {
    return this.http.post(`${environment}post`, data);
  }
  profile(data)
  {
    return this.http.post(`${environment}profile`,data);
  }
  // subcategory(data)
  // {
  //   return this.http.post(`${environment}subcategory/${id}`, data);
  // }
}

