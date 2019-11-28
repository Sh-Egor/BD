document.addEventListener('DOMContentLoaded', () => {
    var placeForData = document.getElementById('monitorData');
    fetch('/getMData').then(res =>{
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
                    <td> Статус </td>
                    <td> Имя </td>
                    <td> Тип </td>
                    <td> Время отправления</td>
                    <td> Порт отправления</td>
                    <td> Время прибытия</td>
                    <td> Порт прибытия</td>
                    <td> Длина пути</td>
                    <td> Водоизмещение</td>
                    <td> Брэнд </td>
                </tr>
            </thead>
        <tbody>`;
        anotherData.forEach(element => {
            var outdate = new Date(element.out_time);
            var indate = new Date(element.in_time);
            hd +=`   <tr>
                                    <td>${element.status_name}</td>
                                    <td>${element.name}</td>
                                    <td>${element.type}</td>
                                    <td>${outdate.getDate()} - ${outdate.getMonth()} - ${outdate.getFullYear()}
                                    <br>
                                    ${outdate.getHours()}:${outdate.getMinutes()}</td>
                                    <td>${element.NameOut}</td>
                                    <td>${indate.getDate()} - ${indate.getMonth()} - ${indate.getFullYear()}
                                    <br> 
                                    ${indate.getHours()}:${indate.getMinutes()}</td>
                                    <td>${element.NameIn}</td>
                                    <td>${element.length}</td>
                                    <td>${element.capacity}</td>
                                    <td>${element.brand}</td>
                                </tr>`;
        });
    }).then(data =>{
        hd += `</tbody>
                </table>`
        placeForData.insertAdjacentHTML('afterend',hd);
    });
}