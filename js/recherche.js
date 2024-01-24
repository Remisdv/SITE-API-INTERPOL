function search() {
  // Récupérer la valeur de la barre de recherche
  var searchTerm = document.getElementById("search-input").value;

  // Afficher le résultat
  var resultContainer = document.getElementById("search-result");
  resultContainer.innerHTML =  searchTerm;
}


