$(function(){  //Com JQUERY = jQuery()
	alert('Olá! Bem vindo a minha página de teste');
	console.log('vou escrever qlqr coisa aqui ');

	$('#changeBlueLink').click(changeColor);
});

function changeColor(){
	var color_hexa = $('#color').val();
	$('#first_p').css('color','#'+color_hexa);
}