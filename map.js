// Function to show the correct room and hide others
function showOrHide(room) {
    // Hide all content sections
    document.querySelectorAll('.content').forEach((content) => {
        content.classList.remove('visible');
        content.classList.add('hidden');
    });

    // Show the selected room's section
    const selectedRoom = document.getElementById(`${room}_text`);
    if (selectedRoom) {
        selectedRoom.classList.remove('hidden');
        selectedRoom.classList.add('visible');
    }
}

// Bind click events to the SVG rect elements
document.getElementById('bathroom').addEventListener('click', () => showOrHide('bathroom'));
document.getElementById('kitchen').addEventListener('click', () => showOrHide('kitchen'));
document.getElementById('study').addEventListener('click', () => showOrHide('study'));
document.getElementById('livingroom').addEventListener('click', () => showOrHide('livingroom'));
