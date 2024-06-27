const navbar = document.getElementById('navbar');

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

window.onscroll = function () {
    scrollFunction();
}
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
}

const scrollrevealOption = {
    distance: '50px',
    origin: 'bottom',
    duration: 1500,
}

ScrollReveal().reveal('.home h1', scrollrevealOption);
ScrollReveal().reveal('.home h4', {
    ...scrollrevealOption,
    delay: 800,
});
ScrollReveal().reveal('.home .btn-explore', {
    ...scrollrevealOption,
    delay: 1200,
});

ScrollReveal().reveal('.about .about-title', scrollrevealOption);
ScrollReveal().reveal('.about .about-desc', {
    ...scrollrevealOption,
    delay: 600,
});
ScrollReveal().reveal('.about .item-data', {
    ...scrollrevealOption,
    delay: 1200,
});
ScrollReveal().reveal('.btn-explore', {
    ...scrollrevealOption,
    delay: 2000,
});
ScrollReveal().reveal('.btn-more', {
    ...scrollrevealOption,
    delay: 2000,
});
ScrollReveal().reveal('.card', scrollrevealOption);

ScrollReveal().reveal('.card .image', {
    ...scrollrevealOption,
    delay: 600,
});
ScrollReveal().reveal('.card .content-card h4', {
    ...scrollrevealOption,
    delay: 1600,
});
ScrollReveal().reveal('.next .card .content-card p', {
    ...scrollrevealOption,
    delay: 2000,
});

ScrollReveal().reveal('form .input', scrollrevealOption);
ScrollReveal().reveal('row .card', scrollrevealOption);

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 7000)

function showSlider() {
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 7000);
}

document.querySelectorAll('.btn-read').forEach(button => {
    button.addEventListener('click', () => {
        const country = button.getAttribute('data-country');

        // Hide all country sections
        document.querySelectorAll('.list').forEach(list => {
            list.style.display = 'none';
        });

        // Show the selected country section
        const selectedList = document.getElementById(country);
        selectedList.style.display = 'block';

        // Set the first thumbnail and item as active
        items = selectedList.querySelectorAll('.item');
        thumbnails = document.querySelectorAll('.thumbnail .item');
        countItem = items.length;

        itemActive = 0;
        showSlider();
    });
});
// Increment the completed trips counter
document.querySelectorAll(".cards-counter").forEach((card) => {
    card.addEventListener("click", () => {
        if (card.classList.contains("incremented")) return;

        const counter = document.querySelector("#completed-trips-counter");
        let newValue = parseInt(counter.innerHTML);

        if (!isNaN(newValue)) {
            newValue += 1;
            if (newValue > 3) newValue = 3;
            counter.innerHTML = newValue;
            card.classList.add("incremented");
            localStorage.setItem("completed-trips-counter", newValue.toString());
        } else {
            console.error("The counter value is not a number");
        }
    });
});

// Retrieve the counter value from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedCounter = localStorage.getItem("completed-trips-counter");
    let initialCounter = savedCounter ? parseInt(savedCounter) : 0;

    if (!isNaN(initialCounter)) {
        if (initialCounter > 3) initialCounter = 3;
        document.querySelector("#completed-trips-counter").innerHTML = initialCounter;
    } else {
        console.error("The saved counter value is not a number");
        document.querySelector("#completed-trips-counter").innerHTML = 0;
    }
});

    
// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

next.addEventListener('click', () => {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
});

prev.addEventListener('click', () => {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
});

