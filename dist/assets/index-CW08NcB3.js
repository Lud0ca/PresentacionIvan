(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`Lud0ca`,t=`https://api.github.com/users/${e}/repos?per_page=100&sort=updated`,n=document.querySelector(`#app`);if(!n)throw Error(`No se encontró el contenedor principal.`);n.innerHTML=`
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Ir al inicio"><span>LI</span> ludwing.dev</a>
    <nav aria-label="Navegación principal">
      <a href="#proyectos">Proyectos</a>
      <a href="#sobre-mi">Sobre mí</a>
      <a class="nav-cta" href="https://github.com/${e}" target="_blank" rel="noreferrer">GitHub ↗</a>
    </nav>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="hero-copy">
        <p class="eyebrow"><span class="pulse"></span> Disponible para crear</p>
        <h1>Ideas que se<br><em>convierten</em> en código.</h1>
        <p class="hero-text">Soy Ludwing Ivan, desarrollador en formación. Exploro la web creando proyectos útiles, aprendiendo nuevas tecnologías y compartiendo el proceso.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#proyectos">Ver mis proyectos <span>↓</span></a>
          <a class="text-link" href="https://github.com/${e}" target="_blank" rel="noreferrer">Visitar GitHub <span>↗</span></a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="code-card">
          <div class="window-dots"><i></i><i></i><i></i></div>
          <div class="code-lines">
            <p><b>const</b> <span>ideas</span> = [</p>
            <p class="indent"><span class="string">'curiosidad'</span>,</p>
            <p class="indent"><span class="string">'constancia'</span>,</p>
            <p class="indent"><span class="string">'código'</span></p>
            <p>];</p>
            <p class="comment">// construyendo el futuro</p>
          </div>
        </div>
        <span class="floating-tag tag-js">JS</span>
        <span class="floating-tag tag-ts">TS</span>
      </div>
    </section>

    <section class="projects-section" id="proyectos">
      <div class="section-heading">
        <div>
          <p class="eyebrow">01 / Proyectos seleccionados</p>
          <h2>Lo que estoy <em>construyendo</em></h2>
        </div>
        <p class="section-note">Una selección actualizada directamente desde mi perfil de GitHub.</p>
      </div>
      <div class="toolbar">
        <!-- Filtros reservados para agregarlos individualmente más adelante.
        <div class="filters" role="group" aria-label="Filtrar proyectos">
          <button class="filter active" data-filter="all">Todos</button>
          <button class="filter" data-filter="JavaScript">JavaScript</button>
          <button class="filter" data-filter="TypeScript">TypeScript</button>
          <button class="filter" data-filter="HTML">HTML</button>
        </div> -->
        <label class="search-label">Buscar <input id="search" type="search" placeholder="Nombre del proyecto..." /></label>
      </div>
      <div id="projects-grid" class="projects-grid" aria-live="polite">
        <div class="loading-state"><span class="loader"></span> Cargando proyectos de GitHub...</div>
      </div>
    </section>

    <section class="about-section" id="sobre-mi">
      <div class="about-number">02</div>
      <div>
        <p class="eyebrow">Un poco sobre mí</p>
        <h2>Aprender haciendo.<br><em>Crecer compartiendo.</em></h2>
        <p class="about-text">Cada repositorio es una oportunidad para resolver problemas reales, experimentar con ideas nuevas y mejorar un poco más. Este portafolio se actualiza automáticamente con mis proyectos públicos.</p>
        <a class="text-link" href="https://github.com/${e}?tab=repositories" target="_blank" rel="noreferrer">Explorar todos los repositorios <span>↗</span></a>
      </div>
      <div class="stats">
        <div><strong id="repo-count">—</strong><span>repositorios</span></div>
        <div><strong id="language-count">—</strong><span>lenguajes</span></div>
      </div>
    </section>
  </main>

  <footer>
    <span>© ${new Date().getFullYear()} Ludwing Ivan</span>
    <span>Hecho con <b>TypeScript</b> & curiosidad</span>
  </footer>
`;var r=document.querySelector(`#projects-grid`),i=document.querySelector(`#search`),a=document.querySelector(`#repo-count`),o=document.querySelector(`#language-count`),s=[],c=`all`;function l(e){let t=e.language??`Código`,n=e.description??`Explora este proyecto en GitHub para conocer más detalles.`,r=e.topics.slice(0,2).map(e=>`<span>${e}</span>`).join(``);return`
    <article class="project-card">
      <div class="card-top"><span class="project-icon">&lt;/&gt;</span><span class="arrow">↗</span></div>
      <p class="project-language">${t}</p>
      <h3>${e.name}</h3>
      <p class="project-description">${n}</p>
      <div class="card-bottom"><div class="topics">${r}</div><a href="${e.html_url}" target="_blank" rel="noreferrer" aria-label="Ver ${e.name} en GitHub">Ver proyecto</a></div>
    </article>
  `}function u(){let e=i.value.trim().toLowerCase(),t=s.filter(t=>{let n=c===`all`||t.language===c,r=`${t.name} ${t.description??``}`.toLowerCase().includes(e);return n&&r});r.innerHTML=t.length?t.map(l).join(``):`<div class="empty-state">No hay proyectos que coincidan con esta búsqueda.</div>`}document.querySelectorAll(`.filter`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelector(`.filter.active`)?.classList.remove(`active`),e.classList.add(`active`),c=e.dataset.filter??`all`,u()})}),i.addEventListener(`input`,u);async function d(){try{let e=await fetch(t);if(!e.ok)throw Error(`GitHub respondió con ${e.status}`);s=(await e.json()).filter(e=>!e.fork),a.textContent=String(s.length).padStart(2,`0`),o.textContent=String(new Set(s.map(e=>e.language).filter(Boolean)).size).padStart(2,`0`),u()}catch(t){console.error(`No se pudieron cargar los repositorios:`,t),r.innerHTML=`<div class="error-state">No se pudieron cargar los proyectos. <a href="https://github.com/${e}?tab=repositories" target="_blank" rel="noreferrer">Verlos directamente en GitHub ↗</a></div>`}}d();