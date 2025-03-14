// Primeiro, inclua a biblioteca EmailJS no seu HTML
// Adicione isso no seu <head>
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Inicialize o EmailJS com seu User ID
// Substitua "YOUR_USER_ID" pelo seu ID do EmailJS após criar uma conta
(function() {
    emailjs.init("SPI7MSQY9c-ziO9JZ");
})();

// Função para enviar o email
function sendEmail(e) {
    e.preventDefault();
    
    // Mostrar indicador de carregamento
    const button = document.querySelector('.form__botao');
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Enviando...</span>';
    button.disabled = true;
    
    // Obter os valores do formulário
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('assunto').value;
    const message = document.getElementById('mensagem').value;
    
    // Preparar o objeto com os dados do template
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };
    
    // Enviar o email usando EmailJS
    // Substitua "YOUR_SERVICE_ID" e "YOUR_TEMPLATE_ID" pelos seus IDs do EmailJS
    emailjs.send("service_l0dugds", "template_wzq0brv", templateParams)
        .then(function(response) {
            console.log('Email enviado!', response.status, response.text);
            
            // Exibir mensagem de sucesso
            showMessage('Mensagem enviada com sucesso!', 'success');
            
            // Limpar o formulário
            document.querySelector('form').reset();
            
            // Restaurar o botão
            button.innerHTML = originalText;
            button.disabled = false;
        }, function(error) {
            console.log('Erro:', error);
            
            // Exibir mensagem de erro
            showMessage('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', 'error');
            
            // Restaurar o botão
            button.innerHTML = originalText;
            button.disabled = false;
        });
}

// Função para mostrar mensagens de sucesso/erro
function showMessage(message, type) {
    // Criar o elemento de mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `form__message form__message--${type}`;
    messageDiv.textContent = message;
    
    // Inserir antes do botão de enviar
    const form = document.querySelector('form');
    form.insertBefore(messageDiv, document.querySelector('.form__botao'));
    
    // Remover após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Adicionar evento de envio do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', sendEmail);
});



// Função para adicionar o menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de menu hamburguer
    const header = document.querySelector('.cabecalho');
    const nav = document.querySelector('.navegacao');
    
    // Criar e adicionar o botão hamburger
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    header.appendChild(menuToggle);
    
    // Adicionar botão de fechar ao menu
    const closeButton = document.createElement('div');
    closeButton.classList.add('menu-close');
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;
    nav.appendChild(closeButton);
    
    // Eventos para abrir e fechar o menu
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    closeButton.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navegacao a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
        }
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});