const navbar = document.getElementById('navbar');
window.onscroll = function () {
    scrollFunction()
}
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.classList.add('active')
    } else {
        navbar.classList.remove('active')
    }
}

const scrollrevealOption = {
    distance: '50px',
    origin: 'bottom',
    duration: 1500,
}

ScrollReveal().reveal('.home h1', scrollrevealOption)
ScrollReveal().reveal('.home h4', {
    ...scrollrevealOption,
    delay: 800,
})
ScrollReveal().reveal('.home .btn-explore', {
    ...scrollrevealOption,
    delay: 1200,
})

ScrollReveal().reveal('.about .about-title', scrollrevealOption)
ScrollReveal().reveal('.about .about-desc', {
    ...scrollrevealOption,
    delay: 600,
})
ScrollReveal().reveal('.about .item-data', {
    ...scrollrevealOption,
    delay: 1200,
})
ScrollReveal().reveal('.btn-explore', {
    ...scrollrevealOption,
    delay: 2000,
})
ScrollReveal().reveal('.btn-more', {
    ...scrollrevealOption,
    delay: 2000,
})
ScrollReveal().reveal('.card', scrollrevealOption)

ScrollReveal().reveal('.card .image', {
    ...scrollrevealOption,
    delay: 600,
})
ScrollReveal().reveal('.card .content-card h4', {
    ...scrollrevealOption,
    delay: 1600,
})
ScrollReveal().reveal('.next .card .content-card p', {
    ...scrollrevealOption,
    delay: 2000,
})

ScrollReveal().reveal('form .input', scrollrevealOption)
ScrollReveal().reveal('row .card', scrollrevealOption)

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function () {
    itemActive = itemActive + 1;
    if (itemActive >= countItem) {
        itemActive = 0;
    }
    showSlider();
}

// event prev click
prev.onclick = function () {
    itemActive = itemActive - 1;
    if (itemActive < 0) {
        itemActive = countItem - 1;
    }
    showSlider();
}

// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)

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
    }, 5000)
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
        itemActive = 0;
        showSlider();
    });
});

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})
