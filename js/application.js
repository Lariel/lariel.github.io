//window.onload = function(){ SEM JQUERY
	// alert('Olá!');
//	var number = 2+2;
//	console.log('vou escrever qlqr coisa aqui '+number);
	// console.log(document.getElementById('first_p'));
//	document.getElementById('first_p').className = 'blueColor'
//}

$(function(){  //Com JQUERY = jQuery()
	alert('Olá!');
	console.log('vou escrever qlqr coisa aqui ');

	$('#changeBlueLink').click(changeColor);
});

function changeColor(){
	//document.getElementById('first_p').className = 'blueColor'
	var color_hexa = $('#color').val();
	$('#first_p').css('color','#'+color_hexa);
}