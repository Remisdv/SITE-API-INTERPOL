let start = 1;

const getRedNotices = async () => {
    let url = 'https://ws-public.interpol.int/notices/v1/red?resultPerPage=20&page=' + start;
    console.log(start);
    const rep = await fetch(url);
    const data = await rep.json();
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
        ul.appendChild(li);
    });
    noticeListDiv.innerHTML = '';
    noticeListDiv.appendChild(ul);

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

function show_more() {

};

getRedNotices().then((data) => {
    getAllInfo(data);
})

change_page();