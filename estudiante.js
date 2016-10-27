

$(document).ready(function(){

var db = openDatabase('dbestudiante', '1.0','Base de datos', 2 * 1024 * 1024);

db.transaction(function(t){
		t.executeSql("CREATE TABLE IF NOT EXISTS estudiante(codigo INTEGER NOT NULL PRIMARY KEY, nombres TEXT NOT NULL, apellidos, telefono, correo, fecha_nac)");

		});





});