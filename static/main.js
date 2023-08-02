function updateDisplayedImages(selectedUmpire) {
  $('#plotContainer').empty();
  const imageNames = ['edge_calls.png', 'heat_maps.png', 'total.png']; // Image filenames
  for (const imageName of imageNames) {
    const imagePath = `UmpireReports/${selectedUmpire}/${imageName}`;
    const imgElement = $('<img>').attr('src', imagePath);
    $('#plotContainer').append(imgElement);
  }
}

$(document).ready(function () {
  // Fetch the list of umpires from the server-side route
  $.get('/umpires', function (data) {
    const umpires = data.umpires;
    const umpireSelect = $('#umpireSelect');

    // Generate options for umpires in the dropdown
    umpires.forEach((umpire) => {
      const option = $('<option>').val(umpire).text(umpire);
      umpireSelect.append(option);
    });

    // Handle dropdown selection change
    umpireSelect.change(function () {
      const selectedUmpire = $(this).val();
      updateDisplayedImages(selectedUmpire);
    });

    updateDisplayedImages(umpireSelect.val());
  });
});


$(document).ready(function () {
        // Function to update the image when the dropdown selection changes
        function updateImage() {
            var selectedPitcher = $("#pitcherSelect").val();
            var imagePath = "/static/Usages/" + selectedPitcher + ".png";
            $("#pitcherImage").attr("src", imagePath);
        }

        // Call the updateImage function initially to set the image based on the first option
        updateImage();

        // Listen for changes to the dropdown selection
        $("#pitcherSelect").change(function () {
            updateImage();
        });
    });

$(document).ready(function () {
        // Function to update the image when the dropdown selection changes
        function updateImageCatcher() {
            var selectedCatcher = $("#catcherSelect").val();
            var imagePath = "/static/CatcherReports/" + selectedCatcher + ".png";
            $("#catcherImage").attr("src", imagePath);
        }

        // Call the updateImage function initially to set the image based on the first option
        updateImageCatcher();

        // Listen for changes to the dropdown selection
        $("#catcherSelect").change(function () {
            updateImageCatcher();
        });
    });