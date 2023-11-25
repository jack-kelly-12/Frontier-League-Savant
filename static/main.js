$(document).ready(function () {
    function updateImage() {
        var selectedPitcher = $("#pitcherSelect").val();
        var imagePath = "/static/Usages/" + selectedPitcher + ".png";
        $("#pitcherImage").attr("src", imagePath);
    }

    updateImage();

    $("#pitcherSelect").change(function () {
        updateImage();
    });
});