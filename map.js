document.addEventListener('DOMContentLoaded', function () {
    const part1 = document.getElementById('bathroom'); // This could be 'map' or another part
    const part2 = document.getElementById('study'); // SVG part 2

    const text1 = document.getElementById('map'); // Text for part 1
    const text2 = document.getElementById('study_text'); // Text for part 2

    // Function to hide all text
    function hideAllText() {
        text1.classList.remove('visible');
        text1.classList.add('hidden');
        text2.classList.remove('visible');
        text2.classList.add('hidden');
    }

    // Click event for part 1
    part1.addEventListener('click', function () {
        hideAllText(); // Hide other texts
        text1.classList.remove('hidden'); // Remove the hidden class from text1
        text1.classList.add('visible'); // Show text1
    });

    // Click event for part 2
    part2.addEventListener('click', function () {
        hideAllText(); // Hide other texts
        text2.classList.remove('hidden'); // Remove the hidden class from text2
        text2.classList.add('visible'); // Show text2
    });
});
