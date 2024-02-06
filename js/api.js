let start = 1;
let redNoticesData; // Variable pour stocker les données récupérées de l'API

const getRedNotices = async () => {
    let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=20&page=' + start;
    console.log(start);
    const rep = await fetch(url);
    const data = await rep.json();
    redNoticesData = data; // Stocker les données dans la variable globale
    return data;
}

function getAllInfo(data) {
    let list = data._embedded.notices;
    console.log(list);
    console.log(data);

    const noticeListDiv = document.getElementById('noticeList');
    const ul = document.createElement('ul');

    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} ${item.forename}`;
        li.setAttribute('id', item.entity_id);
        li.addEventListener('click', () => {
            // Récupérer les informations stockées au lieu d'appeler l'API à nouveau
            showStoredInfo(item.entity_id);
        });

        ul.appendChild(li);
    });

    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);
}

function showStoredInfo(entityId) {
    const selectedNotice = redNoticesData._embedded.notices.find(item => item.entity_id === entityId);
    if (selectedNotice) {
        // Afficher les informations complémentaires sur la page
        displayInfoOnPage(selectedNotice);
    } else {
        console.error('Les informations complémentaires pour l\'ID spécifié n\'ont pas été trouvées.');
    }
}



// ...

function displayInfoOnPage(notice) {
    const infoContainer = document.getElementById('infoContainer');
    // Créer des éléments pour chaque information et les ajouter
    const nameElement = document.createElement('p');
    nameElement.textContent = `Nom: ${notice.name}`;

    const forenameElement = document.createElement('p');
    forenameElement.textContent = `Prénom: ${notice.forename}`;

    const dobElement = document.createElement('p');
    dobElement.textContent = `Date de naissance: ${notice.date_of_birth}`;

    // Ajouter une image
    const thumbnailElement = document.createElement('img');
    thumbnailElement.src = notice._links.thumbnail.href;
    thumbnailElement.alt = "Image de la notice";

    // Effacer le contenu 
    infoContainer.innerHTML = '';

    // Ajouter les nouveaux éléments
    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(forenameElement);
    infoContainer.appendChild(dobElement);
    infoContainer.appendChild(thumbnailElement);
}

function change_page() {
    const next = document.getElementById('button_next');
    const back = document.getElementById('button_back');

    console.log("jej");
    next.addEventListener('click', () => {
        start++;
        getRedNotices().then((data) => {
            getAllInfo(data);
        })
    })

    back.addEventListener('click', () => {
        if (start > 1) {
            start--;
            getRedNotices().then((data) => {
                getAllInfo(data);
            })
        }
    })
}

getRedNotices().then((data) => {
    getAllInfo(data);
})

change_page();
