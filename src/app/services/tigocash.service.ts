import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class TigocashService {

  private link = "http://localhost/bbscmpBackend/index.php";

  private headers = new Headers();

  constructor(private _http:Http) {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  tigocashsSentool = [     
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

tigocashstigocash = [     
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

  gettigocashSentool (date:string){
    let url = this.link+ "/tigocash/sentool";
    let params = 'params='+  date;
    
    
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
    // return this.tigocashsSentool;
  }


  gettigocashSentoolBis (){
    return this.tigocashsSentool;
  }
  
  gettigocashtrafique (date:string){
      let url = this.link+ "/tigocash/trafique";
      let params = 'params='+  date;
    
      return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
      }).catch(error => {return 'bad' });
  }
}
