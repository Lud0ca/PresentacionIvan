import './style.css';

type GitHubRepository = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
};

const username = 'Lud0ca';
const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('No se encontró el contenedor principal.');
}

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="Ir al inicio"><span>LI</span> ludwing.dev</a>
    <nav aria-label="Navegación principal">
      <a href="#proyectos">Proyectos</a>
      <a href="#sobre-mi">Sobre mí</a>
      <a class="nav-cta" href="https://github.com/${username}" target="_blank" rel="noreferrer">GitHub ↗</a>
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
          <a class="text-link" href="https://github.com/${username}" target="_blank" rel="noreferrer">Visitar GitHub <span>↗</span></a>
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
        <a class="text-link" href="https://github.com/${username}?tab=repositories" target="_blank" rel="noreferrer">Explorar todos los repositorios <span>↗</span></a>
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
`;

const grid = document.querySelector<HTMLDivElement>('#projects-grid')!;
const searchInput = document.querySelector<HTMLInputElement>('#search')!;
const repoCount = document.querySelector<HTMLElement>('#repo-count')!;
const languageCount = document.querySelector<HTMLElement>('#language-count')!;
let repositories: GitHubRepository[] = [];
let selectedFilter = 'all';

function repositoryCard(repository: GitHubRepository): string {
  const language = repository.language ?? 'Código';
  const description = repository.description ?? 'Explora este proyecto en GitHub para conocer más detalles.';
  const topics = repository.topics.slice(0, 2).map((topic) => `<span>${topic}</span>`).join('');

  return `
    <article class="project-card">
      <div class="card-top"><span class="project-icon">&lt;/&gt;</span><span class="arrow">↗</span></div>
      <p class="project-language">${language}</p>
      <h3>${repository.name}</h3>
      <p class="project-description">${description}</p>
      <div class="card-bottom"><div class="topics">${topics}</div><a href="${repository.html_url}" target="_blank" rel="noreferrer" aria-label="Ver ${repository.name} en GitHub">Ver proyecto</a></div>
    </article>
  `;
}

function renderRepositories(): void {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = repositories.filter((repository) => {
    const matchesFilter = selectedFilter === 'all' || repository.language === selectedFilter;
    const matchesSearch = `${repository.name} ${repository.description ?? ''}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(repositoryCard).join('')
    : '<div class="empty-state">No hay proyectos que coincidan con esta búsqueda.</div>';
}

document.querySelectorAll<HTMLButtonElement>('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    selectedFilter = button.dataset.filter ?? 'all';
    renderRepositories();
  });
});

searchInput.addEventListener('input', renderRepositories);

async function loadRepositories(): Promise<void> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`GitHub respondió con ${response.status}`);
    const data: GitHubRepository[] = await response.json();
    repositories = data.filter((repository) => !repository.fork);
    repoCount.textContent = String(repositories.length).padStart(2, '0');
    languageCount.textContent = String(new Set(repositories.map((repo) => repo.language).filter(Boolean)).size).padStart(2, '0');
    renderRepositories();
  } catch (error) {
    console.error('No se pudieron cargar los repositorios:', error);
    grid.innerHTML = `<div class="error-state">No se pudieron cargar los proyectos. <a href="https://github.com/${username}?tab=repositories" target="_blank" rel="noreferrer">Verlos directamente en GitHub ↗</a></div>`;
  }
}

void loadRepositories();
