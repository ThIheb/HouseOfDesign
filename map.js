
function showOrHide(room) {
    
    document.querySelectorAll('.content').forEach((content) => {
        content.classList.remove('visible');
        content.classList.add('hidden');
    });

    
    const selectedRoom = document.getElementById(`${room}_text`);
    if (selectedRoom) {
        selectedRoom.classList.remove('hidden');
        selectedRoom.classList.add('visible');
    }
}


document.getElementById('bathroom').addEventListener('click', () => showOrHide('bathroom'));
document.getElementById('kitchen').addEventListener('click', () => showOrHide('kitchen'));
document.getElementById('study').addEventListener('click', () => showOrHide('study'));
document.getElementById('livingroom').addEventListener('click', () => showOrHide('livingroom'));
