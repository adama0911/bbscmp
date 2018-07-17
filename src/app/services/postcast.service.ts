import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostcastService {
  private link = "http://localhost/bbscmpBackend/index.php";

  private headers = new Headers();

  constructor(private _http:Http) {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  postcastsSentool = [
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    },     
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    },
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    },
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    }
];

postcastspostcast = [     
  {
    point:  "deficitaire",
    numero:  "Doe",
    montant:  "john@example.com",
    type:  "def@somemail.com",
    class: ""
  },
  {
    point:  "deficitaire",
    numero:  "Doe",
    montant:  "john@example.com",
    type:  "def@somemail.com",
    class: ""
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  }
];

  getpostcastSentool (date:string){
    let url = this.link+ "/postcast/sentool";
    let params = 'params='+  date;
    
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
    // return this.postcastsSentool;
  }


  getpostcastSentoolBis (){
    return this.postcastsSentool;
  }
  
  getpostcasttrafique (date:string){
      let url = this.link+ "/postcast/trafique";
      let params = 'params='+  date;
    
      return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
      }).catch(error => {return 'bad' });
  }

  getpostcastpartenaire (date:string){
    let url = this.link+ "/postcast/partenaire";
    let params = 'params='+  date;
  
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
  }
}
