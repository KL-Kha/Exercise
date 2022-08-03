
document.addEventListener("DOMContentLoaded", function(event) { 
    const btnGroup = document.querySelector(".work-header-btn-group");
    const btnList = btnGroup.querySelectorAll("button.btn.btn-primary");
    const workDetailWrapper = document.querySelector(".work-detail-wrapper");
    let currentBtnActive = btnList[0];

    // const projects = [
    //     { 
    //         dataProjectType: "",
    //         dataAos: "zoom-in-left", 
    //         dataAosDuration: "2000",
    //         isWhiteColor: false,
    //         h4WorkHeading: "",
    //         h1WorkHeading: "",
    //     }
    // ];

    btnList.forEach( (btn) => {
        btn.addEventListener("click", (e) => {
            // If clicked button not contain class active that mean it not the current 
            if ( !e.target.classList.contains("active") ){
                currentBtnActive.classList.remove("active");
                currentBtnActive = e.target;
                e.target.classList.add("active");
                
                const btnDataType = currentBtnActive.getAttribute('data-project-type');

                const workDetails = workDetailWrapper.querySelectorAll('.work-detail');

                workDetails.forEach( workDetail => {
                    const workDetailType = workDetail.getAttribute('data-project-type');

                    if ( btnDataType === "ALL") {
                        workDetail.classList.remove('d-none');
                        return;
                    };

                    if ( btnDataType === workDetailType) {
                        workDetail.classList.remove('d-none');
                    } else {
                        workDetail.classList.add('d-none');
                    };
                });
            };    
        })
    });
});