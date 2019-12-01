document.addEventListener('DOMContentLoaded', () => {
    hd = ``;
    var placeForData = document.getElementById('monitorData');
    $.ajax({
        url: '/getInsert',
        type: 'GET',
        success: data =>{
            uploadData(data, placeForData);
            uploadInserts(name);
            uploadAddButton(name);
            arr1 = [];
            for(var i in data.result[0]){
                arr1.push(i);
            }
            arr1.splice(0,1);
            document.getElementById('btn').addEventListener('click', () =>{
                a = document.getElementsByClassName('out');
                arr2 = [];
                for(let i = 0; i < a.length; i++){
                    if(a[i].tagName == 'INPUT'){
                        arr2.push(a[i].value);
                    }else{
                        ind = a[i].options.selectedIndex;
                        arr2.push(a[i].options[ind].value);
                    }
                }
                gname = ``;
                gname = data.name;
                $.ajax({
                    url: '/insertData',
                    type: 'GET',
                    data: {'table': data.name, 'column': arr1, 'values':arr2},
                    success: data =>{
                        alert(data.answer);
                        $.ajax({
                            url: '/setback',
                            type: 'GET',
                            data: {'name': gname},
                        });
                        window.location.href = '/login';
                    }
                });
            });
        }
    });
    document.getElementById('logo').addEventListener('click', () => {
        window.location.href = '/login'
    });
});

document.addEventListener('keydown',(function(event) {
    if(event.code =='Escape'){
        window.location.href = '/login'
    }
}));

function companies() {
    place = document.getElementById('name');
    hd = `<input class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);
}

function crew() {
    $.ajax({
        url: '/getselect',
        type: 'GET',
        data: {'table':'companies', 'column':'name'},
        success: data =>{
            place = document.getElementById('company_id');
            hd = `<select id = "sel1" class = "out">`;
            data.forEach(element =>{
                hd +=  `<option value = "${element.id}">[${element.id}] - ${element.name}</option>`;
            });
            hd += `</select>`;
            place.insertAdjacentHTML('beforeend',hd);
        }
    });
}

function crew_to_staff() {
    $.ajax({
        url: '/getselect',
        type: 'GET',
        data: {'table':'crew', 'column':'company_id'},
        success: data =>{
            place = document.getElementById('crew_id');
            hd = `<select class = "out" id = "sel1">`;
            data.forEach(element =>{
                hd +=  `<option value = "${element.id}">${element.id}</option>`;
            });
            hd += `</select>`;
            place.insertAdjacentHTML('beforeend',hd);
            $.ajax({
                url: '/getselect',
                type: 'GET',
                data: {'table':'staff', 'column':'post, surname'},
                success: data =>{
                    place = document.getElementById('man_id');
                    hd = `<select class = "out" id = "sel2">`;
                    data.forEach(element =>{
                        hd +=  `<option value = "${element.id}">[${element.id}] - ${element.post} ${element.surname}</option>`;
                    });
                    hd += `</select>`;
                    place.insertAdjacentHTML('beforeend',hd);
                }
            });
        }
    });
}

function ports() {
    place = document.getElementById("name");
    hd = `<input id = "inp1" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("city");
    hd = `<input id = "inp2" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("country");
    hd = `<input id = "inp3" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);
}

function ship() {
    place = document.getElementById("brand");
    hd = `<input id = "inp1"  type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("name");
    hd = `<input id = "inp2"  type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("capacity");
    hd = `<input id = "inp3"  type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    $.ajax({
        url: '/getselect',
        type: 'GET',
        data: {'table':'companies', 'column':'name'},
        success: data =>{
            place = document.getElementById('company_id');
            hd = `<select id = "sel1" class = "out">`;
            data.forEach(element =>{
                hd +=  `<option value = "${element.id}">[${element.id}] - ${element.name}</option>`;
            });
            hd += `</select>`;
            place.insertAdjacentHTML('beforeend',hd);
            $.ajax({
                url: '/getselect',
                type: 'GET',
                data: {'table':'crew', 'column':'company_id'},
                success: data =>{
                    place = document.getElementById('crew_id');
                    hd = `<select id = "sel1" class = "out">`;
                    data.forEach(element =>{
                        hd +=  `<option value = "${element.id}">${element.id}</option>`;
                    });
                    hd += `</select>`;
                    place.insertAdjacentHTML('beforeend',hd);
                }
            });
        }
    });
}

function staff() {
    place = document.getElementById("surname");
    hd = `<input id = "inp1" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("name");
    hd = `<input id = "inp2" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("patronymic");
    hd = `<input id = "inp3" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("post");
    hd = `<input id = "inp4" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("expirience");
    hd = `<input id = "inp5" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);
}

function status() {
    place = document.getElementById("status_name");
    hd = `<input id = "inp1" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);
}

function voyage() {
    place = document.getElementById("type");
    hd = `<input id = "inp1"  type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("out_time");
    hd = `<input id = "inp2"  type = "date" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("in_time");
    hd = `<input id = "inp4" type = "date" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    place = document.getElementById("length");
    hd = `<input id = "inp6" type = "text" class = "out">`;
    place.insertAdjacentHTML('beforeend',hd);

    $.ajax({
        url: '/getselect',
        type: 'GET',
        data: {'table':'ports', 'column':'name'},
        success: data =>{
            place = document.getElementById('out_port');
            hd = `<select id = "sel1" class = "out">`;
            data.forEach(element =>{
                hd +=  `<option value = "${element.id}">[${element.id}] - ${element.name}</option>`;
            });
            hd += `</select>`;
            place.insertAdjacentHTML('beforeend',hd);

            place = document.getElementById('in_port');
            hd = `<select  id = "sel2" class = "out">`;
            data.forEach(element =>{
                hd +=  `<option value = "${element.id}">[${element.id}] - ${element.name}</option>`;
            });
            hd += `</select>`;
            place.insertAdjacentHTML('beforeend',hd);

            $.ajax({
                url: '/getselect',
                type: 'GET',
                data: {'table':'ship', 'column':'name'},
                success: data =>{
                    place = document.getElementById('ship_id');
                    hd = `<select  id = "sel3" class = "out">`;
                    data.forEach(element =>{
                        hd +=  `<option value = "${element.id}">[${element.id}] - ${element.name}</option>`;
                    });
                    hd += `</select>`;
                    place.insertAdjacentHTML('beforeend',hd);

                    $.ajax({
                        url: '/getselect',
                        type: 'GET',
                        data: {'table':'status', 'column':'status_name'},
                        success: data =>{
                            place = document.getElementById('status_id');
                            hd = `<select id = "sel4" class = "out">`;
                            data.forEach(element =>{
                                hd +=  `<option value = "${element.id}">[${element.id}] - ${element.status_name}</option>`;
                            });
                            hd += `</select>`;
                            place.insertAdjacentHTML('beforeend',hd);
                        }
                    });
                }
            });
        }
    });
}

function uploadInserts(name) {
    switch(name){
        case 'companies':
            companies();
            break;
        case 'crew':
            crew();
            break;
        case 'crew_to_staff':
            crew_to_staff();
            break;
        case 'ports':
            ports();
            break;
        case 'ship':
            ship();
            break;
        case 'staff':
            staff();
            break;
        case 'status':
            status();
            break;
        case 'voyage':
            voyage();
            break;
    }
}

function uploadData(data1, placeForData) {
    data = data1.result;
    name = data1.name;
    hd = ``;
    var id = 0;
    hd += `<div id = "head_wrap">
            <h1 id = "op">${name}</h1>
            </div>`;
    hd += `<table id ="table">
            <thead>
                <tr>`;
    for(var i in data[0]){
        hd += `<td>${i}</td>`;
    }
    hd += `
                </tr>
            </thead>
        <tbody>`;
    data.forEach(element => {
        hd += `<tr>`;
        for(var i in element){
            hd += `<td>${element[i]}</td>
                  `;
        }
        hd += `</tr>
            `;
        id++;
    });
    hd += `<tr>`;
    for(var i in data[0]){
        if(i == 'id'){
            hd += `<td>${id+1}</td>`;
        }else{
            hd += `<td><div id = "${i}" class = "data"></div></td>`;
        }
    }
    placeForData.insertAdjacentHTML('beforeend',hd);
}

function uploadAddButton(name) {
    hd = ``;
    place = document.getElementById('table');
    hd += `<div id = "head_wrap">
    <h1><button id = "btn" class = "search">Добавить запись</button></h1>
    </div>`;
    place.insertAdjacentHTML('afterend',hd);
    place = document.getElementById("btn");
}