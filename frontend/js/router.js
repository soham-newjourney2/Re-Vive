/** Hash router with role guards. */

const routes = {};

/** Add a route. */
function registerRoute(path, handler) {
    routes[path] = handler;
}

/** Go to a route. */
function navigate(path) {
    window.location.hash = path;
}

/** The current hash path. */
function getCurrentPath() {
    return window.location.hash.slice(1) || '/welcome';
}

/** Check the user is signed in with the right role. */
function guardRoute(requiredRole) {
    if (!api.isAuthenticated()) {
        navigate('#/login');
        return false;
    }
    const user = api.getUser();
    if (requiredRole && user.role !== requiredRole) {
        redirectToDashboard(user.role);
        return false;
    }
    return true;
}


/** Find and render the current route. */
function resolveRoute() {
    const path = getCurrentPath();

    if (routes[path]) {
        routes[path]();
        return;
    }

    // Dynamic route matching: /doctor/patients/:id
    const patientDetailMatch = path.match(/^\/doctor\/patients\/([a-f0-9]{24})$/);
    if (patientDetailMatch) {
        if (!guardRoute('doctor')) return;
        renderDoctorPatientDetail(patientDetailMatch[1]);
        return;
    }

    // If authenticated with no matching route, go to dashboard
    if (api.isAuthenticated()) {
        const user = api.getUser();
        if (user) {
            redirectToDashboard(user.role);
            return;
        }
    }

    // Default: welcome / demo entry
    initWelcomePage();
}


/* ── Register All Routes ────────────────────────────────── */

// Auth
registerRoute('/welcome', () => {
    if (api.isAuthenticated()) {
        const user = api.getUser();
        redirectToDashboard(user.role);
        return;
    }
    initWelcomePage();
});

registerRoute('/roles', () => {
    if (api.isAuthenticated()) { const user = api.getUser(); redirectToDashboard(user.role); return; }
    initDemoRolesPage();
});

registerRoute('/login', () => {
    if (api.isAuthenticated()) {
        const user = api.getUser();
        redirectToDashboard(user.role);
        return;
    }
    initLoginPage();
});

// Admin routes
registerRoute('/admin/dashboard', () => {
    if (!guardRoute('admin')) return;
    renderAdminDashboard();
});

registerRoute('/admin/hospitals', () => {
    if (!guardRoute('admin')) return;
    renderAdminHospitals();
});

registerRoute('/admin/hospital-admins', () => {
    if (!guardRoute('admin')) return;
    renderHospitalAdmins();
});

registerRoute('/admin/audit', () => {
    if (!guardRoute('admin')) return;
    renderAuditPage('admin');
});

// Hospital routes
registerRoute('/hospital/dashboard', () => {
    if (!guardRoute('hospital')) return;
    renderHospitalDashboard();
});

registerRoute('/hospital/users', () => {
    if (!guardRoute('hospital')) return;
    renderHospitalUsers();
});

registerRoute('/hospital/assignments', () => {
    if (!guardRoute('hospital')) return;
    renderHospitalAssignments();
});

registerRoute('/hospital/audit', () => {
    if (!guardRoute('hospital')) return;
    renderAuditPage('hospital');
});

// Doctor routes
registerRoute('/doctor/dashboard', () => {
    if (!guardRoute('doctor')) return;
    renderDoctorDashboard();
});

registerRoute('/doctor/patients', () => {
    if (!guardRoute('doctor')) return;
    renderDoctorPatients();
});

registerRoute('/doctor/appointments', () => {
    if (!guardRoute('doctor')) return;
    renderDoctorAppointments();
});

registerRoute('/doctor/analytics', () => {
    if (!guardRoute('doctor')) return;
    renderDoctorAnalytics();
});

// Patient routes
registerRoute('/patient/dashboard', () => {
    if (!guardRoute('patient')) return;
    renderPatientDashboard();
});

registerRoute('/patient/checkin', () => {
    if (!guardRoute('patient')) return;
    renderPatientCheckin();
});

registerRoute('/patient/progress', () => {
    if (!guardRoute('patient')) return;
    renderPatientProgress();
});

registerRoute('/patient/twin', () => {
    if (!guardRoute('patient')) return;
    renderPatientTwin();
});

registerRoute('/patient/appointments', () => {
    if (!guardRoute('patient')) return;
    renderPatientAppointments();
});

registerRoute('/patient/profile', () => {
    if (!guardRoute('patient')) return;
    renderPatientProfile();
});

registerRoute('/patient/alerts', () => {
    if (!guardRoute('patient')) return;
    renderAlertsPage('patient');
});

// Guardian routes
registerRoute('/guardian/dashboard', () => {
    if (!guardRoute('guardian')) return;
    renderGuardianDashboard();
});

registerRoute('/guardian/patient', () => {
    if (!guardRoute('guardian')) return;
    renderGuardianPatientView();
});

registerRoute('/guardian/appointments', () => {
    if (!guardRoute('guardian')) return;
    renderGuardianAppointments();
});

registerRoute('/guardian/alerts', () => {
    if (!guardRoute('guardian')) return;
    renderAlertsPage('guardian');
});


/* ── Where the page renderers live ──────────────────────── */
// Every page renderer is a global from js/pages/, loaded in index.html before this file.


/* ── Initialize Router ──────────────────────────────────── */

function initRouter() {
    window.addEventListener('hashchange', resolveRoute);

    resolveRoute();
}

document.addEventListener('DOMContentLoaded', initRouter);



