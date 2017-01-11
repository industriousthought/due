(function() {

    var last_known_scroll_position = window.scrollY;
    var scrollEvents = [];
    var brickScrollScaler = 0;
    var menuBarHeight;
    var splashBGHeight;
    var ticking = false;
    var windowHeight;
    var assetsLoaded = 0;
    var imageSet;

    var pizzaSection = document.getElementById('brickOven');
    var subsSection = document.getElementById('subs');
    var sidesSection = document.getElementById('sides');
    var saladsSection = document.getElementById('salads');

    var pizzaButton = document.getElementById('pizzaButton');
    var subsButton = document.getElementById('subsButton');
    var sidesButton = document.getElementById('sidesButton');
    var saladsButton = document.getElementById('saladsButton');

    var freeDelivery = document.getElementById('freeDelivery');
    var splashBG = document.getElementById('splashBG');
    var splashPizza = document.getElementById('splashPizza');
    var menuBar = document.getElementById('menuBar');
    var brickWall = document.getElementById('brickWall');
    var menu = document.getElementById('menu');
    var topLogo = document.getElementById('topLogo');

    var scrollTo = function(target) {
        document.documentElement.scrollTop = document.body.scrollTop = target.getBoundingClientRect().top + window.scrollY - menuBar.clientHeight;
    }

    var doScroll = function() {
        scrollEvents.forEach(function(e) {
            e(last_known_scroll_position);
        });
        var visible = (windowHeight - last_known_scroll_position * brickScrollScaler - menuBarHeight > 0);
        menuBar.style.top = visible ? 
            (windowHeight - menuBarHeight - last_known_scroll_position * brickScrollScaler + 'px') : 
            (0 + 'px');
        brickWall.style.top = visible ? 
            (windowHeight - menuBarHeight -1140 - last_known_scroll_position * brickScrollScaler + 'px') : 
            (0 - 1140 + 'px');
        if (visible) menu.style.top = windowHeight + 'px';

    }

    var placeElements = function() {
        loadAssets();
        windowHeight = window.innerHeight;
        var aspect = window.innerWidth / windowHeight;
        console.log(aspect);
        menuBarHeight = menuBar.clientHeight;
        splashBGHeight = splashBG.clientHeight;
        topLogo.customOffset = windowHeight * 0.05;   
        splashBG.customOffset = (0 - (splashBGHeight * ((0 - 0.15) + (aspect * 0.25))));
        brickScrollScaler = 2 - ((aspect < 1) ? aspect * 0.5 : 1);
        freeDelivery.customOffset = windowHeight - menuBarHeight - freeDelivery.clientHeight - 10;
        freeDelivery.scrollScaler = brickScrollScaler;
        splashPizza.scrollScaler = 1.5;
        splashPizza.customOffset = windowHeight * 0.27;
        doScroll(window.scrollY);
    };


    var assetLoaded = function() {
        assetsLoaded++;
        if (assetsLoaded >= 4) { 
            if (assetsLoaded === 4) {
                document.getElementById('wrapper').style.opacity = 1;
                document.getElementById('loading').style.opacity = 0;
            }
            placeElements();
        }
    };

    var loadAssets = function() {
        var width = window.innerWidth;
        var oldImg = imageSet;
        if (width >= 1200) imageSet = 6;
        if (width < 1200) imageSet = 5;
        if (width < 742) imageSet = 4;
        if (width < 642) imageSet = 3;
        if (width < 502) imageSet = 2;

        if (!oldImg || imageSet > oldImg) {
            splashBG.src = './img/city' + imageSet + '.jpg';
            splashPizza.src = './img/20inch' + imageSet + '.png';
            topLogo.src = './img/banner' + imageSet + '.png';
        }

    };


    window.addEventListener('load', function() {

        pizzaButton.addEventListener('click', scrollTo.bind(null, pizzaSection));
        subsButton.addEventListener('click', scrollTo.bind(null, subsSection));
        sidesButton.addEventListener('click', scrollTo.bind(null, sidesSection));
        saladsButton.addEventListener('click', scrollTo.bind(null, saladsSection));

        [].slice.call(document.getElementsByClassName('parallax')).forEach(function(el) {
            el.scrollScaler = el.getAttribute('data-scalar') || 1;
            scrollEvents.push(function(scroll) { 
                el.style.top = ((el.customOffset)? el.customOffset : 0) - scroll *  el.scrollScaler + 'px';

            })
        });


        window.addEventListener('resize', placeElements);

        assetLoaded();
    });

    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.setTimeout(function() {
                doScroll();
                ticking = false;
            }, 15);
        }
        ticking = true;

    });

    splashBG.addEventListener('load', assetLoaded);
    splashPizza.addEventListener('load', assetLoaded);
    topLogo.addEventListener('load', assetLoaded);

    loadAssets();

})()

