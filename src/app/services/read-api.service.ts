import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReadApiService {
  Uri:string='';
  UriFallecidos:string;
  diabetes=undefined;

  constructor(private httpClient:HttpClient) {
    //this.Uri='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=7&facet=sexo&facet=tipo_paciente&facet=fecha_def&facet=edad&facet=embarazo&facet=diabetes&facet=epoc&facet=asma&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=rango_edad&facet=fecha_sintomas&refine.entidad_res=YUCAT%C3%81N&refine.positivo=Positivo+SARS-CoV-2';
    //this.UriFallecidos='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=NOT+%23null(fecha_def)&rows=0&refine.entidad_res=YUCAT%C3%81N&refine.positivo=Positivo+SARS-CoV-2'
    this.Uri='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=7&facet=sexo&facet=tipo_paciente&facet=fecha_def&facet=edad&facet=embarazo&facet=diabetes&facet=epoc&facet=asma&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=rango_edad&facet=fecha_sintomas&refine.entidad_res=CIUDAD+DE+MÉXICO&refine.positivo=Positivo+SARS-CoV-2';
    this.UriFallecidos='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&rows=0&refine.entidad_res=CIUDAD+DE+MÉXICO&refine.positivo=Positivo+SARS-CoV-2&exclude.fecha_def=NA'
   }

   LeerDatos(query){
     return this.httpClient.get(`${this.Uri}${query}`);
   }

   LeerFallecidos(query){
    return this.httpClient.get(`${this.UriFallecidos}${query}`);
  }
   LeerDatos2(){
     this.httpClient.get(this.Uri)
     .subscribe(
       res=>{
         this.diabetes=res;
       }
     )
    return this.diabetes;
  }
//    Casos(){
// this.LeerDatos()
// .subscribe(
//   res=>{
//     this.diabetes=res;
//     this.diabetes=this.diabetes.records;
//   }
//   )
//   return this.diabetes;
//    }

}
