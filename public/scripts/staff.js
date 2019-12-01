document.addEventListener('DOMContentLoaded', () => {
    var placeForData = document.getElementById('monitorData');
    fetch('/getSData').then(res =>{
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

document.addEventListener('keydown',(function(event) {
    if(event.code == 'Backspace' || event.code =='Escape'){
        window.location.href = '/'
    }
}));

function uploadData(data, placeForData) {
    hd = ``;
    data.then(anotherData=>{
        hd = `<table>
        <thead>
            <tr>
                <td> Фамилия </td>
                <td> Имя </td>
                <td> Отчество </td>
                <td> Пост</td>
                <td> Трудовой стаж</td>
            </tr>
        </thead>
    <tbody>`;
        anotherData.forEach(element => {
            hd += `
            <tr>
                <td>${element.surname}</td>
                <td>${element.name}</td>
                <td>${element.patronymic}</td>
                <td>${element.post}</td>
                <td>${element.expirience}</td>
            </tr>`
        });
    }).then(data =>{
        hd += `</tbody>
            </table>`
        placeForData.insertAdjacentHTML('afterend',hd);
    });
}