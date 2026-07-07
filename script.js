const TOTAL_STEPS = 14;
let currentStep = 1;

const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const progressDotsContainer = document.getElementById('progress-dots');
const themeToggle = document.getElementById('theme-toggle');

// Initialize Progress Dots
function initDots() {
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.step = i;
        dot.title = `Step ${i}`;
        dot.addEventListener('click', () => navigateToStep(i));
        progressDotsContainer.appendChild(dot);
    }
    updateUI();
}

// Update UI (Buttons, Dots, Views)
function updateUI() {
    // Update Views
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${currentStep}`).classList.add('active');

    // Scroll to top safely
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        const stepNum = parseInt(dot.dataset.step);
        dot.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
            dot.classList.add('active');
        } else if (stepNum < currentStep) {
            dot.classList.add('completed');
        }
    });

    // Update Buttons
    btnBack.disabled = currentStep === 1;
    
    if (currentStep === TOTAL_STEPS) {
        btnNext.disabled = true;
        btnNext.textContent = 'Finish';
    } else {
        btnNext.disabled = false;
        btnNext.textContent = 'Next';
    }
}

function navigateToStep(step) {
    if (step >= 1 && step <= TOTAL_STEPS) {
        currentStep = step;
        updateUI();
    }
}

// Event Listeners for Nav
btnNext.addEventListener('click', () => {
    if (currentStep < TOTAL_STEPS) {
        currentStep++;
        updateUI();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
});

// Dark Mode Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('moon-icon').style.display = 'none';
        document.getElementById('sun-icon').style.display = 'block';
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        document.getElementById('moon-icon').style.display = 'block';
        document.getElementById('sun-icon').style.display = 'none';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('moon-icon').style.display = 'none';
        document.getElementById('sun-icon').style.display = 'block';
    }
});

// Initialize
initTheme();
initDots();
