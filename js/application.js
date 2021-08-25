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

	versionControl();
	fetchRepos();
})();

function setGmailVisited(a) {
	a.childNodes[0].style = 'color: #ce1500;'
}

function versionControl() {
	document.getElementById('version').textContent = 'v.25.08.2021 19:17';
}

function fetchRepos() {
	fetch('https://api.github.com/users/lariel/repos?' + 
		new URLSearchParams({
			sort: 'updated'
		}))
		.then(response => response.json().then(projects => showRepos(projects)));	
}

function fetchRepoTopics(repoName, repoId) {
	fetch(`https://api.github.com/repos/Lariel/${repoName}/topics`, 
		{headers: {
			'Accept': 'application/vnd.github.mercy-preview+json'
		}}).then(response => response.json()
			.then(topics => showProjectTopics(topics, repoId)));
}

function hideLoader() {
	const loader = document.getElementById('loader');
	loader.style = 'display: none'
}

function showRepos(projects) {
	hideLoader();
	const projetos = document.getElementById('projetos');
	for (let project of projects) {
		const divCard = document.createElement('div');
		divCard.className = 'card';
		divCard.title = 'Clique para ver o repositório no Github'
		divCard.addEventListener('click', () => {
			window.open(project.html_url, '_blank').focus();
		});
		divCard.id = project.id;
		
		const cardTitle = document.createElement('div');
		cardTitle.className = 'card-title';
		cardTitle.innerText = project.name;
		divCard.appendChild(cardTitle);
		
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.innerText = project.description;
		divCard.appendChild(cardBody);

		projetos.appendChild(divCard);

		console.log('Nome: ', project.name);
		console.log('Descrição', project.description);
		console.log('Linguagem: ', project.language);
		fetchRepoTopics(project.name, project.id);
	}
}

function showProjectTopics(topics, id) {
	const divCard = document.getElementById(id);
	const cardTags = document.createElement('div');
	cardTags.className = 'card-tags';
	divCard.appendChild(cardTags);

	const tags = topics.names;

	for (let tag of tags) {

		const cardTag = document.createElement('div');
		cardTag.className = 'tag tag-success';
		cardTag.innerText = tag;
		cardTags.appendChild(cardTag);
	}
}