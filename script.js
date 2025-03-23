document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Reset errors
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const avatar = document.getElementById('avatar').files[0];

    // Validation
    let isValid = true;

    if (!fullName) {
        document.getElementById('fullNameError').textContent = 'Nome completo é obrigatório.';
        isValid = false;
    }

    if (!email || !email.includes('@')) {
        document.getElementById('emailError').textContent = 'E-mail inválido.';
        isValid = false;
    }

    if (!company) {
        document.getElementById('companyError').textContent = 'Empresa é obrigatória.';
        isValid = false;
    }

    if (!jobTitle) {
        document.getElementById('jobTitleError').textContent = 'Cargo é obrigatório.';
        isValid = false;
    }

    if (!avatar) {
        document.getElementById('avatarError').textContent = 'Avatar é obrigatório.';
        isValid = false;
    } else if (avatar.size > 2000000) { // 2MB limit
        document.getElementById('avatarError').textContent = 'Avatar muito grande (máximo 2MB).';
        isValid = false;
    } else if (!['image/jpeg', 'image/png'].includes(avatar.type)) {
        document.getElementById('avatarError').textContent = 'Formato de avatar inválido (JPEG ou PNG).';
        isValid = false;
    }

    if (isValid) {
        // Generate ticket
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('ticket').innerHTML = `
                <h2>Bilhete de Conferência</h2>
                <img src="${e.target.result}" alt="Avatar" style="width: 100px; height: 100px;">
                <p><strong>Nome:</strong> ${fullName}</p>
                <p><strong>Empresa:</strong> ${company}</p>
                <p><strong>Cargo:</strong> ${jobTitle}</p>
            `;
        };
        reader.readAsDataURL(avatar);
    }
});