let section = 0; 

function readMore() {
    const more1 = document.getElementById("more1");
    const more2 = document.getElementById("more2");
    
    const btnText = document.getElementById("more");
    const endText = document.getElementById("end");

    section++;

    if (section === 1) {
        
        more1.style.display = "inline";
        btnText.textContent = "Read more";
        endText.style.display = "none"; 
    } else if (section === 2) {
        
        more2.style.display = "inline";
        btnText.textContent = "Read less";
    } else {
        more1.style.display = "none";
        more2.style.display = "none";
        btnText.textContent = "Read more";
        endText.style.display = "inline"; 
        section = 0;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let currentItem = 2;
    const items = document.querySelectorAll('.carousel .room .item');
    const totalItems = items.length;

    document.getElementById('prev').addEventListener('click', function () {
        moveSlide(-1);
    });

    document.getElementById('next').addEventListener('click', function () {
        moveSlide(1);
    });

    function moveSlide(direction) {
        items[currentItem - 1].querySelector('.intro').style.opacity = '0';
        currentItem = (currentItem + direction + totalItems - 1) % totalItems + 1;
        items.forEach((item, index) => {
            item.style.zIndex = index === currentItem - 1 ? 10 : 5;
            item.querySelector('.intro').style.opacity = index === currentItem - 1 ? '1' : '0';
        });
    }

    /*buttons
    const detailButtons = document.querySelectorAll('.buttons button');
    const backButtons = document.querySelectorAll('.back-button');


    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            this.closest('.intro').style.display = 'none';
    
            document.querySelectorAll(".arrows button").forEach(arrowButton => {
                arrowButton.style.opacity = 0;
            });
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.detail').classList.remove('active');
            this.closest('.item').querySelector('.intro').style.display = 'flex';

            document.querySelectorAll(".arrows button").forEach(arrowButton => {
                arrowButton.style.opacity = 1;
            });
        });
    });*/
});


