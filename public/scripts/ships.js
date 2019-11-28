document.addEventListener('DOMContentLoaded', () => {
    var placeForData = document.getElementById('monitorData');
    fetch('/getShData').then(res =>{
        if(res.ok){
            data = res.json();
            this.uploadData(data, placeForData);
            return data;
        }
    }),
    document.getElementById('logo').addEventListener('click', () => {
        window.location.href = '/'
    });
});

function uploadData(data, placeForData) {
    hd = ``;
    data.then(anotherData=>{
        hd = `<table>
        <thead>
            <tr>
                <td>Название </td>
                <td>Водоизмещение </td>
                <td>Брэнд </td>
            </tr>
        </thead>
    <tbody>`;
        anotherData.forEach(element => {
            hd += `
            <tr>
                <td>${element.name}</td>
                <td>${element.capacity}</td>
                <td>${element.brand}</td>
            </tr>`
        });
    }).then(data =>{
        hd += `</tbody>
            </table>`
        placeForData.insertAdjacentHTML('afterend',hd);
    });
}