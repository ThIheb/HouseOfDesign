// Function to hide all room contents
function hideAllRooms() {
    const roomContents = document.querySelectorAll('.room-content');
    roomContents.forEach(content => content.style.display = 'none');
}

// Function to show the content of the clicked room
function showRoomContent(roomId) {
    hideAllRooms(); // First hide all room content
    const roomContent = document.getElementById(`${roomId}Content`);
    if (roomContent) {
        roomContent.style.display = 'block'; // Show the relevant room content
    }
}

// Add event listeners to each rect (rooms in the image map)
document.querySelectorAll('.image-mapper-shape').forEach(rect => {
    rect.addEventListener('click', function () {
        const roomId = this.getAttribute('data-id'); // Get the data-id of the clicked room
        showRoomContent(roomId); // Show the appropriate room content
    });
});
