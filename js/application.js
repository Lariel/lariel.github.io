(() => {
	var typing = document.getElementById('typing'),
		text = typing.textContent,
		typed = typing.childNodes[0],
		cursor = document.createElement('span')

	typed.textContent = '';
	typing.appendChild(cursor).textContent = '_';
	// Delay para inicializar a animação
	setTimeout(() => {
		requestAnimationFrame(type);
	}, 1400)		
	
	function type() {
		typed.textContent = text.substr(0, typed.textContent.length + 1);
		
		// Intervalo entre a digitação de cada caractere
		setTimeout(() => {
			requestAnimationFrame(type);
		}, 150);
	}
			
	// Intervalo do cursor ao final da animação
	setInterval(() => {
		cursor.style.visibility = cursor.style.visibility ? '' : 'hidden';
	}, 500);
})();

function setGmailVisited(a) {
	a.childNodes[0].style = 'color: #ce1500;'
}