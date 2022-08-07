// Get the modal
var modal = document.getElementById("image-popup-modal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.querySelectorAll("img.modal-popup-able");
var modalImg = document.getElementById("img01");

const popupImageModalHandler = function (event) {
    console.log(this);
    let src = "";

    if ( this.getAttribute("src") ){
        src = this.getAttribute("src");
    } else if ( this.getAttribute("srcset")){
        src = this.getAttribute("srcset").slice(0, -3);
    }

    modal.style.display = "block";
    modalImg.setAttribute('src', src);
}

img.forEach(imgNode => {
    imgNode.addEventListener('click', popupImageModalHandler);
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}