document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('logo').addEventListener('click', () => {
        window.location.href = '/'
    });
    document.getElementById('monitor').addEventListener('click', () => {
        window.location.href = '/monitor';
    });
    document.getElementById('staff').addEventListener('click', () => {
        window.location.href = '/staff';
    });
    document.getElementById('ships').addEventListener('click', () => {
        window.location.href = '/ships';
    });
});