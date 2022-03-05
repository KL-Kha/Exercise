// Click to download file
$(document).on("click", "div .custom-file-item", function() {
    if ($(this).attr("href") != undefined) {

        //Download file
        let href = $(this).attr("href");
        var link = document.createElement('a');
        link.href = href;
        link.download = href.substring(href.lastIndexOf("/") + 1);
        link.dispatchEvent(new MouseEvent('click'));

        // Mở file
        // window.location.href = $(this).attr("href");
    }
})

// File extension
const extension_icons = {
    // image
    'jpg': 'fa-file-image',
    'png': 'fa-file-image',
    'bmp': 'fa-file-image',
    'gif': 'fa-file-image'
}


// List file - thêm files
$(document).on("change", "#image-uploaded", function() {
    if ($("#image-uploaded")[0].files.length < 1) {
        return;
    }

    if ($("#file-placeholder") != null) {
        $("#file-placeholder").hide();
    }

    files = [];
    // Lấy data files
    if ($("#image-uploaded").data("files") != null) {
        files = $("#image-uploaded").data("files");
    }

    for (let i = 0; i < $("#image-uploaded")[0].files.length; i++) {
        let file = $("#image-uploaded")[0].files[i];

        if (checkFileList(files, file) > -1) {
            continue;
        }

        if (file.size > 1024 * 1024 * 16) {
            alert("Vui lòng các chọn tập tin nhỏ hơn 16MB")
            $("#image-uploaded").data("files", files);
            return;
        }

        let ext = file.name.split(".").at(-1).toLowerCase();
        if (extension_icons[ext] == undefined) {
            alert("Hệ thống không hỗ trợ upload tệp tin đuôi ." + ext);
            return;
        }

        // Lưu data
        files.push(file)

        // Update UI
        var item = document.createElement("div");
        item.classList.add("custom-file-item");


        var title = document.createElement("div");
        title.classList.add("custom-file-title");

        // Tạo icon từ file extension

        var icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add(extension_icons[ext]);

        // Tên file
        filename = document.createElement("span");
        filename.innerHTML = file.name;

        type = document.createElement("p")
        type.innerHTML = file.type;
        title.appendChild(filename);
        title.appendChild(type);
        var remove = document.createElement("i");
        remove.classList.add("fas");
        remove.classList.add("fa-minus-circle");
        remove.classList.add("custom-file-remove");
        $(remove).data("file", file);
        item.appendChild(icon);
        item.appendChild(title);
        item.appendChild(remove);

        $("#custom-file-list").append(item);
    }
    $("#image-uploaded").data("files", files);
})

// bỏ chọn file
$(document).on("click", ".custom-file-remove", function() {
    var file = $(this).data("file");
    $(this).parent().remove();
    files = $("#image-uploaded").data("files");
    files.splice(checkFileList(files, file), 1)

    if (files.length < 1) {
        $("#file-placeholder").show();
    }

    $("#image-uploaded").data("files", files);
})

function checkFileList(files, file) {
    for (let i = 0; i < files.length; i++) {
        if (files[i].name == file.name && files[i].size == file.size && files[i].type == file.type) {
            return i;
        }
    }
    return -1;
}