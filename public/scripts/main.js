document.addEventListener('DOMContentLoaded', () => {
    var placeForData1 = document.getElementById('data3');
    var placeForData2 = document.getElementById('data4');
    $.ajax({
        url: '/staffreq',
        type: 'POST',
        success: data =>{
            this.uploadData(data, placeForData1,1);
            return data;
        }
    });
    $.ajax({
        url: '/shipsreq',
        type: 'POST',
        success: data =>{
            this.uploadData(data, placeForData2,2);
            return data;
        }
    });
    document.getElementById('logo').addEventListener('click', () => {
        window.location.href = '/'
    });
    document.getElementById('monitor').addEventListener('click', () => {
        var indate = document.getElementById('date1').value;
        var outdate = document.getElementById('date2').value;
        $.ajax({
            url: '/monitorredir',
            type: 'POST',
            data: {'date1':indate, 'date2': outdate}
        });
        window.location.href = '/monitorop';
    });
    document.getElementById('staff').addEventListener('click', () => {
        var ind = document.getElementById("fsel1").options.selectedIndex;
        var name = document.getElementById("fsel1").options[ind].value;
        console.log(name);
        $.ajax({
            url: '/staffredir',
            type: 'POST',
            data: {'name':name}
        });
        window.location.href = '/staff';
    });
    document.getElementById('ships').addEventListener('click', () => {
        var ind = document.getElementById("fsel2").options.selectedIndex;
        var name = document.getElementById("fsel2").options[ind].value;
        console.log(name);
        $.ajax({
            url: '/shipsredir',
            type: 'POST',
            data: {'name':name}
        });
        window.location.href = '/ships';
    });
    document.getElementById('login').addEventListener('click', () =>{
        var log = document.getElementById('one').value;
        var psw = document.getElementById('two').value;
        $.ajax({
            url: '/loginredir',
            type: 'POST',
            data: {'log':log, 'psw':psw},
            success: data =>{
                if(data != -1){
                    window.location.href = '/login';
                    // переписать на аякс запрос
                }else{
                    alert("Неверные логин и/или пароль");
                }
            }
        });
    });
});

function uploadData(data, placeForData,ind) {
    hd = ``;
    hd = `<select class = "data" id = "fsel${ind}">`;
        data.forEach(element => {
            hd += `<option>${element.name}</option>`;
        });
    hd += `</select>`;
        placeForData.insertAdjacentHTML('beforeend',hd);
}