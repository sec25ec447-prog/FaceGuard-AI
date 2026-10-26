/* =================================
   FACEGUARD AI - WEBSITE FUNCTIONS
================================= */

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const checkButton = document.getElementById("checkButton");
const statusMessage = document.getElementById("status");

let previewUrl = null;

// Check that all required HTML elements exist.
if (imageInput && preview && checkButton && statusMessage) {

    // Handle image selection.
    imageInput.addEventListener("change", function () {

        const file = imageInput.files[0];

        statusMessage.textContent = "";
        checkButton.disabled = true;

        // Release the previous temporary image URL.
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        if (!file) {
            preview.style.display = "none";
            preview.removeAttribute("src");
            return;
        }

        // Validate the selected file type.
        if (!file.type.startsWith("image/")) {

            imageInput.value = "";
            preview.style.display = "none";

            statusMessage.textContent =
                "Please select a valid image file.";

            return;
        }

        // Display a local image preview.
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        preview.style.display = "block";

        checkButton.disabled = false;

        statusMessage.textContent =
            "Image selected successfully. The image stays in your browser.";
    });

    // Demonstrate the consent workflow.
    checkButton.addEventListener("click", function () {

        if (!imageInput.files.length) {
            statusMessage.textContent =
                "Please select an image first.";
            return;
        }

        statusMessage.textContent =
            "DEMO: No facial recognition was performed. " +
            "No identity was verified, and no consent request was sent.";
    });

    // Clean up the temporary image preview URL.
    window.addEventListener("beforeunload", function () {

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    });

} else {

    console.error(
        "FaceGuard AI: Required HTML elements are missing. " +
        "Check index.html."
    );
}
