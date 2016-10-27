function Estudiante(codigo, nombre, apellido, sexo, telefono, correo, fecha_nacimiento) {
	  this.codigo = codigo;
	  this.nombre = nombre;
	  this.apellido = apellido;
	  this.sexo = sexo;
	  this.telefono = telefono;
	  this.correo = correo;
	  this.fecha_nacimiento = fecha_nacimiento;
}

var base = openDatabase('bd_estudiante','1.0', 'Base de datos', 2 * 1024 * 1024);



$(document).ready(function(){

	
	var sql = ("CREATE TABLE IF NOT EXISTS Estudiante (codigo varchar(11) primary key, nombres varchar(45), apellidos varchar(45), sexo varchar(15), telefono varchar(11), correo varchar(30), fecha_nacimiento varchar(30))");

	base.transaction(function(t){
		t.executeSql(sql);
	});

	mostar(base);

	$("#guardar").click(function(){
		guardar(objeto(),base);
		mostar(base);
		limpiar();		
	});


});


function objeto() {
		
	var Estudiantes = new Estudiante(
		
		parseInt($("#codigo").val()), 
		$("#nombres").val(), 
		$("#apellidos").val(),
		$("#sexo").val(),
		$("#telefono").val(),
		$("#correo").val(),
		$("#fecha").val()
	);		
	return Estudiantes;
}

function guardar(Estudiante, base) {
		
	if (Estudiante.codigo != '' && Estudiante.nombre != '' && Estudiante.apellido != '' && Estudiante.sexo != '' && Estudiante.telefono != '' && Estudiante.correo != '' && Estudiante.fecha_nacimiento != '') {	

		base.transaction(function(t){
			var sql = "INSERT INTO Estudiante (codigo, nombres, apellidos, sexo, telefono, correo, fecha_nacimiento) VALUES (?,?,?,?,?,?,?)";

			t.executeSql(sql, [Estudiante.codigo, Estudiante.nombre, Estudiante.apellido, Estudiante.sexo, Estudiante.telefono, Estudiante.correo, Estudiante.fecha_nacimiento]);
			alert("Guardado Correctamente");
		});
    }else{
	  alert("TODOS LOS CAMPOS DEBES SER LLENOS")
    }		

}

function mostar(base) {
		base.transaction(function(t){

			t.executeSql("SELECT * FROM Estudiante",[], function(t,resultado){

				$("#tabla").html("");

				var filas = "";

				for (var i = 0; i < resultado.rows.length; i++) {
					
					filas += "<tr>";
					filas += "<td>" + resultado.rows.item(i).codigo + "</td>";
					filas += "<td>" + resultado.rows.item(i).nombres + "</td>";
					filas += "<td>" + resultado.rows.item(i).apellidos + "</td>";
					filas += "<td>" + resultado.rows.item(i).sexo + "</td>";
					filas += "<td>" + resultado.rows.item(i).telefono + "</td>";
					filas += "<td>" + resultado.rows.item(i).correo + "</td>";
					filas += "<td>" + resultado.rows.item(i).fecha_nacimiento +"</td>"; 
					filas += "<td><a href='#' onClick='eliminar(" + resultado.rows.item(i).codigo +")'>Eliminar</a> | <a href='' onClick='actualizar(" + resultado.rows.item(i).codigo +")'>Actulizar</a></td>";
					//filas += "<td><spam class = 'elimninar' data-eliminar='" + resultado.rows.item(i).codigo + "'>X</spam></td>";
					//filas += "<td><spam class='modificar' data-modificar='"+resultado.rows.item(i).codigo +"'>O</spam></td>";
					filas += "</tr>"

				}

				$("#tabla").append(filas);
				

			});


		});

}

function eliminar(codigo) {

	base.transaction(function(t){
		var res = confirm('Desea Eliminar');
		if(res == true){
			t.executeSql("DELETE FROM Estudiante WHERE codigo = ?", [codigo],mostar(base));
			alert("Eliminado Correctamente");
		}else
		{
			alert("Codigo incorrecto");
		}
		
	});
	
}

function actualizar(rowid){
	base.transaction(function(t){
			t.executeSql("SELECT codigo,nombres,apellidos,sexo,telefono,correo,fecha FROM Estudiante WHERE rowid = ?", [rowid], function(tx,result){
				var res = result.rows.item(0);
				 
				document.getElementById('#id').value = res.codigo;
				document.getElementById('#nombres').value = res.nombres;
				document.getElementById('#apellidos').value = res.apellidos;
				document.getElementById('#sexo').value = res.sexo;
				document.getElementById('#telefono').value = res.telefono;
				document.getElementById('#correo').value = res.correo;
				document.getElementById('#fecha').value = res.fecha_nacimiento;
				
			});
 		});
 }

 function mostrarCodigo(codigo, base){
	base.transaction(function(t){
		t.executeSql("SELECT * FROM Estudiante WHERE codigo="+codigo,[],function(t,resultado){
			$("#codigo").val(resultado.rows.item(0).codigo);
			$("#nombres").val(resultado.rows.item(0).nombres);
			$("#apellidos").val(resultado.rows.item(0).apellidos);
			$("#sexo").val(resultado.rows.item(0).sexo);;
			$("#telefono").val(resultado.rows.item(0).telefono);;
			$("#correo").val(resultado.rows.item(0).correo);;
			$("#fecha").val(resultado.rows.item(0).fecha);
			
		});
	});
}

function limpiar(){
	$("#codigo").val(''),
	$("#nombres").val(''),
	$("#apellidos").val(''),
	$("#sexo").val(''),
	$("#telefono").val(''),
	$("#correo").val(''),
	$("#fecha").val('')
}