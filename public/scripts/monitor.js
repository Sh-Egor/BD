document.addEventListener('DOMContentLoaded', () => {
var placeForData = document.getElementById('monitorData');
console.log(placeForData);

    fetch('/getMData').then(res =>{
        if(res.ok){
            data = res.json();
            console.log(data);
            this.uploadData(data, placeForData);
            return data;
        }
    }),
    document.getElementById('logo').addEventListener('click', () => {
        window.location.href = '/'
    });
});

function uploadData(data, placeForData) {
    
    data.then(anotherData=>{
        anotherData.forEach(element => {
            const tamplate =`<span> ${element.id}</span>`;
            placeForData.insertAdjacentHTML('beforeend',tamplate);
        });
    });
}