document.addEventListener("DOMContentLoaded", function(event) { 
    const nav_menu_img_hover = document.querySelector(".nav-menu-img-hover");
    const nav_close_img_hover = document.querySelector(".nav-close-img-hover");
    const nav_menu = document.querySelector(".nav-menu-container");

    nav_menu_img_hover.addEventListener('click', (e) => {
        if ( e.target.classList.contains('d-none') ) {
            nav_close_img_hover.classList.add('d-none');
            e.target.classList.remove('d-none');
        } else {
            // 
            nav_close_img_hover.classList.remove('d-none');
            nav_menu.classList.remove('d-none');
            e.target.classList.add('d-none');
        }
    });

    nav_close_img_hover.addEventListener('click', (e) => {
        nav_menu_img_hover.classList.remove('d-none');
        nav_menu.classList.add('d-none');
        e.target.classList.add('d-none');
    });
});