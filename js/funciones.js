

  
var datosTabla =new Array();
function leerJson() {

    var dato ="1";
    
    var jsonString = "articulo=" + encodeURIComponent(dato);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:5000/books", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xmlhttp.setRequestHeader("Content-Length", jsonString.length);
    
    //alert(xmlhttp.readyState + "--"+xmlhttp.status);
    
    xmlhttp.onreadystatechange = function ()
    {
            alert(xmlhttp.readyState + "--"+xmlhttp.status);
        if (xmlhttp.readyState === 4 && (xmlhttp.status === 200)) {
            var datosLeidos = xmlhttp.responseText;
           // alert("Datos Recibidos :" + datosLeidos);
            console.log(datosLeidos)
            
            longitud=datosLeidos.trim().length-1
           
            cadena=datosLeidos.substring(9,longitud);
        
           // cadena ='[{"id":1,"title":"Libro1 ","page_count":123,"published_date":null,"genre":"Informatica","author_id":1,"author":{"id":1,"name":"uNO","surname":"YO","age":123},"reviews":[]},{"id":2,"title":"Libro1 ","page_count":123,"published_date":null,"genre":"Informatica","author_id":1,"author":{"id":1,"name":"uNO","surname":"YO","age":123},"reviews":[]},{"id":3,"title":"Libro2 ","page_count":45563,"published_date":null,"genre":"Infofffrmatica","author_id":2,"author":{"id":2,"name":"dost","surname":"tU","age":123},"reviews":[]},{"id":4,"title":"Libro2 ","page_count":45563,"published_date":null,"genre":"Infofffrmatica","author_id":5,"author":{"id":5,"name":"Perico","surname":"Palotes","age":33},"reviews":[]}]'
            var Registros = JSON.parse(cadena );
              alert(Registros.length );
               alert(Registros[0].title);
          //     alert(Registros[0].precio);
          //     alert(Registros[0].imagen);
            //imprimirentabla(Registros);
            creaTabkaDatos(Registros);
        }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(null);
    
    
    }
function creaTabkaDatos(Registros){

    datosTabla =new Array();
    for (var i = 0; i < Registros.length; i++) {
        // alert(aisbn);
       // p = new datoslibro(Registros[i].id, Registros[i].title, Registros[i].page_count,
      // Registros[i].published_date, Registros[i].genre,Registros[i].author_id);
      // datosTabla[i]=p;
alert(Registros[i].title)
       var arrayLinea=[Registros[i].id, Registros[i].title, Registros[i].page_count,
       Registros[i].published_date, Registros[i].genre,Registros[i].author_id];
       datosTabla.push(arrayLinea);
       

    }
    alert(datosTabla)
    visualizaTabla()
}
     /*                            TABLA DATOS                            */ 
function visualizaTabla(){
  
    const datatable = new DataTable('#datatable', {
      columns: [ {
         name: 'ID',
         id: 'ID',
         editable: false,
         resizable: true,
         sortable: false,
         focusable: false,
         dropdown: false,        
         width: 15,
         
          
         format: (value) => {
             return null//value.bold();
         }
     }  , 'title', 'page_count',"published_date","genre.","author_id"],
      data:datosTabla
    });
 
    } 
  
  
 /*                            TABLA DATOS                            */
  //