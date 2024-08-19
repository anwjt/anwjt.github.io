let filesToSave = []; // Array to hold file URLs and names

document.getElementById('selectButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
        alert('Please select images first.');
        return;
    }
    document.getElementById('actionButtons').style.display = 'block';
});

document.getElementById('convertButton').addEventListener('click', function() {
    document.getElementById('conversionOptions').style.display = 'block';
    document.getElementById('compressionOptions').style.display = 'none';
});

document.getElementById('compressButton').addEventListener('click', function() {
    document.getElementById('compressionOptions').style.display = 'block';
    document.getElementById('conversionOptions').style.display = 'none';
});

document.getElementById('convertConfirmButton').addEventListener('click', function() {
    const files = document.getElementById('imageInput').files;
    const conversionType = document.getElementById('conversionType').value;

    if (files.length === 0 || !conversionType) return;

    filesToSave = []; // Clear previous files to save
    document.getElementById('convertResult').innerHTML = ''; // Clear previous results
    $('#convertModal').modal('show'); // Show the convert modal

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

                    // Append file info
                    document.getElementById('convertResult').innerHTML += `<p>File Name: ${fileName}</p><p>File Size: ${fileSize} MB</p>`;
                }, `image/${conversionType}`);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('conversionOptions').style.display = 'none'; // Hide options after conversion
});

document.getElementById('compressConfirmButton').addEventListener('click', async function() {
    const files = document.getElementById('imageInput').files;
    const maxSizeMB = parseFloat(document.getElementById('size').value);
    const quality = 0.8;

    if (files.length === 0 || isNaN(maxSizeMB)) return;

    filesToSave = []; // Clear previous files to save
    document.getElementById('compressResult').innerHTML = ''; // Clear previous results
    $('#compressModal').modal('show'); // Show the compress modal

    for (const file of files) {
        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: maxSizeMB,
                useWebWorker: true,
                maxWidthOrHeight: 1920,
                initialQuality: quality
            });

            const fileSize = (compressedFile.size / 1024 / 1024).toFixed(2);
            const fileName = `compressed-${file.name}`;

            // Append file info
            document.getElementById('compressResult').innerHTML += `<p>File Name: ${fileName}</p><p>File Size: ${fileSize} MB</p>`;

            // Add compressed file to filesToSave array
            filesToSave.push({ blob: compressedFile, fileName });
        } catch (error) {
            console.error('Compression failed:', error);
        }
    }

    document.getElementById('compressionOptions').style.display = 'none'; // Hide options after compression
});

function getDateString() {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
}

document.getElementById('saveAllButton').addEventListener('click', function() {
    if (filesToSave.length === 0) {
        alert('No files to save.');
        return;
    }

    const zip = new JSZip();
    filesToSave.forEach(file => {
        zip.file(file.fileName, file.blob);
    });

    const fileName = `Converse - ${getDateString()} (${filesToSave.length} files).zip`;

    zip.generateAsync({ type: 'blob' })
        .then(function(content) {
            saveAs(content, fileName);
        })
        .catch(function(err) {
            console.error('Error generating ZIP:', err);
        });
});

document.getElementById('saveCompressButton').addEventListener('click', function() {
    if (filesToSave.length === 0) {
        alert('No files to save.');
        return;
    }

    const zip = new JSZip();
    filesToSave.forEach(file => {
        zip.file(file.fileName, file.blob);
    });

    const fileName = `Reduce Files - ${getDateString()} (${filesToSave.length} files).zip`;

    zip.generateAsync({ type: 'blob' })
        .then(function(content) {
            saveAs(content, fileName);
        })
        .catch(function(err) {
            console.error('Error generating ZIP:', err);
        });
});

document.getElementById('convertClose').addEventListener('click', function() {
    document.getElementById('convertResult').innerHTML = ''; // Clear results when modal is closed
});

document.getElementById('compressClose').addEventListener('click', function() {
    document.getElementById('compressResult').innerHTML = ''; // Clear results when modal is closed
});
