let landingHeight = document.getElementsByClassName('landing')[0].clientHeight,
    nav = document.getElementsByTagName('nav')[0],
    navHeight = nav.clientHeight,
    offset = landingHeight - navHeight;

main();

function main() {
    setupMenuHandler();
    setupScrollHandler();
    setupResizeHandler();
}

function setupScrollHandler() {
    let scrolled = false;
    
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
    
}

function setupMenuHandler() {
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
}

function setupResizeHandler() {
    window.addEventListener("resize", resizeThrottler, false);

    let resizeTimeout;
    // keeps the function from continuously firing while the window is being resized
    function resizeThrottler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                resizeTimeout = null;

                landingHeight = document.getElementsByClassName('landing')[0].clientHeight;
                offset = landingHeight - navHeight;
            }, 500);
        }
    }
}