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
        let obj = { name: data.results[i].name, forname: data.results[i].forename };
        list.push(obj);
    }
    console.log(list);
    // disp info
}

getRedNotices().then((data) => {
    let raw_data = JSON.stringify(data);
    console.log(data);
    getAllInfo(data);
})

function change_page() {
    const next = document.getElementById('buton_next');
    const back = document.getElementById('buton_back');

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

}