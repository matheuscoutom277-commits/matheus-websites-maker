// Seleciona o botão e os elementos de texto/ícone
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = document.getElementById('theme-text');

// 1. Verifica se o utilizador já tinha o modo escuro ativado anteriormente
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    if (themeText) themeText.textContent = 'Modo Claro';
}

// 2. Evento de clique para alternar o tema
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Verifica se ficou no modo escuro
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        if (themeText) themeText.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark'); // Guarda no navegador
    } else {
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        if (themeText) themeText.textContent = 'Modo Escuro';
        localStorage.setItem('theme', 'light'); // Guarda no navegador
    }
});
// Lógica da Calculadora Interativa de Preços
const calcTipo = document.getElementById('calc-tipo');
const calcLogo = document.getElementById('calc-logo');
const calcSeo = document.getElementById('calc-seo');
const calcTotal = document.getElementById('calc-total');
const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

function atualizarCalculadora() {
    if (!calcTipo) return;
    
    let total = parseInt(calcTipo.value);
    let descricaoExtras = [];

    if (calcLogo && calcLogo.checked) {
        total += parseInt(calcLogo.value);
        descricaoExtras.push("com Logotipo");
    }
    if (calcSeo && calcSeo.checked) {
        total += parseInt(calcSeo.value);
        descricaoExtras.push("com SEO Avançado");
    }

    calcTotal.textContent = `R$ ${total}`;

    // Atualiza o link do botão do WhatsApp dinamicamente com o orçamento montado
    const textoTipo = calcTipo.options[calcTipo.selectedIndex].text;
    const extrasTexto = descricaoExtras.length > 0 ? ` (${descricaoExtras.join(', ')})` : '';
    const mensagem = `Opa Matheus! Simulei um orçamento no seu site: ${textoTipo}${extrasTexto} por R$ ${total}. Quero fechar negócio!`;
    
    if (calcWhatsappBtn) {
        calcWhatsappBtn.href = `https://wa.me/14998496505?text=${encodeURIComponent(mensagem)}`;
    }
}

if (calcTipo) {
    calcTipo.addEventListener('change', atualizarCalculadora);
    if (calcLogo) calcLogo.addEventListener('change', atualizarCalculadora);
    if (calcSeo) calcSeo.addEventListener('change', atualizarCalculadora);
    
    // Executa ao carregar a página
    atualizarCalculadora();
}
const textoElemento = document.getElementById('typing');
const palavras = ['Desenvolvedor Front-End', 'Criador de Landing Pages', 'Especialista em Sites Rápidos'];
let palavraIndex = 0;
let charIndex = 0;
let isDeleting = false;

function efeitodeDigitacao() {
    const atual = palavras[palavraIndex];
    
    if (isDeleting) {
        textoElemento.textContent = atual.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textoElemento.textContent = atual.substring(0, charIndex + 1);
        charIndex++;
    }

    let velocidade = 100;

    if (!isDeleting && charIndex === atual.length) {
        velocidade = 2000; // Pausa de 2 segundos antes de começar a apagar
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        palavraIndex = (palavraIndex + 1) % palavras.length;
        velocidade = 500;
    }

    setTimeout(efeitodeDigitacao, velocidade);
}

// Inicia o efeito assim que a página carregar
document.addEventListener('DOMContentLoaded', efeitodeDigitacao);
const observer = new IntersectionObserver((entries) => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
        entry.target.classList.add('show');
    });
});

// Seleciona todas as seções que queres animar
const hiddenElements = document.querySelectorAll('section');
hiddenElements.forEach((el) => {
    el.classList.add('hidden-section'); // Classe inicial escondida
    observer.observe(el);
});
function mostrarAviso(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast-aviso';
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}
const perguntas = document.querySelectorAll('.faq-pergunta');

perguntas.forEach((pergunta) => {
    pergunta.addEventListener('click', () => {
        const resposta = pergunta.nextElementSibling; // Apanha a div .faq-resposta logo a seguir
        resposta.classList.toggle('ativa');
    });
});