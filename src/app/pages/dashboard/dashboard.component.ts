import { Component,ViewChildren,AfterViewInit,Directive,QueryList } from "@angular/core";
import Chart from 'chart.js';
import {ReadApiService} from '../../services/read-api.service'
import { ThrowStmt } from '@angular/compiler';
import {Fallecidos,RangoEdades} from '../../models/fallecidos'

@Directive({selector: 'barCanvas'})
export class PieCanvas {

}

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})

export class DashboardComponent implements AfterViewInit {
  @ViewChildren(PieCanvas) Canvaslist: QueryList<PieCanvas>;

  public Rangos:RangoEdades[]=[]
  public Casos:string='0';
  public RangosLabel=[];
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public myChartDiabetes;
  public myChartHipertensos;
  public myChartAsma;
  public myChartEpoc;
  public myChartObesidad;
  public myChartTabaquismo;
  public myChartRenal;
  public myChartCardiovascular;
  public ChartDefunciones;
  public MyChartRangoEdades;
  public OptionsPie=[ 'SI', 'NO','SE IGNORA'];
  //public pies=["CountryChart"];
   public pies=["Diabeticos","Hipertensos","Con EPOC","Asmaticos","Obesos","Tabaquismo",
   "Enfermedades Renal Cronica","Cardiacas"];
   public PiesBool=[{'SI':false, 'NO':true,'SE IGNORA':true},{'SI':true, 'NO':true,'SE IGNORA':true},{'SI':true, 'NO':true,'SE IGNORA':true},
   {'SI':true, 'NO':true,'SE IGNORA':true},{'SI':true, 'NO':true,'SE IGNORA':true},{'SI':true, 'NO':true,'SE IGNORA':true},
   {'SI':true, 'NO':true,'SE IGNORA':true},{'SI':true, 'NO':true,'SE IGNORA':true}]
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  prueba=undefined;
  diabeticos=[0,1,2];
  hipertensos=[0,1,2];
  epoc=[0,1,2];
  asma=[0,1,2];
  obesidad=[0,1,2];
  tabaquismo=[0,1,2];
  renal_cronica=[0,1,2];
  cardiovascular=[0,1,2];
  PiechartColors=['rgba(29,140,248,0.2)','rgba(233,32,16,0.2)','rgba(66,134,121,0.15)']
  fallecidos:Fallecidos[]=[];
  public QueryDiabetes='';
  public QueryRangos='';
  public QueryFallecidos='&q=NOT+%23null(fecha_def)';
  public Redefinir={
    Diabeticos:'diabetes',
    Hipertensos:'hipertension',
    "Con EPOC":'epoc',
    "Asmaticos":"asma",
    "Obesos":'obesidad',
    "Tabaquismo":'tabaquismo',
   "Enfermedades Renal Cronica":"renal_cronica",
   "Cardiacas":"cardiovascular"
      }
  
  constructor(private ReadApi:ReadApiService) {}

  ngAfterViewInit() {

    console.log(this.PiesBool[0]["SI"]);
    this.checando1('');
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 30,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          display:false,
          // barPercentage: 1.6,
          // gridLines: {
          //   drawBorder: false,
          //   color: 'rgba(0,242,195,0.1)',
          //   zeroLineColor: "transparent",
          // },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var gradientPieChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position:'bottom',
        labels:{usePointStyle:true},
         onClick: function(e, legendItem) {
          var index = legendItem.index;
          var chart = this.chart;
          var i, ilen, meta;
          for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
            meta = chart.getDatasetMeta(i);
          }
          if(meta.data[(legendItem.index+1)%3].hidden && !meta.data[legendItem.index].hidden){
            meta.data[0].hidden=false;
            meta.data[1].hidden=false;
            meta.data[2].hidden=false;
            this.QueryDiabetes=''
            //refine.diabetes=SI
          } else {
            this.QueryDiabetes='&refine.diabetes='+legendItem.text;
            console.log(this.QueryDiabetes);
           for(let label1 of meta.data){
             if (legendItem.index!=label1._index) {
             label1.hidden=true;
             } else {
               label1.hidden=false;
             }
          }
        }
        //Chart.defaults.pie.legend.onClick.call(this.checando1(this.QueryDiabetes));
        //this.checando1(this.QueryDiabetes);
  
           chart.update();

          
        }
        },
        

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: false,
        xAxes:false,
      }
    };


    this.canvas = document.getElementById("chartRangoEdades");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#ec250d',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#ec250d',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#ec250d',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [80, 100, 70, 80, 120, 80],
      }]
    };

    this.MyChartRangoEdades = new Chart(this.ctx, {
      type: 'bar',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

////aqui checando jajaja
    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");


    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [90, 27, 60, 12, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipGreen

    });
///aqui termina el original
this.canvas = document.getElementById("chartLineGreen1");
this.ctx = this.canvas.getContext("2d");


var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors


this.ChartDefunciones = new Chart(this.ctx, {
  type: 'line',
  data: {  labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
  datasets: [{
    label: "Fallecidos",
    fill: true,
    backgroundColor: gradientStroke,
    borderColor: '#00d6b4',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#00d6b4',
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#00d6b4',
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: [90, 27, 60, 12, 80],
  }]},
  options: gradientChartOptionsConfigurationWithTooltipGreen

});
///aqui termina la copia


    var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[0];



    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);

//diabetes

    this.canvas = document.getElementById(this.pies[0]);
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
    
    this.myChartDiabetes =this.CreateChartPie(this.diabeticos,gradientPieChartConfiguration)

    //hipetensos
    this.canvas = document.getElementById(this.pies[1]);
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    // gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    // gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
    
    this.myChartHipertensos =this.CreateChartPie(this.hipertensos,gradientPieChartConfiguration)
    //epoc
    this.canvas = document.getElementById(this.pies[2]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartEpoc =this.CreateChartPie(this.epoc,gradientPieChartConfiguration)

    //asma
    this.canvas = document.getElementById(this.pies[3]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartAsma = this.CreateChartPie(this.asma,gradientPieChartConfiguration)
 
    //obesidad
    this.canvas = document.getElementById(this.pies[4]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartObesidad=this.CreateChartPie(this.obesidad,gradientPieChartConfiguration)
    //tabaquismo
    this.canvas = document.getElementById(this.pies[5]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartTabaquismo=this.CreateChartPie(this.tabaquismo,gradientPieChartConfiguration)
    //Renal Cronica
    this.canvas = document.getElementById(this.pies[6]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartRenal=this.CreateChartPie(this.renal_cronica,gradientPieChartConfiguration)
    //Cardiovascular
    this.canvas = document.getElementById(this.pies[7]);
    this.ctx  = this.canvas.getContext("2d");
    this.myChartCardiovascular=this.CreateChartPie(this.cardiovascular,gradientPieChartConfiguration)

  }


  
  public checando1(query){
    
    //var diabeticos=0;
    //var Data=[];
    this.ReadApi.LeerDatos(query)
    .subscribe(
      res=>{
        this.prueba=res;
        console.log(res);
        this.Casos=this.numberWithCommas(this.prueba.nhits);
        //console.log(this.prueba.nhits);

        this.Basesde3(this.diabeticos,this.prueba.facet_groups[6].facets);
        this.Basesde3(this.hipertensos,this.prueba.facet_groups[2].facets);
        this.Basesde3(this.epoc,this.prueba.facet_groups[8].facets);        
        this.Basesde3(this.asma,this.prueba.facet_groups[9].facets);
        this.Basesde3(this.obesidad,this.prueba.facet_groups[10].facets);
        this.Basesde3(this.tabaquismo,this.prueba.facet_groups[11].facets);
        this.Basesde3(this.renal_cronica,this.prueba.facet_groups[14].facets);
        this.Basesde3(this.cardiovascular,this.prueba.facet_groups[16].facets);        
        this.fallecidos=[];
        for(let fechas of this.prueba.facet_groups[12].facets){
            this.fallecidos.push(<Fallecidos>{Fecha:this.parseDate(fechas.name),Confirmados:fechas.count})
            //console.log(fechas.name);
        }
        this.Rangos=[];
        for(let rango of this.prueba.facet_groups[3].facets){
          this.Rangos.push(<RangoEdades>{Rango:rango.path,RangoNum:this.parseDate(rango.path,false),Casos:rango.count})
          //console.log(fechas.name);
      }
        this.Rangos.sort((a:RangoEdades,b:RangoEdades)=> {return a.RangoNum -b.RangoNum});
        if(this.RangosLabel.length==0){
          this.RangosLabel=this.Rangos.map(t=>t.Rango)
        }

       
        this.fallecidos.sort((a: Fallecidos, b: Fallecidos) => {
          return a.Fecha.getTime() -b.Fecha.getTime()
      });
        //console.log(this.fallecidos);

        this.updateOptionsdiabetes();
            },
      err=>{console.log(err);}
    )
    //console.log(diabeticos);
    //console.log(Data);
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  public updateOptionsdiabetes() {
    this.myChartDiabetes.update();
    this.myChartHipertensos.update();
    this.myChartEpoc.update();
    this.myChartAsma.update();
    this.myChartObesidad.update();
    this.myChartTabaquismo.update();
    this.myChartRenal.update();
    this.myChartCardiovascular.update();
    this.ChartDefunciones.data.labels=this.fallecidos.map(t=>t.Fecha);
    this.ChartDefunciones.data.datasets[0].data=this.fallecidos.map(t=>t.Confirmados);
    this.ChartDefunciones.update();
    this.MyChartRangoEdades.data.labels=this.Rangos.map(t=>t.Rango);
    this.MyChartRangoEdades.data.datasets[0].data=this.Rangos.map(t=>t.Casos);
    this.MyChartRangoEdades.update();
    
  }
  public parseDate(input,EsFecha=true) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    if(EsFecha){
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    } else {
      return Number(parts[0]);
    }
  }
public CreateChartPie(datos,option){
  return new Chart(this.ctx, {
    type: 'pie',
    responsive: true,
    data:{
      labels: this.OptionsPie,
      datasets: [{
        backgroundColor: this.PiechartColors,
        hoverBackgroundColor: this.PiechartColors,
        borderColor: '#1f8ef1',
        borderWidth: 1,
        data: datos,
      }]
    },
    //options:Chart.defaults.pie
    options: option
  });
}
public Basesde3(base,fset){
  base[0]=0; base[1]=0; base[2]=0;
for(let item of fset){
  if(item.name=="SI"){
    base[0]=item.count;
  } else if(item.name=="NO"){
    base[1]=item.count;
  } else {
    base[2]=item.count;
  }
}
}
public PiesEstatus(Opciones,Optpick,ValOpt){
Opciones['SI']=false;
Opciones['NO']=false;
Opciones['SE IGNORA']=false;
Opciones[Optpick]=true;
  // if(ValOpt){

// }
}
public numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
