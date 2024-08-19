// Initialize filesToSave array to store file blobs and names
let filesToSave = [];

// Handle file selection
document.getElementById('selectButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
        alert('Please select images first.');
        return;
    }
    document.getElementById('actionButtons').style.display = 'block';
});

// Show conversion options modal
document.getElementById('convertButton').addEventListener('click', function() {
    document.getElementById('conversionType').value = ''; // Reset conversion type
    document.getElementById('conversionOptions').style.display = 'block';
    document.getElementById('compressionOptions').style.display = 'none';
    document.getElementById('convertModal').style.display = 'block'; // Show convert modal
});

// Show compression options modal
document.getElementById('compressButton').addEventListener('click', function() {
    document.getElementById('size').value = ''; // Reset file size
    document.getElementById('compressionOptions').style.display = 'block';
    document.getElementById('conversionOptions').style.display = 'none';
    document.getElementById('compressModal').style.display = 'block'; // Show compress modal
});

// Function to update progress bar
function updateProgressBar(progressElement, percentage) {
    progressElement.style.width = `${percentage}%`;
    progressElement.innerText = `${percentage}%`;
}

// Handle image conversion
document.getElementById('convertConfirmButton').addEventListener('click', function() {
    const files = document.getElementById('imageInput').files;
    const conversionType = document.getElementById('conversionType').value;

    if (files.length === 0 || !conversionType) return;

    filesToSave = []; // Clear previous files to save
    document.getElementById('convertResult').innerHTML = ''; // Clear previous results
    document.getElementById('convertModal').style.display = 'block'; // Show the convert modal

    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    const fileSize = (blob.size / 1024 / 1024).toFixed(2);
                    const fileName = `converted-${file.name.split('.')[0]}.${conversionType}`;
                    
                    // Add file blob to filesToSave array
                    filesToSave.push({ blob, fileName });

                    document.getElementById('convertResult').innerHTML += `<p>File Name: ${fileName}</p><p>File Size: ${fileSize} MB</p><br>`;
                }, `image/${conversionType}`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('conversionOptions').style.display = 'none'; // Hide options after conversion
});

// Handle image compression
document.getElementById('compressConfirmButton').addEventListener('click', async function() {
    const files = document.getElementById('imageInput').files;
    const maxSizeMB = parseFloat(document.getElementById('size').value);
    const quality = 0.8;

    if (files.length === 0 || isNaN(maxSizeMB)) return;

    filesToSave = []; // Clear previous files to save
    document.getElementById('compressResult').innerHTML = ''; // Clear previous results
    document.getElementById('compressModal').style.display = 'block'; // Show the compress modal

    Array.from(files).forEach(async (file) => {
        try {
            const progressElement = document.createElement('div');
            progressElement.classList.add('progress-bar');
            const progressText = document.createElement('span');
            progressElement.appendChild(progressText);
            document.getElementById('compressResult').appendChild(progressElement);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress > 100) {
                    clearInterval(interval);
                    progress = 100;
                }
                updateProgressBar(progressText, progress);
            }, 100);

            const compressedFile = await imageCompression(file, {
                maxSizeMB: maxSizeMB,
                useWebWorker: true,
                maxWidthOrHeight: 1920,
                initialQuality: quality
            });

            const fileSize = (compressedFile.size / 1024 / 1024).toFixed(2);
            const fileName = `compressed-${file.name}`;
            
            // Add compressed file to filesToSave array
            filesToSave.push({ blob: compressedFile, fileName });

            document.getElementById('compressResult').innerHTML += `<p>File Name: ${fileName}</p><p>File Size: ${fileSize} MB</p><br>`;
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    });

    document.getElementById('compressionOptions').style.display = 'none'; // Hide options after compression
});

// Function to generate a unique file name based on the operation type
function generateZipFileName(operationType, numFiles) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}`;
    
    let operationSuffix;
    if (operationType === 'convert') {
        operationSuffix = 'Convert';
    } else if (operationType === 'compress') {
        operationSuffix = 'Reduce File Size';
    } else {
        operationSuffix = 'Unknown';
    }
    
    return `${operationSuffix}-${timestamp}-${numFiles}files.zip`;
}

// Function to save files as a ZIP
async function saveAsZip(operationType) {
    const zip = new JSZip();
    filesToSave.forEach(({ blob, fileName }) => {
        zip.file(fileName, blob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);

    const numFiles = filesToSave.length; // Get the number of files
    const fileName = generateZipFileName(operationType, numFiles); // Generate unique file name with operation type

    const a = document.createElement('a');
    a.href = zipUrl;
    a.download = fileName; // Use the unique file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up
    URL.revokeObjectURL(zipUrl);
}

// Event listener for the save button in conversion modal
document.getElementById('convertSaveAllButton').addEventListener('click', function() {
    if (filesToSave.length > 0) {
        saveAsZip('convert');
    } else {
        alert('No files available to save.');
    }
});

// Event listener for the save button in compression modal
document.getElementById('compressSaveAllButton').addEventListener('click', function() {
    if (filesToSave.length > 0) {
        saveAsZip('compress');
    } else {
        alert('No files available to save.');
    }
});

// Close modals when clicking on (x)
document.getElementById('convertClose').addEventListener('click', function() {
    document.getElementById('convertModal').style.display = 'none';
});

document.getElementById('compressClose').addEventListener('click', function() {
    document.getElementById('compressModal').style.display = 'none';
});

// Close modals when clicking outside of modal
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});