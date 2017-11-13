// TODO: Desperately-needed refactor

let landingHeight = document.getElementsByClassName('landing')[0].clientHeight,
    nav = document.getElementsByTagName('nav')[0],
    navHeight = nav.clientHeight,
    offset = landingHeight - navHeight,
    contact = document.getElementsByClassName('contact')[0];

main();

function main() {
    setupMenuHandler();
    setupScrollHandler();
    setupResizeHandler();
    lazyLoadImages();
    document.getElementsByTagName('form')[0].addEventListener('submit', formHandler);
}

function setupScrollHandler() {
    let scrolled = false;
    
    window.addEventListener('scroll', scroll);
    
    function scroll () {
        scrolled = true;
    }
    
    function changeNav() {
        if (window.pageYOffset >= offset && window.pageYOffset !== contact.offsetTop) {
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

function lazyLoadImages() {
    let lazy = document.getElementsByClassName('lazy');

    window.addEventListener('load', loadImages);

    function loadImages() {
        for (let i = 0; i < lazy.length; i++) {
            lazy[i].src = lazy[i].getAttribute('data-src');
            lazy[i].removeAttribute('data-src');
        }
    }
}

function formHandler(e) {
    e.preventDefault();

    const form = this;
    const submitButton = document.getElementById('send-button');
    const errorContainer = document.querySelector('.contact-form__error');
    const errorMessage = document.getElementById('error');

    const data = { 
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        message: document.querySelector('#message').value
    };

    errorContainer.classList.remove('contact-form__error--visible');

    formLoading(true);

    send(data)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // ensure that the loading animation is shown for at least 3 seconds
            setTimeout(() => {
                formLoading(false);
                responseHandler(result);
            }, 2000);
        })
        .catch(err => {
            formLoading(false);
            responseHandler({message: err.message});
        });

    // made this a closure so that submitButton was in scope. there might be a better way to do this...
    function formLoading(isLoading) {
        if (isLoading) {
            submitButton.disable = true;
            submitButton.classList.add('loading');
        } else {
            submitButton.disable = false;
            submitButton.classList.remove('loading');
        }
    }

    // closure here too
    function responseHandler(response) {
        console.log(response);
        if (response.message === "success") {
            submitButton.classList.add('sent');
            form.reset();
            //  show sent confirmation for 2 seconds before resetting
            setTimeout(() => submitButton.classList.remove('sent'), 2000);
        } else {
            if (response.message === 'Failed to fetch') {
                errorMessage.textContent = 'Can\'t connect to server.'
            } else {
                errorMessage.textContent = response.message;
            }

            errorContainer.classList.add('contact-form__error--visible');
        }
    }
}

// Creates and sends a response to the contact server,
// then returns a Promise to be handled in the calling scope
function send(data) {
    const endpoint = 'https://jacobschmocker.com/contact';
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    };

    return fetch(endpoint, options);
} 