const templateSelect = document.getElementById('templateSelect');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const uploadedImages = []; // Store uploaded images for processing
const generatedCanvases = []; // Store generated canvases for downloading

// Fetch Templates and Notifications from the Server
window.onload = async () => {
    const response = await fetch('get_templates.php');
    const templates = await response.json();

    // Fetch notifications from the Server
    const notificationResponse = await fetch('get_notifications.php');
    const notifications = await notificationResponse.json();

    // Show notifications as popups
    notifications.forEach(notification => {
        showNotificationPopup(notification.notification_image_path, notification.notification_text);
    });

    templates.forEach(template => {
        const option = document.createElement('option');
        option.value = template.template_file_path;
        option.text = template.template_name;
        templateSelect.appendChild(option);
    });
};

// Handle Image Upload and Store for Later Processing
document.getElementById('photoInput').addEventListener('change', (e) => {
    const files = e.target.files;
    uploadedImages.length = 0; // Clear previous uploads
    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (event) {
                uploadedImages.push(event.target.result); // Store image data
            };
            reader.readAsDataURL(file);
        });
    }
});

// Generate Thumbnails After Clicking the Generate Button
function generateThumbnails() {
    thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
    generatedCanvases.length = 0; // Clear previous canvases
    const selectedText = document.getElementById('textSelect').value; // Get the selected text
    const selectedFont = document.getElementById('fontSelect').value; // Get the selected font

    uploadedImages.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Crop image to square first (crop larger side)
            const minSize = Math.min(img.width, img.height);
            const startX = (img.width - minSize) / 2;
            const startY = (img.height - minSize) / 2;

            // Resize canvas to 1200x1200px
            canvas.width = 1200;
            canvas.height = 1200;

            // Draw cropped and resized image onto canvas
            ctx.drawImage(img, startX, startY, minSize, minSize, 0, 0, canvas.width, canvas.height);

            // Apply Template if selected
            applyTemplateToCanvas(canvas, selectedText, selectedFont);
        };
        img.onerror = () => {
            console.error('Error loading image:', imageSrc);
        };
    });
}

// Apply Template to the Canvas
function applyTemplateToCanvas(canvas, selectedText, selectedFont) {
    const templatePath = templateSelect.value; // Ensure this gets the correct template path
    const ctx = canvas.getContext('2d');

    // Set font properties
    ctx.font = `40px ${selectedFont}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    const templateImage = new Image();
    templateImage.src = templatePath;
    templateImage.onload = () => {
        ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height); // Draw the template

        // Draw the selected text on the image
        ctx.fillStyle = document.getElementById('textColorInput').value;
        ctx.fillText(selectedText, 50, 100); // You can adjust the position as needed

        // Create a thumbnail card
        createThumbnailCard(canvas.toDataURL());
    };
    
    templateImage.onerror = () => {
        console.error('Error loading template image:', templatePath);
    };
}

// Create Thumbnail Card
function createThumbnailCard(imageData) {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = imageData;
    img.onclick = () => showPreview(imageData);
    card.appendChild(img);
    thumbnailContainer.appendChild(card);
    generatedCanvases.push(imageData); // Store canvas data for downloading
}

// Show Image Preview
function showPreview(imageData) {
    const modalImage = document.getElementById('modalImage'); // Ensure you reference the correct ID
    modalImage.src = imageData; // Set the source to the image data

    // Set the click event for the download button
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.onclick = () => {
        downloadImage(imageData);
    };

    $('#imagePreviewModal').modal('show'); // Show the modal
}

// Clear Uploaded Photos
function clearPhotos() {
    document.getElementById('photoInput').value = '';
    uploadedImages.length = 0; // Clear stored images
    thumbnailContainer.innerHTML = ''; // Clear thumbnail display
}

// Function to Download Single Image
function downloadImage(imageData) {
    const link = document.createElement('a');
    link.href = imageData; // Set the href to the image data
    link.download = 'edited_image.png'; // Name for the downloaded file
    document.body.appendChild(link); // Append to body (not visible)
    link.click(); // Trigger download
    document.body.removeChild(link); // Remove link from document
}

// Download All Generated Photos
function downloadAllPhotos() {
    if (generatedCanvases.length === 0) {
        alert("No photos to download! Please generate images first.");
        return; // Exit the function if there are no generated images
    }

    const zip = new JSZip();
    const folder = zip.folder("edited_photos");

    generatedCanvases.forEach((canvasData, index) => {
        const imgData = canvasData.split(',')[1]; // Get base64 data
        folder.file(`photo_${index + 1}.png`, imgData, { base64: true });
    });

    // Generate the zip file and handle the download
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "edited_photos.zip");
        })
        .catch(function (error) {
            console.error("Error generating zip file:", error);
            alert("An error occurred while creating the zip file. Please try again.");
        });
}

// Show Notification Popup
function showNotificationPopup(imagePath, text) {
    const notificationModal = document.createElement('div');
    notificationModal.className = 'modal fade notification-modal'; // Add notification-modal class
    notificationModal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <img src="${imagePath}" alt="Notification" class="img-fluid">
                    <p>${text}</p>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>`;
    document.body.appendChild(notificationModal);
    $(notificationModal).modal('show');
    $(notificationModal).on('hidden.bs.modal', function () {
        $(this).remove(); // Clean up after the modal is closed
    });
}
