// Funções globais
window.toggleMenu = function() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('active');
};

window.toggleDepoimento = function(element) {
  const item = element.parentElement;
  document.querySelectorAll('.depoimento-item').forEach(i => {
    if (i !== item) i.classList.remove('active');
  });
  item.classList.toggle('active');
};

// Inicialização do site
function initSite() {
  console.log('Inicializando site...');
  
  // Fechar menu mobile ao clicar em links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navLinks');
      if (menu) menu.classList.remove('active');
    });
  });

  // Formulário WhatsApp
  const form = document.getElementById('agendamentoForm');
  const telefoneInput = document.getElementById('telefone');
  
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      }
      e.target.value = value;
    });
  }
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const caso = document.getElementById('caso').value.trim();
      
      if (!nome || !email || !telefone) {
        alert('⚠️ Preencha todos os campos obrigatórios (*)');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('⚠️ E-mail inválido!');
        return;
      }
      
      let msg = '🦷 *AGENDAMENTO*%0A%0A';
      msg += '👤 *Nome:* ' + encodeURIComponent(nome) + '%0A';
      msg += '📧 *E-mail:* ' + encodeURIComponent(email) + '%0A';
      msg += '📱 *Telefone:* ' + encodeURIComponent(telefone) + '%0A';
      if (caso) msg += '%0A📋 *Caso:*%0A' + encodeURIComponent(caso) + '%0A';
      msg += '%0A_Aguardo retorno! 😊_';
      
      window.open('https://wa.me/5555996147772?text=' + msg, '_blank');
      
      const btn = document.getElementById('submitBtn');
      const texto = btn.textContent;
      btn.textContent = '✅ Abrindo...';
      btn.style.background = '#25D366';
      setTimeout(() => {
        form.reset();
        btn.textContent = texto;
        btn.style.background = '';
      }, 2000);
    });
  }

  // Verificar se Swiper está carregado
  if (typeof Swiper === 'undefined') {
    console.error('Swiper não carregado!');
    return;
  }

  console.log('Swiper carregado, inicializando carrosséis...');

  // Swiper Quem Somos
  try {
    new Swiper('.quemSomosSwiper', {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  } catch(e) { console.error('Erro Swiper Quem Somos:', e); }

  // Swiper Serviços
  try {
    new Swiper('.servicosSwiper', {
      loop: true,
      slidesPerView: 2.5,
      spaceBetween: 30,
      autoplay: { delay: 7000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        480: { slidesPerView: 1.5, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 2.5, spaceBetween: 25 },
        1400: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  } catch(e) { console.error('Erro Swiper Serviços:', e); }

  // Carregar e inicializar depoimentos
  fetch('data/testimonials.json')
    .then(r => r.json())
    .then(items => {
      const wrapper = document.querySelector('.testimonialsSwiper .swiper-wrapper');
      if (!wrapper) return;
      
      wrapper.innerHTML = '';
      items.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const shortText = t.text.length > 160 ? t.text.slice(0,160) + '...' : t.text;
        const hasMore = t.text.length > 160;
        const response = t.response ? `<div class="testimonial-response">Resposta: ${t.response}</div>` : '';
        
        slide.innerHTML = `<div class="testimonial-card">
          <p class="testimonial-quote">${shortText}</p>
          ${hasMore ? `<button class="read-more" data-full="${encodeURIComponent(t.text)}">Ler mais</button>` : ''}
          ${response}
          <div class="testimonial-meta">
            <div class="testimonial-author">
              <strong>${t.name}</strong>
              <div class="stars">${'⭐'.repeat(t.rating)}</div>
              <small>${t.date}</small>
            </div>
          </div>
        </div>`;
        wrapper.appendChild(slide);
      });

      new Swiper('.testimonialsSwiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: '.testimonials-pagination', clickable: true },
        navigation: { nextEl: '.testimonials-button-next', prevEl: '.testimonials-button-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
      });

      // Ler mais/menos
      document.addEventListener('click', (e) => {
        if (e.target.matches('.read-more')) {
          const btn = e.target;
          const p = btn.closest('.testimonial-card').querySelector('.testimonial-quote');
          const full = decodeURIComponent(btn.dataset.full);
          if (btn.classList.contains('expanded')) {
            p.textContent = full.slice(0,160) + '...';
            btn.textContent = 'Ler mais';
            btn.classList.remove('expanded');
          } else {
            p.textContent = full;
            btn.textContent = 'Ler menos';
            btn.classList.add('expanded');
          }
        }
      });
    })
    .catch(err => console.error('Erro depoimentos:', err));

  // Galeria Dra. Karina
  fetch('images/dra-karina/gallery.json')
    .then(r => r.json())
    .then(images => {
      const wrapper = document.querySelector('.draKarinaSwiper .swiper-wrapper');
      if (!wrapper) return;
      
      wrapper.innerHTML = '';
      images.forEach((item, i) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const basename = item.basename.replace(/\.[^.]+$/, '');
        const alt = item.alt || `Dra. Karina ${i+1}`;
        
        if (item.responsive) {
          slide.innerHTML = `<img 
            src="images/dra-karina/${basename}-800.jpg"
            srcset="images/dra-karina/${basename}-480.jpg 480w, 
                    images/dra-karina/${basename}-800.jpg 800w, 
                    images/dra-karina/${basename}-1200.jpg 1200w"
            sizes="(min-width:1200px) 33vw, (min-width:900px) 50vw, 100vw"
            alt="${alt}" loading="lazy">`;
        } else {
          slide.innerHTML = `<img src="images/dra-karina/${item.basename}" alt="${alt}" loading="lazy">`;
        }
        wrapper.appendChild(slide);
      });

      window.draSwiper = new Swiper('.draKarinaSwiper', {
        loop: true,
        autoplay: { delay: 7000, disableOnInteraction: false },
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 30,
        pagination: { el: '.dra-pagination', clickable: true },
        navigation: { nextEl: '.dra-button-next', prevEl: '.dra-button-prev' },
        breakpoints: {
          480: { slidesPerView: 1.5, slidesPerGroup: 2, spaceBetween: 15 },
          768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2.5, slidesPerGroup: 2, spaceBetween: 25 },
          1400: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 30 }
        }
      });
    })
    .catch(err => console.error('Erro galeria:', err));

  // Controles vídeo hero
  const video = document.getElementById('heroVideo');
  const toggle = document.querySelector('.hero-video-toggle');
  
  if (video && toggle) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      video.removeAttribute('autoplay');
      toggle.textContent = '▶';
    }
    
    toggle.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        toggle.textContent = '⏸';
      } else {
        video.pause();
        toggle.textContent = '▶';
      }
    });
  }

  console.log('Site inicializado com sucesso!');
}

// Executar quando pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
