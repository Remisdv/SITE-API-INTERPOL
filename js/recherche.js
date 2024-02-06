async function search() {
  var searchTerm = document.getElementById("search-input").value;
  try {
    const data = await getRedNotices();
    var list = data._embedded.notices;

    // Check if searchTerm is in the list of names
    const searchResult = est_dans_la_liste(searchTerm, list);
    updateSearchResult(searchResult, searchTerm);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la recherche :', error);
  }
}

function updateSearchResult(result, searchTerm) {
  var resultContainer = document.getElementById("search-result");
  if (result.found) {
    resultContainer.innerHTML = `${searchTerm} a une Red Notice.`;
    getall(result.personneTrouveeListe);
  } else {
    resultContainer.innerHTML = `${searchTerm} n'a pas de Red Notice`;
  }
}

let start = 1;

const getRedNotices = async () => {
  let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=160&page=' + start;
  console.log(start);
  const rep = await fetch(url);
  const data = await rep.json();
  console.log(data);
  return data;
}

// Fonction qui vérifie si une personne est dans la liste et renvoie les informations
function est_dans_la_liste(nom, liste) {
  // Check if the list is defined and is an array
  if (Array.isArray(liste)) {
    for (let i = 0; i < liste.length; i++) {
        if (liste[i].name == nom) {
            // Créer une nouvelle liste pour stocker les informations de la personne recherchée
            let personneTrouveeListe = [];

            // Ajouter toutes les informations de la personne dans la nouvelle liste
            personneTrouveeListe.push(liste[i]);
            console.log(personneTrouveeListe)
            getall(personneTrouveeListe);
            // Ajoutez d'autres propriétés selon vos besoins

            // Retourner la nouvelle liste
            return { found: true, personneTrouveeListe };
        }
    }
  }
  // si le nom n'est pas dans la liste, retourner une liste vide
  return { found: false, personneTrouveeListe: [] };
}

function getall(list) {
    const noticeListDiv = document.getElementById('noticeList');
    const ul = document.createElement('ul');
    list.forEach(item => {
        const id = item.entity_id;
        console.log("id: "+id);
        getImage(id);
        //affiche_img();
        //affiche chaque élément les un en dessous des autres
        //const li = document.createElement('li');
        //li.textContent = `${item.name} ${item.forename} ${item.date_of_birth} ${item.nationalities} ${item.entity_id}`;
        //li.setAttribute('id', item.entity_id);
        //ul.appendChild(li);
        //affiche le nom ${item.name}
        const li = document.createElement('li');
        li.textContent = `Nom : ${item.name} `;
        li.setAttribute('id', item.entity_id);
        ul.appendChild(li);
        //affiche le prenom ${item.forename}
        const li1 = document.createElement('li');
        li1.textContent = `Prénom : ${item.forename}`;
        li1.setAttribute('id', item.entity_id);
        ul.appendChild(li1);
        //affiche la date de naissance ${item.date_of_birth}
        const li2 = document.createElement('li');
        li2.textContent = `Date de naissance : ${item.date_of_birth}`;
        li2.setAttribute('id', item.entity_id);
        ul.appendChild(li2);
        //affiche la nationalité ${item.nationalities}
        const li3 = document.createElement('li');
        li3.textContent = `Nationalité : ${item.nationalities}`;
        li3.setAttribute('id', item.entity_id);
        ul.appendChild(li3);
        //affiche l'id ${item.entity_id}
        const li4 = document.createElement('li');
        li4.textContent = `ID : ${item.entity_id}`;
        li4.setAttribute('id', item.entity_id);
        ul.appendChild(li4);

        //affiche l'image ${item._links.thumbnail.href}
        const img = document.createElement('img');
        img.setAttribute('src', item._links.thumbnail.href);
        ul.appendChild(img);

        
    });

    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);

}

async function getImage(id) {
    const url = 'https://ws-public.interpol.int/notices/v1/red/2023-86196/images';
    const rep = await fetch(url);
    const data_img = await rep.json();
    console.log(data_img);
    return data_img;
}


