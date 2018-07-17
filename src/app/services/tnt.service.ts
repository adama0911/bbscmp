import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TntService {

  private link = "http://localhost/bbscmpBackend/index.php";

  private headers = new Headers();

  constructor(private _http:Http) {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  tntsSentool = [
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
    },
    {
      point:  "equilibrer",
      numero:  "Activeson",
      montant:  "act@example.com",
      type:  "def@somemail.com",
      class: "",
    }
];

tntsTnt = [     
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
  },
  {
    point:  "equilibrer",
    numero:  "Activeson",
    montant:  "act@example.com",
    type:  "def@somemail.com",
    class: "",
  }
];

  gettntSentool (date:string){
    let url = this.link+ "/tnt/sentool";
    let params = 'params='+  date;
    
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
    }).catch(error => {return 'bad' });
    // return this.tntsSentool;
  }


  gettntSentoolBis (){
    return this.tntsSentool;
  }
  
  gettnttrafique (date:string){
      let url = this.link+ "/tnt/trafique";
    
      let params = 'params='+  date;
    
      return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
          // let datas = res;
          // console.log(res.json());
          return res;
      }).catch(error => {return 'bad' })
  }

  gettntpartenaire (date:string){
    let url = this.link+ "/tnt/partenaire";
  
    let params = 'params='+  date;
  
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
    }).catch(error => {return 'bad' })
  }
}
