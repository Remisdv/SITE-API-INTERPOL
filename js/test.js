const getRedNotices = async () => {
    const rep = await fetch('https://ws-public.interpol.int/notices/v1/red?resultPerPage=100');
    const data = await rep.json();
    return data
}

function getAllInfo(data) {
    let str = data._embedded.notices[0].name + " " + data._embedded.notices[0].forename;
    document.write(str);
}

getRedNotices().then((data) => {
    //let jej = JSON.stringify(data);
    console.log(data);
    getAllInfo(data);
})
