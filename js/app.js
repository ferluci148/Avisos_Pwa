/* Registra el SErvioceWorker */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }

/* Registra el SErvioceWorker */



// Avisos es información sobre las realizaciones que han de atender los mantenedores en los clientes 
// que lo soliciten
// LOs aviso se recogen en la página y se grabar en una base de datos en el hosting, 
// Cuando se accede desde a la PWA , se descargan los aviso ssobre una base de datos NoSql (Indexed Bd).
// Los avisos realizados(marcado como realizados) por los mantenedores se reflejan en esta base de datos y si se tiene conexión a 
//internet tambien en la base de datos remota
// Por cada aviso contamos con la siguiente información.
// IdAviso|CodigoCliente|Descriptción|Fecha|Hora|CodigoMantenedor|RealizadoS_N

// Array para visualizar los dato sen la tabla FACIL
var datosTabla = new Array();

//var datosAvisos = '[{"IdAviso":"","IdCliente":"","Descripcion":"","Fecha":"","Hora":"","CodigoMantenedor":"","RealizadoS_N":""},{"IdAviso":"1","IdCliente":"1","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","RealizadoS_N":"true"},{"IdAviso":"21","IdCliente":"21","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","RealizadoS_N":"true"},{"IdAviso":"31","IdCliente":"31","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","RealizadoS_N":"true"},{"IdAviso":"41","IdCliente":"41","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","RealizadoS_N":"true"}]'
var datosAvisos = '[ {"IdAviso":"1","IdCliente":"1","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","Realizado":1    },{"IdAviso":"21","IdCliente":"21","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","Realizado":1},{"IdAviso":"31","IdCliente":"31","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","Realizado":0},{"IdAviso":"41","IdCliente":"41","Descripcion":"Reparación del aire acondicionado de la vivienta y revisión de las valvulas de calefación central del edificio","Fecha":"23/10/2021","Hora":"12:34","CodigoMantenedor":"123","Realizado":0}]'
//alert(datosAvisos)
var Registros = JSON.parse(datosAvisos);
//alert(Registros);
creaTabkaDatos(Registros)

function creaTabkaDatos(Registros) {

    // datosTabla = new Array();
    for (var i = 0; i < Registros.length; i++) {

        //alert(Registros[i].IdAviso)
        var arrayLinea = [Registros[i].IdAviso, Registros[i].IdCliente, Registros[i].Descripcion, Registros[i].Fecha, Registros[i].Hora, Registros[i].Realizado, Registros[i].CodigoMantenedor]
        /*  Registros[i].Fecha, Registros[i].Hora, Registros[i].CodigoMantenedor,
          Registros[i].CodigoMantenedor, Registros[i].RealizadoS_N];*/
        datosTabla.push(arrayLinea);


    }
  
    
}
/*                            TABLA DATOS                            */
function visualizaTabla() {
    {
 
        const datatable = new DataTable('#datatable', {
            columns: [{
                name: 'Aviso',
                id: 'IdAviso',
                editable: false,
                resizable: false,
                sortable: false,
                focusable: false,
                dropdown: false,
               // width: 38,
                format: (value) => {
                    return '<b>' + value + '</b>';
                }
            }, {
                name: 'Cliente',
                id: 'IdCliente',
                editable: false,
                resizable: false,
                sortable: false,
                focusable: false,
                dropdown: false,
              //  width: 90,
                format: (value) => {
                    return '<b>' + value + '</b>';
                }
            },
            {
                name: 'Descripcion',
                id: 'Descripcion',
                editable: false,
                resizable: true,
                sortable: false,
                focusable: false,
                dropdown: false,
            //    width: 500,
                format: (value) => {
                    return '<i onclick="Mensajes(this)">' + value + '</i>';
                }
            }, {
                name: 'Fecha',
                id: 'Fecha',
                editable: false,
                resizable: true,
                sortable: false,
                focusable: false,
                dropdown: false,
              //8  width: 110,
                format: (value) => {
                    return '<b>' + value + '</b>';
                }
            }, {
                name: 'Hora',
                id: 'Hora',
                editable: false,
                resizable: true,
                sortable: false,
                focusable: false,
                dropdown: false,
              //  width: 90,
                format: (value) => {
                    return '<b>' + value + '</b>';
                }
            }
                , {
                name: 'X',
                id: 'Realizado',
                editable: false,
                resizable: true,
                sortable: false,
                focusable: false,
                dropdown: false,
              //  width: 90,
                format: (value) => {
                    //return ' <input onclick ="alert(\'kk\')" type="button" value='+new Boolean(value)+'></input>'
                    //var datobooleano= value>0? "X" : "" ;               
                    return ' <input onclick ="this.value=\'S\'" type="button" value=' + (value > 0 ? "S" : "N") + '></input>'


                }
            },
            {
                name: 'Técnico',
                id: 'CodigoMantenedor',
                editable: false,
                resizable: false,
                sortable: false,
                focusable: false,
                dropdown: false,
              //  width: 40,
                format: (value) => {
                    return '<b>' + value + '</b>';
                }
            }
                // 'Fecha', "Hora", "CodigoMantenedor.", "RealizadoS_N"
            ],
            data: datosTabla
        });
    }
}


function Mensajes( ContenidoMensaje){
   var masDatos="Mensaje";
    Swal.fire({
        title: 'Aviso por Mantenimiento',
        input: 'textarea',
        text: masDatos,
        inputValue: ContenidoMensaje.innerText,
     
        imageUrl: './imagenes/curso.png' ,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Mensaje bonito',
      }).then(function(result) {
           
        alert(result.value)
       alert(masDatos)
      })
       
}

//// Trabajar con  avisos   

  document.getElementById("FormularioAviso").addEventListener("click",
  function(){
    // Visualiza oculta formulario
   if(formulario.style.display=="block"){
    formulario.style.display="none";}else{ formulario.style.display="block"}
  }
  ,false) 

  document.getElementById("GrabarAviso").addEventListener("click",
  function(){
    didCliente=cCliente.value;
    dDescripcion=cDescripcion.value;
    dFecha=cFecha.value;
    dhora=cHora.value;
    dRealizacion=cRealizado.value;
    didTecnico =cTecnico.value;
    grabar(didCliente,dDescripcion,dFecha,dhora,dRealizacion,didTecnico) 
  }
  ,false) 

  document.getElementById("ConsultaAvisos").addEventListener("click",
  function(){
    visualizaTabla()
  },false)