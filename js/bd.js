var dataBaseC = null;
var dataBase = null;
var registroActual = null;
var cursor = null;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
dataBase = indexedDB.open("BdAvisos", 1);
// Crear BD y Tabla Avisos
dataBase.onupgradeneeded = function (e) {
    orden = dataBase.result;
    var tablaAvisos = orden.createObjectStore("Avisos", { keyPath: 'id', autoIncrement: true });
    tablaAvisos.createIndex('idCliente', 'video', { unique: false });
    tablaAvisos.createIndex('idTecnico', 'video', { unique: false });
    tablaAvisos.createIndex('Fecha', 'video', { unique: false });

    // Tabal Clienets
    var tablaCliente = orden.createObjectStore("Clientes", { keyPath: 'id', autoIncrement: true });
    // Tabal Tecnicos Mantenimiento
    var tablatecnicos= orden.createObjectStore("Tecnicos", { keyPath: 'id', autoIncrement: true });
}
// Trabajar con la BD
dataBase.onsuccess = function (e) {
    crearcursor();
}

//Tratamiento de errores
dataBase.onerror = function (e) {
    // Si se produce un error se ejecuta este método. Ocurre cuando cambiamos de versión
    alert('Error cargandoo la base de datos ' + e.target);
};

// Acceder a los objetos registros, al primer registro
function crearcursor() {
    var orden = dataBase.result; var orden = dataBase.result;
    var transacion = orden.transaction(["Avisos"], "readonly");
    var tablaAvisos = transacion.objectStore("Avisos");
    request = tablaAvisos.openCursor();
    request.onerror = function (event) {
        alert("Error lectura secuencial de la tabla libro ");
    };
    request.onsuccess = function (event) {
        // Exito de ejecución
        cursor = event.target.result; // Primer registro
        if (cursor) {
            // Visuliza en pantalla los datos del registro leído
            // visualiza(cursor.value);
           generaTabla();    
   
        }
        else {
            alert("Fin de lectura de Avisos");
        }
    };
    
}
    //Grabar un nuevo registro 
    function grabar(didCliente,dDescripcion,dFecha,dhora,dRealizacion,didTecnico) {

        var orden = dataBase.result;
        // Crea un objeto para ejecutar ordenes contra la base de datos               
        var transacion = orden.transaction(["Avisos"], "readwrite");
        // Crea una transación sobre una  tabla de la base de datos para lectura y escritura
        var tabla = transacion.objectStore("Avisos");
        var request = tabla.add({
            idCliente: didCliente,
            Descripcion: dDescripcion,
            Fecha:dFecha,
            Hora: dhora,
            Realizado: dRealizacion,
            idTecnico: didTecnico
        });

    }
    function generaTabla() {// Lectura secuencial ascendente(next) o descendente (prev)
        var ordenlistado = "next";


        var orden = dataBase.result;
        var transacion = orden.transaction(["Avisos"], "readonly");
        var tabla = transacion.objectStore("Avisos");

        request = tabla.openCursor(null, ordenlistado);


        request.onerror = function (event) {
            alert(" Error de lectura");
        };

        request.onsuccess = function (event) {
            cursor = event.target.result;
            if (cursor) {
                registro = cursor.value;
                var arrayLinea =[registro.id, registro.idCliente, registro.Descripcion, registro.Fecha, registro.Hora, registro.Realizado, Registros.CodigidTecnico];
               
                datosTabla.push(arrayLinea);
  
                console.log(registro.id + registro.idCliente + registro.Descripcion);
                cursor.continue();
            }
            else {
            }
            visualizaTabla();
        }
     
    
    }
    function visualiza(registro) {
        console.log(registro.id);

        console.log(registro.idCliente);
        console.log(registro.Descripcion);
        console.log(registro.Fecha);
        console.log(registro.Hora);
        console.log(registro.Realizado);
        console.log(registro.idTecnico);

    }
/*
 document.getElementById("GrabarAviso").addEventListener("click",
 
 function() {
        grabar();
        imprimirentabla();
 }
 ,false)*/