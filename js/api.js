let start = 1;

const getRedNotices = async () => {
    let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=' + (20 * start) + '&page=' + start;
    const rep = await fetch(url);
    const data = await rep.json();
    return data;
}

function getAllInfo(data) {
    let list = [];
    for (let i = 0; i < 20; i++) {
        let obj = { name: data._embedded.notices[i].name, forname: data._embedded.notices[i].forename };
        list.push(obj);
    }
    console.log(list);
    // disp info
        const noticeListDiv = document.getElementById('noticeList');

    // Création d'une liste non ordonnée (ul) dans le DOM
    const ul = document.createElement('ul');

    // Ajout des éléments de la liste à la liste non ordonnée
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} ${item.forname}`;
        ul.appendChild(li);
    });

    // Ajoutez la liste non ordonnée à la div
    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);

}

getRedNotices().then((data) => {
    let raw_data = JSON.stringify(data);
    console.log(data);
    getAllInfo(data);
})

function change_page() {
    const next = document.getElementById('button_next');
    const back = document.getElementById('button_back');

    next.addEventListener('click', () => {
        start++;
        getRedNotices().then((data) => {
            let raw_data = JSON.stringify(data);
            console.log(data);
            getAllInfo(data);
        })
    })

    back.addEventListener('click', () => {
        if (start > 1) {
            start--;
            getRedNotices().then((data) => {
                let raw_data = JSON.stringify(data);
                console.log(data);
                getAllInfo(data);
            })
        }
    })
}

function show_more() {

};
