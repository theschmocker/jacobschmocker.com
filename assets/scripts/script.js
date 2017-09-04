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
    if (document.body.scrollTop >= offset) {
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
