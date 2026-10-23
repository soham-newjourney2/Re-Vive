/** Shared UI: the header, alerts bell, search, toasts and formatting helpers. */


/* ── Navigation ─────────────────────────────────────────── */

const NAV_CONFIG = {
    admin: {
        title: 'Admin',
        color: 'var(--role-admin)',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '#/admin/dashboard' },
            { id: 'hospitals', label: 'Hospitals', icon: '🏥', route: '#/admin/hospitals' },
            { id: 'hospital-admins', label: 'Hospital Admins', icon: '🔑', route: '#/admin/hospital-admins' },
            { id: 'audit', label: 'Audit Trail', icon: '📜', route: '#/admin/audit' },
        ]
    },
    hospital: {
        title: 'Hospital',
        color: 'var(--role-hospital)',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '#/hospital/dashboard' },
            { id: 'users', label: 'Manage Users', icon: '👥', route: '#/hospital/users' },
            { id: 'assignments', label: 'Assignments', icon: '🔗', route: '#/hospital/assignments' },
            { id: 'audit', label: 'Audit Trail', icon: '📜', route: '#/hospital/audit' },
        ]
    },
    doctor: {
        title: 'Doctor',
        color: 'var(--role-doctor)',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '#/doctor/dashboard' },
            { id: 'patients', label: 'My Patients', icon: '🩺', route: '#/doctor/patients' },
            { id: 'analytics', label: 'Caseload', icon: '📊', route: '#/doctor/analytics' },
            { id: 'appointments', label: 'Appointments', icon: '📅', route: '#/doctor/appointments' },
        ]
    },
    patient: {
        title: 'Patient',
        color: 'var(--role-patient)',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '#/patient/dashboard' },
            { id: 'checkin', label: 'Daily Check-in', icon: '📝', route: '#/patient/checkin' },
            { id: 'progress', label: 'My Progress', icon: '📈', route: '#/patient/progress' },
            { id: 'twin', label: 'Digital Twin', icon: '🧬', route: '#/patient/twin' },
            { id: 'appointments', label: 'Appointments', icon: '📅', route: '#/patient/appointments' },
            { id: 'profile', label: 'My Profile', icon: '👤', route: '#/patient/profile' },
            { id: 'alerts', label: 'Alerts', icon: '🔔', route: '#/patient/alerts' },
        ]
    },
    guardian: {
        title: 'Guardian',
        color: 'var(--role-guardian)',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '#/guardian/dashboard' },
            { id: 'patient', label: 'Patient View', icon: '👤', route: '#/guardian/patient' },
            { id: 'appointments', label: 'Appointments', icon: '📅', route: '#/guardian/appointments' },
            { id: 'alerts', label: 'Alerts', icon: '🔔', route: '#/guardian/alerts' },
        ]
    }
};


function handleTopNavigation(event, route) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (!route) return false;
    const target = route.startsWith('#') ? route : `#${route}`;
    if (window.location.hash === target) {
        resolveRoute();
    } else {
        window.location.hash = target;
    }
    return false;
}

/** The one site header: pages, search, alerts and account when signed in; brand, theme and one action when not. */
function renderNavbar(role, activeId) {
    const signedIn = Boolean(role && NAV_CONFIG[role]);
    const config = NAV_CONFIG[role] || { title: 'Public', items: [] };
    const home = signedIn ? config.items[0].route : '#/welcome';

    const brand = `
            <a href="${home}" onclick="return handleTopNavigation(event, '${home}')" class="brand-lockup" aria-label="RE:VIVE home">
                <span class="brand-mark" aria-hidden="true"><img src="assets/revive-ribbon-r-transparent.png" alt="" /></span>
                <span class="brand-copy">
                    <strong>RE:VIVE</strong>
                    <small>Recover · Move · Live Better</small>
                </span>
            </a>`;

    if (!signedIn) {
        const action = activeId === 'login'
            ? `<a href="#/roles" class="btn btn-secondary btn-sm public-nav-action">← Choose a role</a>`
            : activeId === 'roles'
                ? `<a href="#/welcome" class="btn btn-secondary btn-sm public-nav-action">← Back to home</a>`
                : `<a href="#/roles" class="btn btn-primary btn-sm public-nav-action">Sign in</a>`;
        return `
        <header class="navbar top-navbar public-navbar" id="navbar">
            ${brand}
            <div class="public-nav-tagline" aria-hidden="true">
                <span>Heal</span><b>•</b><span>Monitor</span><b>•</b><span>Support</span><b>•</b><span>Rebuild</span>
            </div>
            <div class="navbar-actions">
                ${renderThemeToggle()}
                ${action}
            </div>
        </header>
        `;
    }

    const user = api.getUser();
    const name = user ? user.name : 'User';
    const initials = user ? user.name.replace(/^Dr\.?\s+/i, '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    const navItems = config.items.map(item => `
        <a href="${item.route}" onclick="return handleTopNavigation(event, '${item.route}')"
           class="top-nav-item ${item.id === activeId ? 'active' : ''}" data-nav="${item.id}"
           ${item.id === activeId ? 'aria-current="page"' : ''}>
            <span class="top-nav-icon" aria-hidden="true">${item.icon}</span>
            <span>${item.label}</span>
        </a>
    `).join('');

    return `
        <header class="navbar top-navbar" id="navbar">
            ${brand}

            <nav class="top-nav" aria-label="${config.title} navigation">
                ${navItems}
            </nav>

            <div class="navbar-actions">
                <div class="nav-search-wrap">
                    <button class="nav-search" id="globalPatientSearchButton" type="button" aria-label="Search patients" onclick="toggleGlobalPatientSearch(event)">
                        <span aria-hidden="true">⌕</span><span>Search patients...</span>
                    </button>
                    <div class="global-search-panel" id="globalPatientSearchPanel" hidden>
                        <div class="global-search-input-wrap">
                            <span aria-hidden="true">⌕</span>
                            <input id="globalPatientSearchInput" type="search" autocomplete="off" aria-label="Search patients" placeholder="Search by patient name or email..." oninput="runGlobalPatientSearch(this.value)" onkeydown="handleGlobalPatientSearchKey(event)" />
                            <button type="button" class="global-search-close" onclick="closeGlobalPatientSearch()" aria-label="Close search">&times;</button>
                        </div>
                        <div class="global-search-results" id="globalPatientSearchResults">
                            <div class="global-search-hint">Start typing to search your patients.</div>
                        </div>
                    </div>
                </div>
                ${renderThemeToggle()}
                ${renderNotificationBell()}
                <button type="button" class="navbar-signout" onclick="logout()"><span aria-hidden="true">⇥</span> Sign Out</button>
                <button type="button" class="navbar-user" onclick="logout()" aria-label="Sign out ${escapeHtml(name)}" title="Sign out">
                    <span class="navbar-avatar" aria-hidden="true">${escapeHtml(initials)}</span>
                    <span class="navbar-user-info">
                        <span class="navbar-user-name">${escapeHtml(name)}</span>
                        <span class="navbar-user-role">${user ? escapeHtml(user.role) : ''} · Sign out</span>
                    </span>
                    <span class="user-signout" aria-hidden="true">⇥</span>
                </button>
            </div>
        </header>
    `;
}


/** Render a signed-in page: the site header, then the page content. */
function renderDashboardShell(role, activeNavId, pageTitle, contentHTML) {
    const app = document.getElementById('app');
    app.innerHTML = `
        ${renderNavbar(role, activeNavId)}
        <main class="main-content page-enter">
            ${contentHTML}
        </main>
    `;
    initNotifications();

    // On a phone the page links scroll sideways; bring the current one into view.
    const active = app.querySelector('.top-nav-item.active');
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
}


/* ── Responsive tables ────────────────────────────────── */
/* One observer labels every table cell with its column name for the phone layout. */

function labelTableCells(root) {
    root.querySelectorAll('table.data-table').forEach(table => {
        const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
        if (!headers.length) return;
        table.querySelectorAll('tbody tr').forEach(row => {
            [...row.children].forEach((cell, i) => {
                if (!cell.hasAttribute('data-label')) cell.setAttribute('data-label', headers[i] || '');
            });
        });
    });
}

new MutationObserver(mutations => {
    for (const m of mutations) {
        for (const node of m.addedNodes) {
            if (node.nodeType === 1) labelTableCells(node.matches?.('table') ? node.parentElement || node : node);
        }
    }
}).observe(document.documentElement, { childList: true, subtree: true });


/* ── Global patient search ────────────────────────────── */
/* Searches patients through the existing role APIs. */
let _globalSearchPatients = null;
let _globalSearchRole = null;
let _globalSearchTimer = null;

function toggleGlobalPatientSearch(event) {
    if (event) event.stopPropagation();
    const panel = document.getElementById('globalPatientSearchPanel');
    const input = document.getElementById('globalPatientSearchInput');
    if (!panel) return;
    const opening = panel.hidden;
    panel.hidden = !opening;
    if (opening) {
        requestAnimationFrame(() => input?.focus());
        document.addEventListener('click', _globalSearchOutsideClick, true);
    } else {
        document.removeEventListener('click', _globalSearchOutsideClick, true);
    }
}

function _globalSearchOutsideClick(event) {
    const wrap = event.target.closest?.('.nav-search-wrap');
    if (!wrap) closeGlobalPatientSearch();
}

function closeGlobalPatientSearch() {
    const panel = document.getElementById('globalPatientSearchPanel');
    if (panel) panel.hidden = true;
    document.removeEventListener('click', _globalSearchOutsideClick, true);
}

function handleGlobalPatientSearchKey(event) {
    if (event.key === 'Escape') {
        closeGlobalPatientSearch();
        return;
    }
    if (event.key === 'Enter') {
        const first = document.querySelector('#globalPatientSearchResults a[data-search-result="patient"]');
        if (first) first.click();
    }
}

async function runGlobalPatientSearch(query) {
    const results = document.getElementById('globalPatientSearchResults');
    if (!results) return;
    const term = String(query || '').trim().toLowerCase();
    if (!term) {
        results.innerHTML = '<div class="global-search-hint">Start typing to search your patients.</div>';
        return;
    }

    clearTimeout(_globalSearchTimer);
    _globalSearchTimer = setTimeout(async () => {
        const user = api.getUser();
        if (!user) return;
        try {
            if (!_globalSearchPatients || _globalSearchRole !== user.role) {
                _globalSearchRole = user.role;
                if (user.role === 'doctor') {
                    const data = await api.get('/doctor/patients');
                    _globalSearchPatients = data.patients || [];
                } else if (user.role === 'hospital') {
                    const data = await api.get('/hospital/users?role=patient');
                    _globalSearchPatients = data.users || [];
                } else if (user.role === 'patient') {
                    _globalSearchPatients = [user];
                } else if (user.role === 'guardian') {
                    const data = await api.get('/guardian/dashboard');
                    _globalSearchPatients = data.patient_id ? [{
                        id: data.patient_id,
                        full_name: data.patient_name || 'Linked Patient',
                        email: data.patient_email || ''
                    }] : [];
                } else {
                    _globalSearchPatients = [];
                }
            }

            const matches = _globalSearchPatients.filter(p => {
                const name = (p.full_name || p.name || '').toLowerCase();
                const email = (p.email || '').toLowerCase();
                return name.includes(term) || email.includes(term);
            }).slice(0, 8);

            if (!matches.length) {
                results.innerHTML = '<div class="global-search-empty">No matching patients found.</div>';
                return;
            }

            results.innerHTML = matches.map(p => {
                const id = p.id || p._id;
                const name = p.full_name || p.name || 'Patient';
                const email = p.email || '';
                const href = user.role === 'doctor'
                    ? `#/doctor/patients/${id}`
                    : user.role === 'hospital'
                        ? `#/hospital/users`
                        : user.role === 'guardian'
                            ? `#/guardian/patient`
                            : `#/patient/profile`;
                return `<a href="${href}" data-search-result="patient" class="global-search-result">\
                    <span class="global-search-avatar">${escapeHtml(name.charAt(0).toUpperCase())}</span>\
                    <span><strong>${escapeHtml(name)}</strong><small>${escapeHtml(email)}</small></span>\
                    <span class="global-search-arrow">→</span>\
                </a>`;
            }).join('');
        } catch (err) {
            results.innerHTML = '<div class="global-search-empty">Search is temporarily unavailable.</div>';
        }
    }, 120);
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;'
    }[ch]));
}


/* ── Formatting ─────────────────────────────────────────── */
/* Shared by every page; dates arrive from the API as ISO strings. */

function formatDate(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(isoString) {
    if (!isoString) return '—';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString(undefined, {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

/** "in 20 min", "in 3 hours", "in 2 days" — for upcoming appointments. */
function formatCountdown(isoString) {
    const target = new Date(isoString).getTime();
    if (isNaN(target)) return '';

    const minutes = Math.round((target - Date.now()) / 60000);
    if (minutes <= 0) return 'now';
    if (minutes < 60) return `in ${minutes} min`;

    const hours = Math.round(minutes / 60);
    if (hours < 24) return `in ${hours} hour${hours === 1 ? '' : 's'}`;

    const days = Math.round(hours / 24);
    return `in ${days} day${days === 1 ? '' : 's'}`;
}


/* ── Notification Bell & Alerts Drawer ──────────────────── */

const ALERT_CONFIG = {
    craving_spike: { icon: '🌊', label: 'Craving Spike' },
    stress_spike: { icon: '🌡️', label: 'Stress Spike' },
    adherence_drop: { icon: '💊', label: 'Adherence Drop' },
    missed_checkin: { icon: '⏰', label: 'Missed Check-in' },
    appointment: { icon: '📅', label: 'Appointment' },
};

const SEVERITY_CONFIG = {
    low: { badge: 'badge-info', color: 'var(--accent-info)' },
    medium: { badge: 'badge-warning', color: 'var(--accent-warning)' },
    high: { badge: 'badge-danger', color: 'var(--accent-danger)' },
    critical: { badge: 'badge-danger', color: 'var(--accent-danger)' },
};

// Polling handle so we never stack intervals across route changes
let _alertPollTimer = null;


function renderNotificationBell() {
    return `
        <div class="notif-wrapper">
            <button class="notif-bell" id="notifBell" type="button" onclick="toggleNotifications(event)" aria-label="Alerts" title="Alerts">
                <span class="notif-bell-icon" aria-hidden="true">🔔</span>
                <span class="notif-badge" id="notifBadge" hidden>0</span>
            </button>
            <div class="notif-panel" id="notifPanel">
                <div class="notif-panel-header">
                    <h4>Notifications</h4>
                    <button class="btn btn-ghost btn-sm" onclick="markAllAlertsRead()">Mark all read</button>
                </div>
                <div class="notif-panel-body" id="notifList">
                    <div class="loading-overlay"><div class="spinner"></div></div>
                </div>
            </div>
        </div>
    `;
}


/** Set up the alerts bell: the first count, then polling. */
function initNotifications() {
    if (!api.isAuthenticated()) return;

    refreshAlertBadge();

    if (_alertPollTimer) clearInterval(_alertPollTimer);
    _alertPollTimer = setInterval(refreshAlertBadge, 60000);

    // Close the panel when clicking outside of it
    document.addEventListener('click', _closeNotificationsOnOutsideClick);
}


function _closeNotificationsOnOutsideClick(e) {
    const panel = document.getElementById('notifPanel');
    if (!panel || !panel.classList.contains('active')) return;
    if (e.target.closest('.notif-wrapper')) return;
    panel.classList.remove('active');
}


async function refreshAlertBadge() {
    const badge = document.getElementById('notifBadge');
    if (!badge) {
        // Shell was replaced by a non-dashboard view (e.g. login) — stop polling
        if (_alertPollTimer) {
            clearInterval(_alertPollTimer);
            _alertPollTimer = null;
        }
        return;
    }

    try {
        const data = await api.get('/alerts/unread-count');
        _paintBadge(data.unread);
    } catch (err) {
        // Badge is non-critical — fail quietly rather than toasting on every poll
    }
}


function _paintBadge(count) {
    const badge = document.getElementById('notifBadge');
    const bell = document.getElementById('notifBell');
    if (!badge) return;

    badge.textContent = count > 99 ? '99+' : count;
    badge.hidden = count === 0;
    if (bell) bell.classList.toggle('has-alerts', count > 0);
}


function toggleNotifications(event) {
    if (event) event.stopPropagation();
    const panel = document.getElementById('notifPanel');
    if (!panel) return;

    const opening = !panel.classList.contains('active');
    panel.classList.toggle('active', opening);

    if (opening) loadAlerts();
}


async function loadAlerts() {
    const list = document.getElementById('notifList');
    if (!list) return;

    list.innerHTML = '<div class="loading-overlay"><div class="spinner"></div></div>';

    try {
        const data = await api.get('/alerts?limit=25');
        _paintBadge(data.unread);

        if (!data.alerts.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔕</div>
                    <div class="empty-title">All clear</div>
                    <div class="empty-desc">No clinical alerts right now.</div>
                </div>
            `;
            return;
        }

        list.innerHTML = data.alerts.map(alert => {
            const cfg = ALERT_CONFIG[alert.alert_type] || { icon: '🔔', label: alert.alert_type };
            const sev = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.low;
            return `
                <div class="notif-item ${alert.is_read ? '' : 'unread'}"
                     onclick="markAlertRead('${escapeHtml(alert.id)}')">
                    <div class="notif-item-icon" style="color: ${escapeHtml(sev.color)};">${escapeHtml(cfg.icon)}</div>
                    <div class="notif-item-body">
                        <div class="notif-item-top">
                            <span class="badge ${escapeHtml(sev.badge)}">${escapeHtml(cfg.label)}</span>
                            <span class="notif-item-time">${formatRelativeTime(alert.created_at)}</span>
                        </div>
                        <div class="notif-item-message">${escapeHtml(alert.message)}</div>
                        ${alert.patient_name ? `<div class="notif-item-meta">${escapeHtml(alert.patient_name)}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <div class="empty-title">Failed to load alerts</div>
                <div class="empty-desc">${escapeHtml(err.message || 'Please try again.')}</div>
            </div>
        `;
    }
}


async function markAlertRead(alertId) {
    try {
        await api.patch(`/alerts/${alertId}/read`);
        await loadAlerts();
    } catch (err) {
        showToast(err.message || 'Failed to update alert', 'error');
    }
}


async function markAllAlertsRead() {
    try {
        const result = await api.patch('/alerts/read-all');
        if (result.updated > 0) {
            showToast(`${result.updated} alert(s) marked as read`, 'success');
        }
        await loadAlerts();
    } catch (err) {
        showToast(err.message || 'Failed to mark alerts as read', 'error');
    }
}


/** An ISO time as a short relative label, like "3h ago". */
function formatRelativeTime(isoString) {
    if (!isoString) return '';
    const then = new Date(isoString);
    if (isNaN(then)) return '';

    const seconds = Math.floor((Date.now() - then.getTime()) / 1000);
    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return then.toLocaleDateString();
}


/* ── Care Team Contact Cards ────────────────────────────── */

const CONTACT_ROLE_ICONS = { doctor: '🩺', guardian: '🛡️', hospital: '🏥' };

/** Care team cards with working email and phone links. */
function _renderContactCards(members) {
    if (!members || members.length === 0) {
        return `<div style="color: var(--text-muted); font-size: var(--text-sm);">No care team assigned yet.</div>`;
    }

    return members.map(m => `
        <div class="care-team-card">
            <div class="care-team-avatar">${escapeHtml(CONTACT_ROLE_ICONS[m.role] || '👤')}</div>
            <div class="care-team-info">
                <div class="care-team-name">${escapeHtml(m.full_name)}</div>
                <div class="care-team-role">${m.role.charAt(0).toUpperCase() + m.role.slice(1)}</div>
            </div>
            <div class="care-team-actions">
                ${m.email ? `
                    <a class="btn btn-secondary btn-sm" href="mailto:${escapeHtml(m.email)}" title="Email ${escapeHtml(m.full_name)}">
                        Email
                    </a>
                ` : ''}
                ${m.phone ? `
                    <a class="btn btn-secondary btn-sm" href="tel:${m.phone.replace(/[^\d+]/g, '')}" title="Call ${escapeHtml(m.full_name)}">
                        Call
                    </a>
                ` : ''}
                ${!m.email && !m.phone ? '<span style="color: var(--text-muted); font-size: var(--text-xs);">No contact details on file</span>' : ''}
            </div>
        </div>
    `).join('');
}


/* ── Toast Notifications ────────────────────────────────── */

function showToast(message, type = 'info', duration = 4000) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };

    // Messages can echo user input from the server, so always escape them.
    toast.innerHTML = `
        <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <span class="toast-message">${escapeHtml(message)}</span>
        <button class="toast-close" type="button" aria-label="Dismiss" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 300ms ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

