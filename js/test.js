let start = 1;

const getRedNotices = async () => {
    let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=20&page=' + start;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data from API:', data); // Ajout de cette ligne pour débugger
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
        return null;
    }
}

function getAllInfo(data) {
    console.log('Received data:', data); // Ajout de cette ligne pour débugger

    if (!data || !data.results || data.results.length === 0) {
        console.error("Aucune donnée valide à afficher.");
        return;
    }

    let list = [];
    for (let i = 0; i < data.results.length; i++) {
        let obj = { name: data.results[i].name, forname: data.results[i].forename };
        list.push(obj);
    }

    const noticeListDiv = document.getElementById('noticeList');

    // Création d'une liste non ordonnée (ul) dans le DOM
    const ul = document.createElement('ul');

    // Ajout des éléments de la liste à la liste non ordonnée
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Name: ${item.name}, Forename: ${item.forname}`;
        ul.appendChild(li);
    });

    // Ajoutez la liste non ordonnée à la div
    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);
}

function change_page() {
    const button_next = document.getElementById('button_next');
    const button_back = document.getElementById('button_back');

    button_next.addEventListener('click', async () => {
        start++;
        const data = await getRedNotices();
        getAllInfo(data);
    });

    button_back.addEventListener('click', async () => {
        if (start > 1) {
            start--;
            const data = await getRedNotices();
            getAllInfo(data);
        }
    });
}

// Appel de la fonction change_page pour ajouter les événements aux boutons
document.addEventListener('DOMContentLoaded', () => {
    change_page();

    // Appel initial pour afficher les notices rouges
    getRedNotices().then((data) => {
        getAllInfo(data);
    });
});
