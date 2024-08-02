document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Typed.js
    var typed = new Typed('#typed-text', {
        strings: ['a Developer a little bit. ><', 'a Graphic Design.', 'a Content Creator.'],
        typeSpeed: 60,
        backSpeed: 60,
        loop: true
    });

    // Toggle dark mode
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = modeToggle.querySelector('i');
        icon.classList.toggle('fa-moon-o');
        icon.classList.toggle('fa-sun-o');
    });

    // Save profile information as PDF
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Profile content
        const profileContent = document.getElementById('profile-content').innerHTML;

        // Add content to PDF
        doc.fromHTML(profileContent, 10, 10, {
            'width': 180
        });

        // Save the PDF
        doc.save('profile.pdf');
    });
});

document.getElementById('save-btn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance with A4 dimensions
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4' // A4 dimensions (210 x 297 mm)
    });

    // Select the content to be exported
    const element = document.querySelector('#profileModal .modal-content');

    // Convert the selected content to PDF
    doc.html(element, {
        callback: function (pdf) {
            pdf.save('profile-information.pdf'); // Save the PDF with a filename
        },
        x: 10,
        y: 10
    });
});