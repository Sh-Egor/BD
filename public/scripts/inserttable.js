document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: '/fstback',
        type: 'POST',
        success: data =>{  
            if(data.answer == 1){
                $.ajax({
                    url: '/insertredir',
                    type: 'POST',
                    data: {'name':data.name}
                });
                window.location.href = "/insert";
            }
        }
    });
    var placeForData = document.getElementById('monitorData');
    $.ajax({
        url: '/getBD',
        type: 'GET',
        success: data =>{
            this.uploadData(data, placeForData);
            return data;
        }
    });
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
    // data=>{
        hd += `<div id = "head_wrap">
        <h1 id = "op">monitordb</h1>
        </div>`;
        hd += `<table>
        <tbody>`;
        i = 0;
        data.forEach(element => {
            hd +=`   <tr>
                            <td id ="tablename${i}"><button class = "search">${element.Tables_in_monitordb}</button></td>
                    </tr>`;
            i++;
        });
        hd += `</tbody>
                </table>`
        placeForData.insertAdjacentHTML('afterend',hd);
        for(var j = 0; j < i; j++){
            document.getElementById(`tablename${j}`).addEventListener('click', (e)=>{
                name = e.target.textContent;
                $.ajax({
                    url: '/insertredir',
                    type: 'POST',
                    data: {'name':name}
                });
                window.location.href = "/insert";
            });
        }
    // }
}