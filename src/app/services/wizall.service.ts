import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WizallService {

  private link = "http://localhost/bbscmpBackend/index.php";

  private headers = new Headers();

  constructor(private _http:Http) {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  wizallsSentool = [
    {
      point:  "excedentaire",
      numero:  "Defaultson",
      montant:  "def@somemail.com",
      type:  "def@somemail.com",
      class: ""
    },     
    {
      point:  "excedentaire",
      numero:  "Defaultson",
      montant:  "def@somemail.com",
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
      point:  "excedentaire",
      numero:  "Defaultson",
      montant:  "def@somemail.com",
      type:  "def@somemail.com",
      class: ""
    },
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    }
];

wizallswizall = [     
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
    point:  "excedentaire",
    numero:  "Defaultson",
    montant:  "def@somemail.com",
    type:  "def@somemail.com",
    class: ""
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  }
];

  getwizallSentool (date:string){
    let url = this.link+ "/wizall/sentool";
    let params = 'params='+  date;
    
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
    // return this.wizallsSentool;
  }


  getwizallSentoolBis (){
    return this.wizallsSentool;
  }
  
  getwizalltrafique (date:string){
      let url = this.link+ "/wizall/trafique";
      let params = 'params='+ date;
    
      return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
      }).catch(error => {return 'bad' });
  }

  partenaire

  getwizallpartenaire (date:string){
    let url = this.link+ "/wizall/partenaire";
    let params = 'params='+ date;
  
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
  }
}
