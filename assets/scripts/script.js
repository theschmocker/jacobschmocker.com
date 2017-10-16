// ------------ Nav-bar color change on scroll -------------

var landingHeight = document.getElementsByClassName('landing')[0].clientHeight,
    nav = document.getElementsByTagName('nav')[0],
    navHeight = nav.clientHeight,
    offset = landingHeight - navHeight;

var scrolled = false;

window.addEventListener('scroll', scroll);

function scroll () {
    scrolled = true;
}

function changeNav() {
    if (window.pageYOffset >= offset) {
        nav.classList.add('scroll');
    } else {
        nav.classList.remove('scroll');
    }
}

setInterval(function() {
    if( scrolled ) {
        scrolled = false;
        changeNav();
    }
}, 100);

// ----- Show menu on mobile -----

let menuButton = document.getElementById('menu-button');
let menu = document.getElementById('menu')

// Detect any clicks on page, call toggleMenu
document.documentElement.addEventListener('click', toggleMenu);

function toggleMenu(e) {
    // if the menu button is pressed, open/close the menu
    if (e.target.id === 'menu-button') {
        menu.classList.toggle('open');
        menu.classList.toggle('pressed');
        nav.classList.toggle('menu-open');
    } else {
        // if anything other than the menu button is pressed, close the menu
        menu.classList.remove('open');
        menu.classList.remove('pressed');
        nav.classList.remove('menu-open');
    }
}

