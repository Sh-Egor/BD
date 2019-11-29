document.addEventListener('DOMContentLoaded', () => {

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
        window.location.href = '/staff';
    });
    document.getElementById('ships').addEventListener('click', () => {
        window.location.href = '/ships';
    });
});