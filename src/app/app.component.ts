import { Component , OnInit,ViewChild, TemplateRef} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { TabsetComponent } from 'ngx-bootstrap';
import { TntService } from 'src/app/services/tnt.service';
import { WizallService } from './services/wizall.service';
import { TigocashService } from './services/tigocash.service';
import { PostcastService } from './services/postcast.service';
import { EmoneyService } from './services/emoney.service';
import { OrangemoneyService } from 'src/app/services/orangemoney.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'app';
    oneAtATime: boolean = true;
    customClass: string = 'customClass';
    isFirstOpen: boolean = true;
    motif:any=undefined;
    // tntsSentool:any[]= [];
    // tntsTnt:any[] = [];


   date1:string;
   date2:string;

   

  constructor(public _tntService:TntService ,public _omService:OrangemoneyService,public _postcast:PostcastService,public _wizall:WizallService,public _tigoCash:TigocashService,public _emoney:EmoneyService){
    setTheme('bs3'); // or 'bs4'
  }

  ngOnInit(){
    // this.tntsTnt      =  this._tntService.gettnttrafique();
    // this.tntsSentool  =  this._tntService.gettntSentoolBis();
    console.log("ngOnInit");

    this.intervel('jour');
}

intervel(typeDate){
    this.tntsPartenaire  =  [];
    this.tntsSentool     =  [];
    this.tnts   =  [];

    let date:string;
    if(typeDate=="intervalle"){ date = this.date1 +" "+this. date2; console.log(date);}
    else if (typeDate=="jour") {date = this.todayDate(); console.log(date);};

    console.log(typeDate+ ' : '+ date);

    /***********************TNT*******************************/ 


    this._tntService.gettntSentool(JSON.stringify({typedate:typeDate,date:date})).then(
         data => {
            console.log('-----------------------TNT Sentool------------------');
            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;

            // console.log(datas);
            // for(let i:number=0; i< datas.length ; i++)
            //     this.tntsSentool.push(JSON.parse(datas[i].info))
            for(let i:number=0 ; i < datas.length ; i++){
                this.tntsSentool.push(JSON.parse(datas[i].infosoperation));
                this.tntsSentool[this.tntsSentool.length - 1].dependsOn = datas[i].dependsOn;
            }
        
            console.log(this.tntsSentool);
            //   this.tntsSentool = datas.params;

            this.tntTotalTransSentool = this.tntsSentool.length;

            for(let i:number=0 ; i < this.tntsSentool.length ; i++)
                if((this.tntsSentool[i]).montant != undefined)
                    {this.tntTotalMontantSentool +=   parseInt((this.tntsSentool[i]).montant); this.tntsSentool[i].type =   "Abonnement";}
                else if((this.tntsSentool[i]).prix != undefined)
                    {this.tntTotalMontantSentool +=    parseInt((this.tntsSentool[i]).prix);this.tntsSentool[i].type =   "Vente décodeur";}
 
          this._tntService.gettnttrafique(JSON.stringify({typedate:typeDate,date:date})).then(
            data => {
                console.log('-----------------------TNT Trafique------------------');
                let datas =  JSON.parse(JSON.parse(data['_body']).response).result;                ;
                console.log(datas);
    //             for(let i:number=0; i< datas.length ; i++)
    //                 this.tntsTnt.push(JSON.parse(datas[i].info))

    //             this.tntTotalTranstrafique = this.tntsTnt.length;

    //             for(let i:number=0 ; i < this.tntsTnt.length ; i++)
    //                   this.tntTotalMontanttrafique  =   (this.tntsTnt[i]).montant;

    //             if(this.tntsSentool.length != 0  && this.tntsTnt.length != 0)
    //             this.calculeEtatTransactionsTNT(this.tntsSentool,this.tntsTnt,this.tnts.datas);

                    
                    this._tntService.gettntpartenaire(JSON.stringify({typedate:typeDate,date:date})).then(
                        data => {
                            console.log('-----------------------TNT Partenaire------------------');
                            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;

                            this.tntsPartenaire = datas;

                            console.log(this.tntsPartenaire);

                            this.tntTotalTransPartenaire = this.tntsPartenaire.length;
                            console.log("tntTotalTransPartenaire======> :"+ this.tntTotalTransPartenaire);
                            for(let i:number=0 ; i < this.tntsPartenaire.length ; i++)
                                if((this.tntsPartenaire[i]).montant != undefined)
                                   { this.tntTotalMontantpartenaire +=    parseInt((this.tntsPartenaire[i]).montant);this.tntsPartenaire[i].type =  "Abonnement"}
                                else if((this.tntsPartenaire[i]).prix != undefined)
                                    {this.tntTotalMontantpartenaire +=    parseInt((this.tntsPartenaire[i]).prix); this.tntsPartenaire[i].type =  "Vente décodeur"}

                            console.log("tntTotalMontantpartenaire======> :"+ this.tntTotalMontantpartenaire);
                            //let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;
                            if(this.tntsPartenaire.length > this.tntsSentool.length)
                                this.tnts.etat = "panel-danger";
                            else if (this.tntsPartenaire.length < this.tntsSentool.length)
                                this.tnts.etat = "panel-warning";
                            else 
                                this.tnts.etat = "panel-info";

                            this.calculeEtatTransactionsTNT ();
                    });     
            }
          );
        }
     );

    /****************************WIZALL*******************-*/ 



    this._wizall.getwizallSentool(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log('-----------------------WIZALL Sentool-----------------');
            console.log(data);
            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;

            for(let i:number=0 ; i < datas.length ; i++){
                this.wizallsSentool.push(JSON.parse(datas[i].infosoperation));
                this.wizallsSentool[this.wizallsSentool.length - 1].iduser = datas[i].iduser;
            }

            console.log(this.wizallsSentool);

            this.wizallTotalTransSentool = this.wizallsSentool.length;
  
            for(let i:number=0 ; i < this.wizallsSentool.length ; i++)
                if((this.wizallsSentool[i]).montant != undefined)
                    this.wizallTotalMontantSentool  +=   parseInt((this.wizallsSentool[i]).montant);
                else if((this.wizallsSentool[i]).amount != undefined)
                    this.wizallTotalMontantSentool  +=   parseInt((this.wizallsSentool[i]).amount);

   
            this._wizall.getwizalltrafique(JSON.stringify({typedate:typeDate,date:date})).then(
              data => {
                    console.log('-----------------------WIZALL Trafique-----------------');
                    let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;
                   
                    for(let i:number=0 ; i < datas.length ; i++){
                            this.wizallswizall.push(JSON.parse(datas[i].info));
                            this.wizallswizall[this.wizallswizall.length - 1].dependsOn = datas[i].depends_on;
                    }
                    
                    console.log(this.wizallswizall);
                    this.wizallTotalMontanttrafique = 0;

                    this.wizallTotalTranstrafique = this.wizallswizall.length;
    
                    for(let i:number=0 ; i < this.wizallswizall.length ; i++)
                        if((this.wizallswizall[i]).montant != undefined)
                                this.wizallTotalMontanttrafique  +=   parseInt((this.wizallswizall[i]).montant);
                        else if((this.wizallswizall[i]).amount != undefined)
                                this.wizallTotalMontanttrafique  +=   parseInt((this.wizallswizall[i]).amount);
  
                    this._wizall.getwizallpartenaire(JSON.stringify({typedate:typeDate,date:date})).then(
                        data => {
                            console.log('-----------------------WIZALL Partenaire-----------------');
                            let datas = JSON.parse(JSON.parse(JSON.parse(data['_body'])['response']).result);
                            this.wizallspartenaire = datas;
                            console.log(this.wizallspartenaire);

                            this.wizallTotalTranspartenaire = this.wizallspartenaire.length;
                    
                                for(let i:number=0 ; i < this.wizallspartenaire.length ; i++)
                                    if((this.wizallspartenaire[i]).montant != undefined)
                                        this.wizallTotalMontantpartenaire  +=   parseInt((this.wizallspartenaire[i]).montant);
                                    else if((this.wizallspartenaire[i]).amount != undefined)
                                        this.wizallTotalMontantpartenaire  +=   parseInt((this.wizallspartenaire[i]).amount);
                            
                                    console.log("wizallTotalTransSentoo==>"+this.wizallTotalTransSentool);
                                    console.log("wizallTotalTranspartenaire==>"+this.wizallTotalTranspartenaire);
                                    if(this.wizallTotalTransSentool> this.wizallTotalTranspartenaire)
                                        this.wizalls.etat = "panel-warning";
                                    else if (this.wizallTotalTransSentool  < this.wizallTotalTranspartenaire)
                                        this.wizalls.etat = "panel-danger";
                                    else 
                                        this.wizalls.etat = "panel-info";

                                    this.calculeEtatTransactionswizall();
                            }
                    );
                }
            );
        }
    );

     /****************************POSTCAST*******************-*/ 
     this._postcast.getpostcastpartenaire(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log(data);
        }
    );

     this._postcast.getpostcastSentool(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log('-----------------------POSTCAST Sentool------------------');
            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;

            console.log(datas);
            this.postcastsSentool = datas;
  
            this.postcastTotalTransSentool = this.postcastsSentool.length;
  
            for(let i:number=0 ; i < this.postcastsSentool.length ; i++)
                if((this.postcastsSentool[i]).montant != undefined)
                    this.postcastTotalMontantSentool  +=   parseInt((this.postcastsSentool[i]).montant);
                else if((this.postcastsSentool[i]).amount != undefined)
                    this.postcastTotalMontantSentool  +=   parseInt((this.postcastsSentool[i]).amount);
   
            this._postcast.getpostcasttrafique(JSON.stringify({typedate:typeDate,date:date})).then(
              data => {
                    let key:string , marchand:string;

                    console.log('-----------------------POSTCAST Trafique------------------');
                    let datas = JSON.parse(JSON.parse(data['_body']).response).result;
                    console.log(datas);

  
                    for(let i:number=0 ; i < datas.length ; i++){
                        marchand = (((datas[i].parametres).split('-'))[0].split(':'))[1];
                        key      = (((datas[i].parametres).split('-'))[1].split(':'))[1];
                        this.postcastspostcast.push({marchand:marchand, key:key});
                    }

                    this.postcastTotalTranstrafique = this.postcastspostcast.length;
  
                    for(let i:number=0 ; i < this.postcastspostcast.length ; i++)
                        if((this.postcastspostcast[i]).montant != undefined)
                            this.postcastTotalMontanttrafique  +=   parseInt((this.postcastspostcast[i]).montant)
                        else if((this.postcastspostcast[i]).amount != undefined)
                            this.postcastTotalMontanttrafique  +=   parseInt((this.postcastspostcast[i]).amount);
  
            //       if(this.postcastsSentool.length != 0  && this.postcastspostcast.length != 0)
            //       this.calculeEtatTransactionspostcast(this.postcastsSentool,this.postcastspostcast,this.postcasts.datas);
              }
            );
        }
      );
      /****************************E-MONEY*******************-*/ 

     this._emoney.getemoneySentool(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log('-----------------------E-MONEY Sentool------------------');
            let datas = JSON.parse( JSON.parse(data['_body']).response).result;

            // for(let i:number=0 ; i < datas.length ; i++){
            //     this.emoneysSentool.push(JSON.parse(datas[i].infosoperation));
            //     this.emoneysSentool[this.emoneysSentool.length - 1].dependsOn = datas[i].dependsOn;
            // }
            this.emoneysSentool =   datas;
           
            console.log(this.emoneysSentool);
            
            this.emoneyTotalTransSentool = this.emoneysSentool.length;
  
            for(let i:number=0 ; i < this.emoneysSentool.length ; i++)
                if((this.emoneysSentool[i]).montant != undefined)
                    this.emoneyTotalMontantSentool  +=   parseInt((this.emoneysSentool[i]).montant);
                else if((this.emoneysSentool[i]).amount != undefined)
                    this.emoneyTotalMontantSentool  +=   parseInt((this.emoneysSentool[i]).amount);
  
            this._emoney.getemoneytrafique(JSON.stringify({typedate:typeDate,date:date})).then(
              data => {
                    console.log('-----------------------E-MONEY Trafique------------------');
                    let datas =  JSON.parse(JSON.parse(data['_body']).response).result;
                    // console.log(datas);
                  
                    for(let i:number=0 ; i < datas.length ; i++){
                        this.emoneysemoney.push(JSON.parse(datas[i].info));
                        this.emoneysemoney[this.emoneysemoney.length - 1].dependsOn = datas[i].depends_on;
                    }
                    console.log(this.emoneysemoney);

                    this.emoneyTotalTranstrafique = this.emoneysemoney.length;
  
                    for(let i:number=0 ; i < this.emoneysemoney.length ; i++)
                        if((this.emoneysemoney[i]).montant != undefined)
                            this.emoneyTotalMontanttrafique  +=   parseInt((this.emoneysemoney[i]).montant);
                        else if((this.emoneysemoney[i]).amount != undefined)
                            this.emoneyTotalMontanttrafique  +=   parseInt((this.emoneysemoney[i]).amount);

  
            //       if(this.emoneysSentool.length != 0  && this.emoneysemoney.length != 0)
            //       this.calculeEtatTransactionsemoney(this.emoneysSentool,this.emoneysemoney,this.emoneys.datas);
              }
            );
        }
      );

     /****************************TIGO-CASH*******************-*/ 

     this._tigoCash.gettigocashSentool(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log('-----------------------TIGO-CASH Sentool------------------');
            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;

            // console.log(datas);
            this.tigocashsSentool = datas;
            console.log(this.tigocashsSentool);
            this.tigocashTotalTransSentool = this.tigocashsSentool.length;
  
            for(let i:number=0 ; i < this.tigocashsSentool.length ; i++)
                if((this.tigocashsSentool[i]).montant != undefined)
                    this.tigocashTotalMontantSentool  +=   parseInt((this.tigocashsSentool[i]).montant);
                else if((this.tigocashsSentool[i]).amount != undefined)
                    this.tigocashTotalMontantSentool  +=   parseInt((this.tigocashsSentool[i]).amount);

   
            this._tigoCash.gettigocashtrafique(JSON.stringify({typedate:typeDate,date:date})).then(
              data => {
                    console.log('-----------------------TIGO-CASH Trafique------------------');
                    let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;
    
                    this.tigocashTotalTranstrafique = this.tigocashstigocash.length;
  
                    for(let i:number=0 ; i < datas.length ; i++){
                        this.tigocashstigocash.push(JSON.parse(datas[i].info));
                        this.tigocashstigocash[this.tigocashstigocash.length - 1].dependsOn = datas[i].depends_on;
                    }
                    
                    console.log(this.tigocashstigocash)

                    for(let i:number=0 ; i < this.tigocashstigocash.length ; i++)
                        if((this.tigocashstigocash[i]).montant != undefined)
                            this.tigocashTotalMontanttrafique +=   parseInt((this.tigocashstigocash[i]).montant);
                        else if((this.tigocashstigocash[i]).amount != undefined)
                            this.tigocashTotalMontanttrafique +=   parseInt((this.tigocashstigocash[i]).amount);
  
            //       if(this.tigocashsSentool.length != 0  && this.tigocashstigocash.length != 0)
            //       this.calculeEtatTransactionstigocash(this.tigocashsSentool,this.tigocashstigocash,this.tigocashs.datas);
              }
            );
        }
      );

        /****************************ORANGE-MONEY*******************-*/ 

    this._omService.getorangemoneySentool(JSON.stringify({typedate:typeDate,date:date})).then(
        data => {
            console.log('-----------------------OM Sentool  ------------------');
            let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;
            this.orangemoneysSentool = datas;
            console.log(this.orangemoneysSentool);
            this.orangemoneyTotalTransSentool = this.orangemoneysSentool.length;
  
            for(let i:number=0 ; i < this.orangemoneysSentool.length ; i++)
                if((this.orangemoneysSentool[i]).montant != undefined)
                    this.orangemoneyTotalMontantSentool  +=   parseInt((this.orangemoneysSentool[i]).montant);
                else if((this.orangemoneysSentool[i]).amount != undefined)
                    this.orangemoneyTotalMontantSentool  +=   parseInt((this.orangemoneysSentool[i]).amount);
   
            this._omService.getorangemoneytrafique(JSON.stringify({typedate:typeDate,date:date})).then(
              data => {
                console.log('-----------------------OM Trafique  ------------------');
                let datas = JSON.parse(JSON.parse(data['_body'])['response']).result;
                  console.log(datas);
            //       this.orangemoneysorangemoney= datas.params;
  
            //       this.orangemoneyTotalTranstrafique = this.orangemoneysorangemoney.length;
  
            //       for(let i:number=0 ; i < this.orangemoneysorangemoney.length ; i++)
            //             this.orangemoneyTotalMontanttrafique  =   (this.orangemoneysorangemoney[i]).montant;
  
            //       if(this.orangemoneysSentool.length != 0  && this.orangemoneysorangemoney.length != 0)
            //       this.calculeEtatTransactionsorangemoney(this.orangemoneysSentool,this.orangemoneysorangemoney,this.orangemoneys.datas);
                   

                }
            );
        }
    );
}

todayDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    
    let mmm:string;
    let ddd:string;
    let todayy:string;

    if(dd<10) {
        ddd = '0'+dd
    }else
        ddd = ''+dd;

    if(mm<10) {
        mmm = '0'+mm
    } 
    else 
        mmm = ''+ mm

    todayy = yyyy+'-'+mmm+ '-' + ddd;
    return todayy;
}

changerMotif(event){
this.motif = event.target.value;
}

  /*-----------------------------TNT----------------------------------------*/

  tntsSentool:any[] = [];
  tntsTnt:any[] = [];
  tntsPartenaire:any[] = [];
  tntsConf:any[] = [];
  tnts:any= {
      datas: [],
      etat:  'panel-info'
  };

  tntTotalTransSentool:number = 0;
  tntTotalMontantSentool:number = 0;
  tntTotalTransPartenaire:number = 0;
  tntTotalTranstrafique:number = 0;
  tntTotalMontanttrafique:number = 0;
  tntTotalMontantpartenaire:number = 0;

  calculeEtatTransactionsTNT (){
    let obj:any;
    let countSentool:number=0;
    let countPartenairet:number=0;
    let etat:number = 0;

    for(let i:number=0 ; i <  this. tntsSentool.length; i++){
        obj =  this. tntsSentool[i];
        countPartenairet = 0; 
        countSentool  = 0;

        for(let j:number=0 ; j <   this. tntsSentool.length; j++)
            if(this.sontEgauxTNT( this. tntsSentool[j], obj))
                countSentool++;

        
        for(let j:number=0 ; j <  this.tntsPartenaire.length; j++)
            if(this.sontEgauxTNT(this.tntsPartenaire[j], obj))
            countPartenairet++;

        if(countSentool > countPartenairet ){
                 this. tntsSentool[i].class = "alert-warning";
                 this. tntsSentool[i].nbrSentool = countSentool;
                 this. tntsSentool[i].nbrPartenaire = countPartenairet;
                 this.tntsConf.push(this. tntsSentool[i]);
        }

        if(countSentool < countPartenairet ){
             this. tntsSentool[i].class = "alert-danger";
             this. tntsSentool[i].nbrSentool = countSentool;
             this. tntsSentool[i].nbrPartenaire = countPartenairet;
             this.tntsConf.push(this. tntsSentool[i]);
        }

        if(countSentool == countPartenairet ){
             this. tntsSentool[i].class = "alert-info";
            
        }
    }

    // for(let i:number=0 ; i < this.tntsPartenaire.length; i++){
    //     obj = this.tntsPartenaire[i];
    //     countPartenairet = 0; 
    //     countSentool  = 0;

    //     for(let j:number=0 ; j <   this. tntsSentool.length; j++)
    //         if(this.sontEgauxTNT( this. tntsSentool[j], obj))
    //             countSentool++;

    //     if(countSentool==0){
    //         this.tntsPartenaire[i].class = "alert-danger";
    //     }
    // }
     
    for(let i:number=0 ; i <  this. tntsPartenaire.length; i++){
        obj =  this. tntsPartenaire[i];
        countPartenairet = 0; 
        countSentool  = 0;

        for(let j:number=0 ; j <   this. tntsSentool.length; j++)
            if(this.sontEgauxTNT( this. tntsSentool[j], obj))
                countSentool++;

        
        for(let j:number=0 ; j <  this.tntsPartenaire.length; j++)
            if(this.sontEgauxTNT(this.tntsPartenaire[j], obj))
            countPartenairet++;

        if(countSentool < countPartenairet ){
                 this. tntsPartenaire[i].class = "alert-danger";
                
        }

        if(countSentool > countPartenairet ){
             this. tntsPartenaire[i].class = "alert-warning";
            
        }

        if(countSentool == countPartenairet ){
             this. tntsPartenaire[i].class = "alert-info";
            
        }

        if(countSentool == 0 ){
            this. tntsPartenaire[i].class = "alert-danger";
            this. tntsPartenaire[i].nbrSentool = countSentool;
            this. tntsPartenaire[i].nbrPartenaire = countPartenairet;
            this.tntsConf.push(this. tntsPartenaire[i]);
       }
    }

  }

  sontEgaux(obj1:any, obj2:any):boolean{
      if(obj1.point==obj2.point && obj1.numero==obj2.numero && obj1.montant==obj2.montant && obj1.type==obj2.type)
          return true;
      else
          return false;
  }

  sontEgauxTNT(obj1:any, obj2:any):boolean{
    if(obj1.n_chip==obj2.n_chip)
        return true;
    else
        return false;
  }


  couleurEtat(){
     return this.tnts.etat;
  }

    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    
    selectTab(tab_id: number) {
        this.staticTabs.tabs[tab_id].active = true;
    }

    sotedCallbackTNT(a,b){
        if(a.point == b.point && a.numero == b.numero && a.montant == b.montant)
            return 1;
        else
            return 2;
    }


    reequilibrerExcedentaire(operation,operateur){

    }

    reequilibrerDeficitaire(operation,operateur){

    }

    /*-----------------------------POSTCAST----------------------------------------*/
    postcastsSentool:any[] = [];
    postcastspostcast:any[] = [];
    postcasts:any= {
        datas: [],
        etat:  'panel-info'
    };
  
    postcastTotalTransSentool:number = 0;
    postcastTotalMontantSentool:number = 0;
    postcastTotalTranstrafique:number = 0;
    postcastTotalMontanttrafique:number = 0;

    calculeEtatTransactionspostcast (sentool:any[],trafique:any[],shows:any[]){
        let obj:any;
        let countSentool:number=0;
        let countpostcast:number=0;
        let etat:number = 0;
  
        for(let i:number=0 ; i < sentool.length; i++){
            obj = sentool[i];
            countpostcast = 0; 
            countSentool  = 0;
  
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
  
            for(let j:number=0 ; j <  trafique.length; j++)
                if(this.sontEgaux(trafique[j], obj))
                    countpostcast++;
  
            if(countSentool > countpostcast ){
                sentool[i].nbr = (countSentool - countpostcast);
                sentool[i].class = "alert-danger";
                
            }
            else 
                if(countSentool < countpostcast){
                    sentool[i].nbr = (countpostcast - countSentool);
                    sentool[i].class = "alert-warning";
                    if(etat!= 3) etat = 2;
                }
            else {
              sentool[i].nbr = 0;
              sentool[i].class = "alert-success";
              
            }
        }
  
        shows = sentool;
        this.postcasts.datas = sentool;
  
      for(let i:number=0 ; i < trafique.length; i++){
          obj = trafique[i];
          countpostcast = 0; 
          countSentool  = 0;
  
          for(let j:number=0 ; j <  sentool.length; j++)
              if(this.sontEgaux(sentool[j], obj))
                  countSentool++;
  
          if(countSentool==0){
              obj.nbr = 1;
              obj.class = "alert-warning";
              if(etat!= 3) etat = 2;
              this.postcasts.datas.push(obj);
          }
      }
  
      if(etat == 3 ) this.postcasts.etat = 'alert-danger';
      else if(etat == 2 ) this.postcasts.etat = 'alert-warning';
      else  this.postcasts.etat = 'alert-success';
        
    }

    /*-----------------------------WIZALL----------------------------------------*/
    wizallsSentool:any[] = [];
    wizallswizall:any[] = [];
    wizallspartenaire:any[] = [];
    wizalls:any= {
        datas: [],
        etat:  'panel-info'
    };

    wizallsConf:any[] = [];
    
    wizallTotalTransSentool:number = 0;
    wizallTotalTranspartenaire:number = 0;
    montant:number = 0;
    wizallTotalMontantSentool:number = 0;
    wizallTotalTranstrafique:number = 0;
    wizallTotalMontanttrafique:number = 0;
    wizallTotalMontantpartenaire:number = 0;

    sontEgauxWALL(obj1:any, obj2:any):boolean{
        if(parseInt(obj1.idtrans)==parseInt(obj2.id) || parseInt(obj1.id)== parseInt(obj2.id)   || parseInt(obj1.idtrans)==parseInt(obj2.id) || parseInt(obj1.transactionid)== parseInt(obj2.id))
            return true;
        else
            return false;
    }

    calculeEtatTransactionswizall (){
        let obj:any;
        let countSentool:number=0;
        let countPartenairet:number=0;
        let etat:number = 0;

        for(let i:number=0 ; i <  this. wizallsSentool.length; i++){
            obj =  this. wizallsSentool[i];
            countPartenairet = 0; 
            countSentool  = 0;

            if(this. wizallsSentool[i].TOKEN != undefined)
                this. wizallsSentool[i].type    =   "woyofal";
            else if(this. wizallsSentool[i].police != undefined)
                this. wizallsSentool[i].type    =   "Sénélec";

            for(let j:number=0 ; j <   this. wizallsSentool.length; j++)
                if(this.sontEgauxWALL( this. wizallsSentool[j], obj))
                    countSentool++;

            
            for(let j:number=0 ; j <  this.wizallspartenaire.length; j++)
                if(this.sontEgauxWALL(this.wizallspartenaire[j], obj))
                countPartenairet++;

            if(countSentool > countPartenairet ){
                    this. wizallsSentool[i].class = "alert-danger";
                    this. wizallsSentool[i].nbrSentool = countSentool;
                    this. wizallsSentool[i].nbrSentool = countSentool;
                    this. wizallsSentool[i].nbrPartenaire = countPartenairet;
                    this.wizallsConf.push(this. wizallsSentool[i]);
                    if(etat!=2) etat    =   1;
            }

            if(countSentool < countPartenairet ){
                this. wizallsSentool[i].class = "alert-warning";
                this. wizallsSentool[i].nbrSentool = countSentool;
                this. wizallsSentool[i].nbrPartenaire = countPartenairet;
                this.wizallsConf.push(this. wizallsSentool[i]);
                etat    =   1;
                if(etat!=2 && etat!=1) etat    =   0;
            }

            if(countSentool == countPartenairet ){
                this. wizallsSentool[i].class = "alert-info";
            }


        }


        for(let i:number=0 ; i <  this. wizallspartenaire.length; i++){
            obj =  this. wizallspartenaire[i];
            countPartenairet = 0; 
            countSentool  = 0;

            for(let j:number=0 ; j <   this. wizallsSentool.length; j++)
                if(this.sontEgauxWALL( this. wizallsSentool[j], obj))
                    countSentool++;

            
            for(let j:number=0 ; j <  this.wizallspartenaire.length; j++)
                if(this.sontEgauxWALL(this.wizallspartenaire[j], obj))
                    countPartenairet++;

            if(countSentool > countPartenairet ){
                    this. wizallspartenaire[i].class = "alert-warning";
            }

            if(countSentool < countPartenairet ){
                this. wizallspartenaire[i].class = "alert-danger";
            }

            if(countSentool == countPartenairet ){
                this. wizallspartenaire[i].class = "alert-info";
            }

            if(countSentool == 0){
                this. wizallspartenaire[i].class = "alert-danger";
                this. wizallsSentool[i].nbrSentool = countSentool;
                this. wizallsSentool[i].nbrPartenaire = countPartenairet;
                this.wizallsConf.push(this.wizallspartenaire[i]);
            }
        }
        
    }

    /*-----------------------------E-MONEY----------------------------------------*/
    emoneysSentool:any[] = [];
    emoneysemoney:any[] = [];
    emoneys:any= {
        datas: [],
        etat:  'panel-info'
    };
    
    emoneyTotalTransSentool:number = 0;
    emoneyTotalMontantSentool:number = 0;
    emoneyTotalTranstrafique:number = 0;
    emoneyTotalMontanttrafique:number = 0;

    calculeEtatTransactionsemoney (sentool:any[],trafique:any[],shows:any[]){
        let obj:any;
        let countSentool:number=0;
        let countemoney:number=0;
        let etat:number = 0;
    
        for(let i:number=0 ; i < sentool.length; i++){
            obj = sentool[i];
            countemoney = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            for(let j:number=0 ; j <  trafique.length; j++)
                if(this.sontEgaux(trafique[j], obj))
                    countemoney++;
    
            if(countSentool > countemoney ){
                sentool[i].nbr = (countSentool - countemoney);
                sentool[i].class = "alert-danger";
                
            }
            else 
                if(countSentool < countemoney){
                    sentool[i].nbr = (countemoney - countSentool);
                    sentool[i].class = "alert-warning";
                    if(etat!= 3) etat = 2;
                }
            else {
                sentool[i].nbr = 0;
                sentool[i].class = "alert-success";
                
            }
        }
    
        shows = sentool;
        this.emoneys.datas = sentool;
    
        for(let i:number=0 ; i < trafique.length; i++){
            obj = trafique[i];
            countemoney = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            if(countSentool==0){
                obj.nbr = 1;
                obj.class = "alert-warning";
                if(etat!= 3) etat = 2;
                this.emoneys.datas.push(obj);
            }
        }
    
        if(etat == 3 ) this.emoneys.etat = 'alert-danger';
        else if(etat == 2 ) this.emoneys.etat = 'alert-warning';
        else  this.emoneys.etat = 'alert-success';
        
    }

    /*-----------------------------TIGOCASH----------------------------------------*/
    tigocashsSentool:any[] = [];
    tigocashstigocash:any[] = [];
    tigocashs:any= {
        datas: [],
        etat:  'panel-info'
    };
    
    tigocashTotalTransSentool:number = 0;
    tigocashTotalMontantSentool:number = 0;
    tigocashTotalTranstrafique:number = 0;
    tigocashTotalMontanttrafique:number = 0;

    calculeEtatTransactionstigocash (sentool:any[],trafique:any[],shows:any[]){
        let obj:any;
        let countSentool:number=0;
        let counttigocash:number=0;
        let etat:number = 0;
    
        for(let i:number=0 ; i < sentool.length; i++){
            obj = sentool[i];
            counttigocash = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            for(let j:number=0 ; j <  trafique.length; j++)
                if(this.sontEgaux(trafique[j], obj))
                    counttigocash++;
    
            if(countSentool > counttigocash ){
                sentool[i].nbr = (countSentool - counttigocash);
                sentool[i].class = "alert-danger";
                
            }
            else 
                if(countSentool < counttigocash){
                    sentool[i].nbr = (counttigocash - countSentool);
                    sentool[i].class = "alert-warning";
                    if(etat!= 3) etat = 2;
                }
            else {
                sentool[i].nbr = 0;
                sentool[i].class = "alert-success";
                
            }
        }
    
        shows = sentool;
        this.tigocashs.datas = sentool;
    
        for(let i:number=0 ; i < trafique.length; i++){
            obj = trafique[i];
            counttigocash = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            if(countSentool==0){
                obj.nbr = 1;
                obj.class = "alert-warning";
                if(etat!= 3) etat = 2;
                this.tigocashs.datas.push(obj);
            }
        }
    
        if(etat == 3 ) this.tigocashs.etat = 'alert-danger';
        else if(etat == 2 ) this.tigocashs.etat = 'alert-warning';
        else  this.tigocashs.etat = 'alert-success';
        
    }


    /*-----------------------------ORANGEMONEY----------------------------------------*/
    orangemoneysSentool:any[] = [];
    orangemoneysorangemoney:any[] = [];
    orangemoneys:any= {
        datas: [],
        etat:  'panel-info'
    };
    
    orangemoneyTotalTransSentool:number = 0;
    orangemoneyTotalMontantSentool:number = 0;
    orangemoneyTotalTranstrafique:number = 0;
    orangemoneyTotalMontanttrafique:number = 0;

    calculeEtatTransactionsorangemoney (sentool:any[],trafique:any[],shows:any[]){
        let obj:any;
        let countSentool:number=0;
        let countorangemoney:number=0;
        let etat:number = 0;
    
        for(let i:number=0 ; i < sentool.length; i++){
            obj = sentool[i];
            countorangemoney = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            for(let j:number=0 ; j <  trafique.length; j++)
                if(this.sontEgaux(trafique[j], obj))
                    countorangemoney++;
    
            if(countSentool > countorangemoney ){
                sentool[i].nbr = (countSentool - countorangemoney);
                sentool[i].class = "alert-danger";
                
            }
            else 
                if(countSentool < countorangemoney){
                    sentool[i].nbr = (countorangemoney - countSentool);
                    sentool[i].class = "alert-warning";
                    if(etat!= 3) etat = 2;
                }
            else {
                sentool[i].nbr = 0;
                sentool[i].class = "alert-success";
                
            }
        }
    
        shows = sentool;
        this.orangemoneys.datas = sentool;
    
        for(let i:number=0 ; i < trafique.length; i++){
            obj = trafique[i];
            countorangemoney = 0; 
            countSentool  = 0;
    
            for(let j:number=0 ; j <  sentool.length; j++)
                if(this.sontEgaux(sentool[j], obj))
                    countSentool++;
    
            if(countSentool==0){
                obj.nbr = 1;
                obj.class = "alert-warning";
                if(etat!= 3) etat = 2;
                this.orangemoneys.datas.push(obj);
            }
        }
    
        if(etat == 3 ) this.orangemoneys.etat = 'alert-danger';
        else if(etat == 2 ) this.orangemoneys.etat = 'alert-warning';
        else  this.orangemoneys.etat = 'alert-success';
        
    }

    detailsFunc(item:any){
          let id =  item.id | item.idTrans | item.transactionid;
          let service=  item.type;
          console.log("{id:"+id+",service:"+service+"}");   
    }
}