/** Welcome page, sign-in form and the redirect to each role's dashboard. */


/* ── Demo entry / welcome page ───────────────────────────── */
const DEMO_ACCOUNTS = {
    admin:    { label: 'Platform Admin', email: 'admin@revive.com', password: 'admin123', icon: '👑', color: 'primary', description: 'Manage hospitals, admins and platform activity.' },
    hospital: { label: 'Hospital Admin', email: 'hospital@test.com', password: 'Test@123', icon: '🏥', color: 'blue', description: 'Manage doctors, patients and hospital operations.' },
    doctor:   { label: 'Doctor', email: 'doctor1@test.com', password: 'Test@123', icon: '🩺', color: 'green', description: 'View patients, appointments and recovery risk.' },
    patient:  { label: 'Patient', email: 'patient1@test.com', password: 'Test@123', icon: '🧑‍🦽', color: 'purple', description: 'Track check-ins, goals, progress and care.' },
    guardian: { label: 'Guardian', email: 'guardian1@test.com', password: 'Test@123', icon: '👨‍👩‍👧', color: 'pink', description: 'Follow a patient\'s recovery and appointments.' },
};

function selectDemoRole(role) {
    try { sessionStorage.setItem('revive_demo_role', role); } catch (e) {}
    window.location.hash = '#/login';
}

function getSelectedDemoAccount() {
    let role = 'doctor';
    try { role = sessionStorage.getItem('revive_demo_role') || 'doctor'; } catch (e) {}
    return DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.doctor;
}

function initWelcomePage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="public-home">
            <header class="home-header">
                <a href="#/welcome" class="home-brand" aria-label="RE:VIVE home">
                    <img src="assets/revive-ribbon-r-transparent.png" alt="" />
                    <span><strong>RE:VIVE</strong><small>Recover · Move · Live Better</small></span>
                </a>
                <nav class="home-nav" aria-label="Main navigation">
                    <a class="is-active" href="#home" data-home-nav="home">Home</a>
                    <a href="#platform" data-home-nav="platform">Platform</a>
                    <a href="#features" data-home-nav="features">Features</a>
                    <a href="#about" data-home-nav="about">About</a>
                    <a href="#contact" data-home-nav="contact">Contact</a>
                </nav>
                <div class="home-header-actions">
                    ${renderThemeToggle()}
                    <a href="#/roles" class="home-signin">Sign In <span aria-hidden="true">→</span></a>
                    <button class="home-menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" onclick="toggleHomeMenu(this)"><span></span><span></span><span></span></button>
                </div>
            </header>

            <main>
                <section class="home-hero" id="home">
                    <div class="home-hero-copy">
                        <span class="home-eyebrow"><i></i> INTELLIGENT REHABILITATION PLATFORM</span>
                        <h1>Recover.<br>Move.<br><span>Live Better.</span></h1>
                        <p>Data-driven insights. Personalised care. A stronger tomorrow for every patient.</p>
                        <div class="home-hero-actions">
                            <a class="home-btn home-btn-primary" href="#platform">Explore RE:VIVE <span aria-hidden="true">→</span></a>
                            <a class="home-btn home-btn-secondary" href="#/roles">Join Now</a>
                        </div>
                        <div class="home-trust-row">
                            <span><b>5</b><small>Connected user roles</small></span>
                            <span><b>One</b><small>Connected care journey</small></span>
                            <span><b>AI</b><small>Assisted risk insights</small></span>
                        </div>
                    </div>
                    <div class="home-hero-visual" role="img" aria-label="A rehabilitation professional supporting a patient during recovery">
                        <div class="home-visual-wash"></div>
                        <div class="home-floating-note home-note-progress"><span class="home-note-icon">♡</span><span><small>Recovery journey</small><strong>Progress, together</strong></span><b>↗</b></div>
                        <div class="home-floating-note home-note-care"><span class="home-note-pulse">✚</span><span><small>Care that connects</small><strong>Every step matters</strong></span></div>
                        <div class="home-visual-caption"><span class="home-caption-dot"></span> Human-centred. Data-informed.</div>
                    </div>
                </section>

                <section class="home-feature-strip" aria-label="Featured capabilities">
                    <a class="home-feature-card" href="#features"><span class="home-feature-icon">♡</span><span class="home-feature-copy"><strong>Track Progress</strong><small>Monitor recovery in real time with personalised insights.</small></span><span class="home-feature-arrow">→</span></a>
                    <a class="home-feature-card" href="#features"><span class="home-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-3 3M12 3v18M8 9h2M14 15h2"/></svg></span><span class="home-feature-copy"><strong>AI Risk Detection</strong><small>Identify potential issues early using AI-assisted insights.</small></span><span class="home-feature-arrow">→</span></a>
                    <a class="home-feature-card" href="#features"><span class="home-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a4 4 0 0 1 3 4v2"/></svg></span><span class="home-feature-copy"><strong>Collaborative Care</strong><small>Patients, doctors and caregivers on one connected platform.</small></span><span class="home-feature-arrow">→</span></a>
                    <a class="home-feature-card" href="#features"><span class="home-feature-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7"/></svg></span><span class="home-feature-copy"><strong>Long-Term Outcomes</strong><small>Build healthier, more independent lives with data-informed care.</small></span><span class="home-feature-arrow">→</span></a>
                </section>

                <section class="home-platform" id="platform" aria-labelledby="platform-heading">
                    <div class="home-platform-copy">
                        <span class="home-eyebrow"><i></i> A CONNECTED RECOVERY ECOSYSTEM</span>
                        <h2 id="platform-heading">One platform.<br><span>Every step connected.</span></h2>
                        <p>RE:VIVE brings the people involved in rehabilitation into one coordinated care journey, from hospital setup and treatment planning to patient check-ins and guardian support.</p>
                        <ul class="home-platform-list">
                            <li><span>✓</span> Shared longitudinal digital health records</li>
                            <li><span>✓</span> Doctors create plans and recovery goals</li>
                            <li><span>✓</span> Patients check in and track progress</li>
                            <li><span>✓</span> Guardians follow progress where authorised</li>
                        </ul>
                        <a href="#/roles" class="home-text-link">Access your platform <span>→</span></a>
                    </div>
                    <div class="home-dashboard-preview" aria-label="Illustrative RE:VIVE dashboard preview">
                        <div class="home-dashboard-top"><span class="home-mini-brand"><img src="assets/revive-ribbon-r-transparent.png" alt=""/> RE:VIVE</span><span class="home-preview-status"><i></i> Connected care</span></div>
                        <div class="home-platform-roles"><div><b>01</b><strong>Hospital</strong><small>Sets up the care team</small></div><div><b>02</b><strong>Doctor</strong><small>Plans treatment</small></div><div><b>03</b><strong>Patient</strong><small>Tracks daily recovery</small></div><div><b>04</b><strong>Guardian</strong><small>Supports the journey</small></div></div>
                        <div class="home-platform-note"><span>✓</span><p><strong>One connected recovery journey</strong><small>Role-based access keeps each person focused on the information they need.</small></p></div>
                    </div>
                </section>

                <section class="home-features-section" id="features" aria-labelledby="features-heading">
                    <div class="home-section-heading"><span class="home-eyebrow"><i></i> TOOLS FOR THE RECOVERY JOURNEY</span><h2 id="features-heading">Care that moves<br><span>forward with you.</span></h2><p>Purposeful tools help care teams follow progress, coordinate next steps, and spot changes that may need attention.</p></div>
                    <div class="home-feature-detail-grid">
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">♡</span><h3>Recovery tracking</h3><p>Bring daily check-ins, recovery goals, streaks, and progress trends into one view.</p><span class="home-detail-tag">Progress & goals</span></article>
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">✳</span><h3>AI-assisted risk insights</h3><p>Surface potential deviations for clinician review; insights support care decisions, not replace them.</p><span class="home-detail-tag">Risk awareness</span></article>
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">▤</span><h3>Digital health records</h3><p>Keep relevant recovery history and treatment information organised across the care journey.</p><span class="home-detail-tag">Longitudinal records</span></article>
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">◎</span><h3>Personalised care plans</h3><p>Help doctors set goals and treatment plans that patients can follow over time.</p><span class="home-detail-tag">Treatment planning</span></article>
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">♧</span><h3>Care-team coordination</h3><p>Connect authorised doctors, patients, hospitals, and guardians around shared progress.</p><span class="home-detail-tag">Connected care</span></article>
                        <article class="home-feature-detail"><span class="home-feature-detail-icon">↗</span><h3>Progress & deviation alerts</h3><p>Make meaningful changes easier to review so teams can decide whether follow-up is needed.</p><span class="home-detail-tag">Earlier review</span></article>
                    </div>
                </section>


                <section class="home-about" id="about"><div><span class="home-eyebrow"><i></i> BUILT AROUND PEOPLE</span><h2>Technology should support care —<br><span>not get in its way.</span></h2></div><p>From daily check-ins to coordinated follow-up, RE:VIVE helps bring the recovery story together so care teams can focus on the person behind the data.</p></section>
                <section class="home-contact" id="contact" aria-labelledby="contact-heading">
                    <div class="home-contact-intro"><span class="home-eyebrow"><i></i> WE'RE HERE TO HELP</span><h2 id="contact-heading">Let's connect<br><span>around better care.</span></h2><p>Have a question about the RE:VIVE demo or need help finding the right place to start? Choose the route that fits your needs.</p>
                        <div class="home-contact-options"><a href="#/roles"><span>↗</span><span><strong>Account access</strong><small>Sign in to your workspace or choose a demo role.</small></span></a><div><span>♡</span><span><strong>Patient support</strong><small>For care questions, contact your assigned healthcare team.</small></span></div><div><span>✉</span><span><strong>Project enquiries</strong><small>Use your team's official project contact channel.</small></span></div></div>
                    </div>
                    <div class="home-contact-card"><h3>Send a message</h3><p>This demo form checks your message locally. It is not connected to a message-delivery service yet.</p>
                        <form id="homeContactForm" class="home-contact-form">
                            <label for="homeContactName">Your name</label><input id="homeContactName" name="name" type="text" autocomplete="name" maxlength="100" required placeholder="Enter your name" />
                            <label for="homeContactEmail">Email address</label><input id="homeContactEmail" name="email" type="email" autocomplete="email" maxlength="160" required placeholder="you@example.com" />
                            <label for="homeContactSubject">Subject</label><select id="homeContactSubject" name="subject" required><option value="" selected disabled>Choose a topic</option><option>General enquiry</option><option>Demo / project information</option><option>Account access</option><option>Technical feedback</option></select>
                            <label for="homeContactMessage">Message</label><textarea id="homeContactMessage" name="message" rows="4" maxlength="2000" required placeholder="How can we help?"></textarea>
                            <button type="submit" class="home-btn home-btn-primary">Validate message <span aria-hidden="true">→</span></button>
                            <p class="home-contact-status" id="homeContactStatus" role="status" aria-live="polite"></p>
                        </form>
                    </div>
                </section>
            </main>
            <footer class="home-footer"><a href="#/welcome" class="home-footer-brand"><img src="assets/revive-ribbon-r-transparent.png" alt=""/> RE:VIVE</a><span>Recover · Move · Live Better</span><span>Designed for connected rehabilitation care</span></footer>
        </div>
    `;
    // Public section navigation stays on this page and keeps the active indicator in sync.
    const navLinks = Array.from(app.querySelectorAll('[data-home-nav]'));
    const sections = navLinks.map(link => document.getElementById(link.dataset.homeNav)).filter(Boolean);
    function setActiveHomeNav(id) {
        navLinks.forEach(link => {
            const active = link.dataset.homeNav === id;
            link.classList.toggle('is-active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    app.querySelectorAll('a[href^="#"]:not([href^="#/"])').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks.some(item => item.dataset.homeNav === targetId)) setActiveHomeNav(targetId);
            const header = link.closest('.home-header');
            const menuButton = header && header.querySelector('.home-menu-toggle');
            if (header && menuButton) { header.classList.remove('home-menu-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
        });
    });
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) setActiveHomeNav(visible.target.id);
        }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, .15, .35, .6] });
        sections.forEach(section => observer.observe(section));
    }
    const contactForm = document.getElementById('homeContactForm');
    if (contactForm) contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const status = document.getElementById('homeContactStatus');
        if (!contactForm.reportValidity()) return;
        status.textContent = 'Your message is valid, but it has not been sent. This demo does not yet have a connected contact service.';
        status.classList.add('is-not-sent');
    });
}

function toggleHomeMenu(button) {
    const header = button.closest('.home-header');
    if (!header) return;
    const open = header.classList.toggle('home-menu-open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

function initDemoRolesPage() {
    const app = document.getElementById('app');
    const accounts = Object.entries(DEMO_ACCOUNTS);
    app.innerHTML = `
        ${renderNavbar(null, 'welcome')}
        <div class="welcome-page"><main class="welcome-shell">
            <div class="welcome-hero"><img class="welcome-brand-logo" src="assets/revive-ribbon-r-transparent.png" alt="RE:VIVE ribbon R logo"/><h1>Choose your <span>RE:VIVE</span> role</h1><p class="welcome-subtitle">Select a demo role to prefill the sign-in form.</p></div>
            <div class="demo-role-grid">${accounts.map(([role, account]) => `<button class="demo-role-card demo-role-${account.color}" type="button" onclick="selectDemoRole('${role}')"><span class="demo-role-copy"><strong>${account.label}</strong><small>${account.description}</small></span><span class="demo-credentials"><span><em>Email:</em> <b>${account.email}</b></span><span><em>Password:</em> <b>${account.password}</b></span></span><span class="demo-role-continue">Continue →</span></button>`).join('')}</div>
        </main></div>`;
}

function initLoginPage() {
    const app = document.getElementById('app');
    const demo = getSelectedDemoAccount();
    app.innerHTML = `
        ${renderNavbar(null, 'login')}
        <main class="login-page">
            <div class="login-container">
                <div class="login-card card glass">
                    <div class="login-branding">
                        <img class="login-brand-logo" src="assets/revive-ribbon-r-transparent.png" alt="RE:VIVE ribbon R logo" />
                        <h1>RE:VIVE</h1>
                        <p>Recovery Management Platform</p>
                    </div>

                    <form id="loginForm" class="login-form">
                        <div id="loginError" class="login-error" style="display: none;"></div>

                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                class="form-input"
                                placeholder="Enter your email"
                                value="${demo.email}"
                                autocomplete="email"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                class="form-input"
                                placeholder="Enter your password"
                                value="${demo.password}"
                                autocomplete="current-password"
                                required
                            />
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg w-full" id="loginBtn">
                            Sign In
                        </button>

                        <div class="demo-login-hint">
                            <div><strong>Demo account</strong><span>${escapeHtml(demo.label)}</span></div>
                            <button type="button" onclick="window.location.hash='#/roles'">Change role</button>
                        </div>
                    </form>

                    <div class="login-footer">
                        <p>Secured healthcare platform · RE:VIVE v1.0</p>
                    </div>
                </div>
            </div>
        </main>
    `;

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', handleLogin);
}


async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const errorDiv = document.getElementById('loginError');

    if (!email || !password) {
        showLoginError('Please fill in all fields');
        return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="spinner"></span> Signing in...';
    errorDiv.style.display = 'none';

    try {
        const data = await api.login(email, password);
        redirectToDashboard(data.role);
    } catch (error) {
        showLoginError(error.message || 'Invalid credentials');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
}


function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}


function redirectToDashboard(role) {
    const routes = {
        admin: '#/admin/dashboard',
        hospital: '#/hospital/dashboard',
        doctor: '#/doctor/dashboard',
        patient: '#/patient/dashboard',
        guardian: '#/guardian/dashboard',
    };
    window.location.hash = routes[role] || '#/login';
}


async function logout() {
    // Revoke on the server first, so signing out really ends the session.
    await api.logout();
    window.location.hash = '#/login';
}
