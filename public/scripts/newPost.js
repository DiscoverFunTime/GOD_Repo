$(document).ready(() => {
    console.log('Sanity check!');
    var $takePicture = $("#take-picture"),
        $showPicture = $("#show-picture");

    console.log($takePicture, $showPicture);

    if ($takePicture && $showPicture) {
        // Set events
        $takePicture.change(function (event) {
            // Get a reference to the taken picture or chosen file
            console.log('')
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    $showPicture.attr("src", imgURL).attr("data-caman-hidpi", imgURL);

                    // Resize to something small for now
                    Caman.DEBUG = ('console' in window);
                    Caman("#show-picture", function () {
                      this.brightness(25).render();
                    });

                    // Make preview visible
                    $(".preview").css("display", "");

                    // Revoke ObjectURL after image has loaded
                    $showPicture.on("load", function() {
                        URL.revokeObjectURL(imgURL);  
                    });
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            $showPicture.attr("src", event.target.result);
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        // Display error message
                        var $error = $("#error");
                        if ($error) {
                            $error.html("Neither createObjectURL or FileReader are supported");
                        }
                    }
                }
            }
        });
    }
});
