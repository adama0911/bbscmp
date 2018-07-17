import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class OrangemoneyService {
  private link = "http://localhost/bbscmpBackend/index.php";

  private headers = new Headers();

  constructor(private _http:Http) {
      this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  orangemoneysSentool = [
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

orangemoneysorangemoney = [     
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

  getorangemoneySentool (date:string){
    let url = this.link+ "/orangemoney/sentool";
    let params = 'params='+  date;
    
    return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
      // let datas = res;
      // console.log(res.json());
      return res;
    }).catch(error => {return 'bad' });
    // return this.orangemoneysSentool;
  }


  getorangemoneySentoolBis (){
    return this.orangemoneysSentool;
  }
  
  getorangemoneytrafique (date:string){
      let url = this.link+ "/orangemoney/trafique";
      let params = 'params='+  date;
    
      return this._http.post(url, params, {headers:this.headers}).toPromise().then( res => {
        // let datas = res;
        // console.log(res.json());
        return res;
      }).catch(error => {return 'bad' });
  }
}
