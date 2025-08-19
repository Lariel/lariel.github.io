const gitHeaders = {
	headers: {
		'Accept': 'application/vnd.github.mercy-preview+json',
		'Authorization': 'API_KEY'
	}	
};

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
	const updatedAt = new Date('08-19-2025 19:50')
	console.log(`Atualizado em ${updatedAt}`);
	document.getElementById('version').textContent = `v${updatedAt.getTime()}`;
}

function fetchRepos() {
	fetch('https://api.github.com/user/repos?' + 
		new URLSearchParams({
			sort: 'updated'
		}),gitHeaders)
		.then(response => {
			if (response.status == 200) {
				response.json().then(projects => showRepos(projects));
			} else {
				response.json().then(data => handleApiError(data));
			}
		});	
}

function handleApiError(data) {
	alert(`${data.message}\n\nDocs: ${data.documentation_url}`);
}

function hideLoader() {
	const loader = document.getElementById('loader');
	loader.style = 'display: none'
}

function showRepos(projects) {
	hideLoader();

	const projetosDOM = document.getElementById('project-list');

	const projetosDoSite = projects.filter(project => {
		return project.topics.some(topic => topic == 'show-on-site');
	})

	for (let project of projetosDoSite) {
		const divCard = document.createElement('div');
		divCard.className = 'card';
		divCard.id = project.id;
		
		const cardTitle = document.createElement('div');
		cardTitle.className = 'card-title';
		cardTitle.innerText = project.name;
		divCard.appendChild(cardTitle);
		
		const cardBody = document.createElement('div');
		cardBody.className = 'card-body';
		cardBody.innerText = project.description;
		divCard.appendChild(cardBody);

		projetosDOM.appendChild(divCard);

		showProjectTopics(project.topics.filter(topic => topic != 'show-on-site'), project.id);
		configCardFooter(project);
	}
}

function showProjectTopics(tags, id) {
	const divCard = document.getElementById(id);
	const cardTags = document.createElement('div');
	cardTags.className = 'card-tags';
	divCard.appendChild(cardTags);

	for (let tag of tags) {
		const cardTag = document.createElement('div');
		cardTag.className = 'tag tag-success searchable';
		cardTag.innerText = tag;
		cardTag.title = `Clique para pesquisar sobre ${tag} no Google`;
		cardTag.addEventListener('click', () => clickHandler(cardTag))
		cardTags.appendChild(cardTag);
	}
}

function clickHandler(element) {
	window.open(`https://www.google.com/search?q=${element.innerText}`, '_blank').focus();
}

function configCardFooter(project) {
	const divCard = document.getElementById(project.id);
	const cardFooter = document.createElement('div');
	cardFooter.className = 'card-footer';
	cardFooter.id = `${'footer-'+project.id}`
	divCard.appendChild(cardFooter);
	configGithubLink(project);
	configHomepageLink(project);
}

function configGithubLink(project) {
	if (!project.private) {
		const cardFooter = document.getElementById('footer-'+project.id);
		const githubLink = document.createElement('div');
		githubLink.className = 'link fa fa-github mt-10';
		githubLink.innerText = '  ver no Github';
		githubLink.title = 'Clique para ver o repositório no Github'
		githubLink.addEventListener('click', () => {
			window.open(project.html_url, '_blank').focus();
		});
		cardFooter.appendChild(githubLink);
	}
	
}

function configHomepageLink(project) {
	if (project.homepage) {
		const cardFooter = document.getElementById('footer-'+project.id);
		const homepageLink = document.createElement('div');
		homepageLink.className = 'link fa fa-external-link mt-10';
		homepageLink.innerText = '  acessar projeto';
		homepageLink.addEventListener('click', () => {
			window.open(project.homepage, '_blank').focus();
		});
	
		cardFooter.appendChild(homepageLink);
	}
}

