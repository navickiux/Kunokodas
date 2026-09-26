// Kinesiotherapy Services Data
const kinezoServices = [
    {
        id: 'istyrimas',
        title: 'Kinezoterapinis Ištyrimas',
        icon: 'fa-clipboard-check',
        shortDesc: 'Funkcinis judesių vertinimas (FMS), goniometrija, raumenų disbalanso bei laikysenos analizė.',
        fullDesc: 'Kiekvieno gydymo pagrindas. Nustatoma tikroji skausmo priežastis, vertinamas sąnarių mobilumas, raumenų ilgis bei jėga. Sudaromas tikslinis reabilitacijos planas.'
    },
    {
        id: 'redcord',
        title: 'Redcord Neurac Terapija',
        icon: 'fa-person-walking-luggage',
        shortDesc: 'Neuromuskulinis aktyvavimas pakabinimo juostomis giliųjų stuburo stabilizatorių atstatymui.',
        fullDesc: 'Neurac metodika leidžia atlikti pratimus be sąnarių apkrovos ir skausmo. Padeda išjungti kompensacinius raumenis ir iš naujo aktyvuoti silpnus giliuosius raumenis.'
    },
    {
        id: 'stuburas',
        title: 'Stuburo Išvaržų Gydymas',
        icon: 'fa-bone',
        shortDesc: 'Kompleksinis tarpsankulinių diskų išvaržų bei išialgijos (radikulito) mažinimas.',
        fullDesc: 'Derinant trakcijos metodus, manualinę terapiją ir stabilizavimo pratimus, sumažinamas spaudimas nervinėms šaknims bei išvengiama operacijos.'
    },
    {
        id: 'sportas',
        title: 'Sportinė Reabilitacija',
        icon: 'fa-person-running',
        shortDesc: 'Traumų gydymas, sausgyslių ir raiščių atstatymas bei grįžimas į sportinį režimą.',
        fullDesc: 'Mėgėjų ir profesionalų reabilitacija po meniskų, kryžminių raiščių ar pečio ankštumo operacijų, taikant pažangias motorinės kontrolės metodikas.'
    },
    {
        id: 'masazas',
        title: 'Manualinė Terapija & Masažai',
        icon: 'fa-hand-holding-medical',
        shortDesc: 'Masažas įtampai mažinti, trigerinių taškų ir fascijų atpalaidavimas.',
        fullDesc: 'Minkštųjų audinių mobilizacija, gydomasis bei poodinių fascijų atpalaidavimo masažas, mažinantis nugaros, kaklo bei pečių juostos įtampą.'
    },
    {
        id: 'tecar',
        title: 'Tecar Radiodažnuminė Terapija',
        icon: 'fa-bolt',
        shortDesc: 'Giliųjų audinių šildymas elektromagnetine energija greitam skausmo malšinimui.',
        fullDesc: 'Aukšto dažnio srovė skatina audinių regeneraciją, stimuliuoja mikrocirkuliaciją ir dvigubai greičiau pašalina uždegimą.'
    }
];

// Kinesiotherapy Prices Data
const kinezoPriceList = [
    { name: 'Pirminė kinezoterapeuto konsultacija ir ištyrimas (60 min)', price: '45 – 60 €', cat: 'konsultacija' },
    { name: 'Individuali kinezoterapijos treniruotė (1-on-1, 50 min)', price: '35 – 45 €', cat: 'pratybos' },
    { name: 'Redcord Neurac pakabinimo sistemų seansas (45 min)', price: '40 – 50 €', cat: 'pratybos' },
    { name: 'Gydomasis nugaros / viso kūno masažas (45-60 min)', price: '40 – 65 €', cat: 'masazas' },
    { name: 'Manualinė terapija / Fascijų atpalaidavimas', price: '45 – 55 €', cat: 'masazas' },
    { name: 'Tecar radiodažnuminė terapija (30 min)', price: '35 – 45 €', cat: 'iranga' },
    { name: 'Smūginės bangos terapija (1 seansas)', price: '30 – 40 €', cat: 'iranga' },
    { name: '10-ties individualių kinezoterapijos seansų abonementas', price: '320 – 380 €', cat: 'pratybos' }
];

let currentKinezoCat = 'all';

// Router Functions
function navigateTo(pageId) {
    document.querySelectorAll('.page-view').forEach(p => {
        p.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if(targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('page-home').classList.add('active');
        pageId = 'home';
    }

    document.querySelectorAll('#desktop-nav .nav-link, #mobile-menu a').forEach(link => {
        if(link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Services Dynamic Grid
function renderKinezoServices() {
    const grid = document.getElementById('kinezo-services-grid');
    if(!grid) return;
    grid.innerHTML = kinezoServices.map(s => `
        <div class="bg-darkBg rounded-2xl p-8 border border-slate-800 gold-border-glow transition flex flex-col justify-between group">
            <div>
                <div class="w-14 h-14 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                    <i class="fa-solid ${s.icon}"></i>
                </div>
                <h3 class="text-xl font-serif font-bold text-white mb-3">${s.title}</h3>
                <p class="text-slate-400 text-sm font-light leading-relaxed mb-6">${s.shortDesc}</p>
            </div>
            <button onclick="openServiceDetailModal('${s.id}')" class="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 transition">
                <span>Plačiau apie metodiką</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
        </div>
    `).join('');
}

// Render Prices Filterable Table
function renderKinezoPrices() {
    const container = document.getElementById('kinezoPriceTableBody');
    if(!container) return;
    const searchVal = document.getElementById('kinezoPriceSearch')?.value.toLowerCase() || '';

    const filtered = kinezoPriceList.filter(item => {
        const matchCat = currentKinezoCat === 'all' || item.cat === currentKinezoCat;
        const matchSearch = item.name.toLowerCase().includes(searchVal);
        return matchCat && matchSearch;
    });

    if(filtered.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-500 text-sm">Atsiprašome, paslaugų pagal ieškomą žodį nerasta.</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-900/60 transition">
            <span class="text-sm font-medium text-slate-200">${item.name}</span>
            <span class="text-sm font-bold text-gold-400 font-serif shrink-0 ml-4">${item.price}</span>
        </div>
    `).join('');
}

function filterKinezoPrices() {
    renderKinezoPrices();
}

function setKinezoPriceCategory(cat) {
    currentKinezoCat = cat;
    document.querySelectorAll('.kinezo-price-btn').forEach(btn => {
        btn.classList.remove('bg-gold-500', 'text-slate-950');
        btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    event.target.classList.remove('bg-slate-800', 'text-slate-300');
    event.target.classList.add('bg-gold-500', 'text-slate-950');
    renderKinezoPrices();
}

// Modals
function openServiceDetailModal(id) {
    const service = kinezoServices.find(s => s.id === id);
    if(!service) return;

    const content = document.getElementById('serviceDetailContent');
    content.innerHTML = `
        <div class="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center text-xl mb-2">
            <i class="fa-solid ${service.icon}"></i>
        </div>
        <h3 class="text-2xl font-serif font-bold text-white">${service.title}</h3>
        <p class="text-slate-300 text-sm leading-relaxed font-light">${service.fullDesc}</p>
        <div class="pt-4 border-t border-slate-800 flex gap-3">
            <button onclick="closeServiceDetailModal(); openBookingModal();" class="flex-1 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition shadow-md">
                Registruotis Šiai Paslaugai
            </button>
            <button onclick="closeServiceDetailModal()" class="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-xl text-xs transition">
                Uždaryti
            </button>
        </div>
    `;

    document.getElementById('serviceDetailModal').classList.remove('hidden');
}

function closeServiceDetailModal() {
    document.getElementById('serviceDetailModal').classList.add('hidden');
}

function openBookingModal(doctorName = '') {
    const doctorSelect = document.getElementById('modalDoctorSelect');
    if(doctorName && doctorSelect) {
        for(let option of doctorSelect.options) {
            if(option.value.includes(doctorName)) {
                option.selected = true;
                break;
            }
        }
    }
    document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
}

function handleBookingSubmit(e) {
    e.preventDefault();
    closeBookingModal();
    showToast("Vizito registracija priimta! Susisieksime patvirtinimui.");
}

function handleContactSubmit(e) {
    e.preventDefault();
    e.target.reset();
    showToast("Dėkojame! Jūsų žinutė gauta.");
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('hidden');
    if(menu.classList.contains('hidden')) {
        icon.className = "fa-solid fa-bars";
    } else {
        icon.className = "fa-solid fa-xmark";
    }
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if(hash) navigateTo(hash);
});

window.addEventListener('DOMContentLoaded', () => {
    renderKinezoServices();
    renderKinezoPrices();

    const initialHash = window.location.hash.replace('#', '');
    if(initialHash) {
        navigateTo(initialHash);
    } else {
        navigateTo('home');
    }

    window.addEventListener('click', (e) => {
        const bModal = document.getElementById('bookingModal');
        const sModal = document.getElementById('serviceDetailModal');
        if(e.target === bModal) closeBookingModal();
        if(e.target === sModal) closeServiceDetailModal();
    });
});