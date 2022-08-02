
document.addEventListener("DOMContentLoaded", function(event) { 
    const btnGroup = document.querySelector(".work-header-btn-group");
    const btnList = btnGroup.querySelectorAll("button.btn.btn-primary");
    const workDetailWrapper = document.querySelector(".work-detail-wrapper");
    let currentBtnActive = btnList[0];

    btnList.forEach( (btn) => {
        btn.addEventListener("click", (e) => {
            if ( !e.target.classList.contains("active") ){
                currentBtnActive.classList.remove("active");
                currentBtnActive = e.target;
                e.target.classList.add("active");
            }

            if ( e.target.innerHTML === "SIDE PROJECT" ){
                workDetailWrapper.classList.add('d-none');
            } else {
                workDetailWrapper.classList.remove('d-none');
            }
        })
    });
});