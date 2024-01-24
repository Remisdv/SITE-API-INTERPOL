async function search() {
  // Récupérer la valeur de la barre de recherche
  var searchTerm = document.getElementById("search-input").value;

  try {
    // Get the list of names
    const data = await getRedNotices();
    var list = data._embedded.notices;

    // Check if searchTerm is in the list of names
    if (est_dans_la_liste(searchTerm, list)) {
      // Afficher le résultat
      var resultContainer = document.getElementById("search-result");
      resultContainer.innerHTML = searchTerm + ' a une Red Notice.';

    } else {
      var resultContainer = document.getElementById("search-result");
      resultContainer.innerHTML = searchTerm + " n'a pas de Red Notice";
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la recherche :', error);
  }
}

let start = 1;

const getRedNotices = async () => {
  let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=160&page=' + start;
  console.log(start);
  const rep = await fetch(url);
  const data = await rep.json();
  return data;
}

// Fonction qui vérifie si une personne est dans la liste et renvoie les informations
function est_dans_la_liste(nom, liste) {
  // Check if the list is defined and is an array
  if (Array.isArray(liste)) {
    for (let i = 0; i < liste.length; i++) {
        if (liste[i].forename === nom) {
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
  // If the name was not found or the list is not defined or not an array, return an empty array
  return { found: false, personneTrouveeListe: [] };
}

function getall(list) {
    const noticeListDiv = document.getElementById('noticeList');
    const ul = document.createElement('ul');
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} ${item.forename} ${item.date_of_birth} ${item.nationalities} ${item.entity_id}`;
        li.setAttribute('id', item.entity_id);
        ul.appendChild(li);
        
    });
    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);

}

