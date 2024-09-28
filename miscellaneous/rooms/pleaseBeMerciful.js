// Function to show the specific text when a part of the image is clicked
function showText(sectionId) {
    // Hide all content
    document.querySelectorAll('.content').forEach(function(el) {
        el.classList.add('hidden');
        el.classList.remove('visible');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('visible');
}

// Add click event listeners to the SVG parts
document.getElementById('bathroom').addEventListener('click', function () {
    showText('bathroom_text');
});

document.getElementById('kitchen').addEventListener('click', function () {
    showText('kitchen_text');
});

document.getElementById('study').addEventListener('click', function () {
    showText('study_text');
});

document.getElementById('livingroom').addEventListener('click', function () {
    showText('livingroom_text');
});