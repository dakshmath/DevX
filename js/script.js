// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change the icon based on menu state
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Form validation for the request form
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', function(event) {
            let valid = true;
            
            // Basic validation for required fields
            const requiredFields = requestForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            // Phone validation
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^[0-9\-\+\(\)\s]{10,15}$/;
                if (!phonePattern.test(phoneField.value)) {
                    valid = false;
                    phoneField.classList.add('error');
                }
            }
            
            // If the form is not valid, prevent submission
            if (!valid) {
                event.preventDefault();
                
                // Scroll to the first error
                const firstError = requestForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
            // Allow form to submit to FormSubmit if validation passes
        });
        
        // File upload preview
        const fileUpload = document.getElementById('file-upload');
        const fileText = document.getElementById('file-upload-text');
        
        if (fileUpload && fileText) {
            fileUpload.addEventListener('change', function() {
                if (fileUpload.files.length > 0) {
                    let fileNames = '';
                    for (let i = 0; i < fileUpload.files.length; i++) {
                        fileNames += fileUpload.files[i].name;
                        if (i < fileUpload.files.length - 1) {
                            fileNames += ', ';
                        }
                    }
                    fileText.textContent = fileNames;
                } else {
                    fileText.textContent = 'No files selected';
                }
            });
        }
        
        // Real-time validation feedback
        const inputFields = requestForm.querySelectorAll('input, textarea, select');
        inputFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Real-time email validation
                if (field.id === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                }
            });
        });
    }
});