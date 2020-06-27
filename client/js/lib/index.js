var campos = [
	$("#data"),
	$("#quantidade"),
	$("#valor")
];

$(".form").on("submit", function(event){
	event.preventDefault();

	var tr = $("<tr>");
	campos.forEach(function(campo){
		var td = $("<td>");
		td.text(campo.val());
		tr.append(td);
	});

	var tdVolume = $("<td>");
	var volume = campos[1].val() * campos[2].val();
	tdVolume.text(volume);

	tr.append(tdVolume);

	$("table tbody").append(tr);

	campos[0].val('');
	campos[1].val(1);
	campos[2].val(0);

	campos[0].focus();
});