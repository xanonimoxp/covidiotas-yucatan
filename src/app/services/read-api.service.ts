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
    //this.Uri='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=10000&facet=fecha_actualizacion&facet=id_registro&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=entidad_nac&facet=entidad_res&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=fecha_def&facet=edad&facet=nacionalidad&facet=embarazo&facet=habla_lengua_indi&facet=diabetes&facet=epoc&facet=asma&facet=inmusupr&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=negativo&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&facet=positivo&facet=pendiente&refine.entidad_res=YUCAT%C3%81N&refine.positivo=Positivo+SARS-CoV-2';
    this.Uri='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=&rows=7&facet=sexo&facet=tipo_paciente&facet=fecha_def&facet=edad&facet=embarazo&facet=diabetes&facet=epoc&facet=asma&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=rango_edad&facet=fecha_sintomas&refine.entidad_res=YUCAT%C3%81N&refine.positivo=Positivo+SARS-CoV-2';
    this.UriFallecidos='https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&q=NOT+%23null(fecha_def)&rows=0&refine.entidad_res=YUCAT%C3%81N&refine.positivo=Positivo+SARS-CoV-2'
   }

   LeerDatos(query){
     return this.httpClient.get(`${this.Uri}${query}`);
     
     
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
