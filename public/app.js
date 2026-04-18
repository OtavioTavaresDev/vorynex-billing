// Verificar autenticação
const userData = JSON.parse(localStorage.getItem('vorynex_user') || 'null');
if (!userData) {
  window.location.href = '/index.html';
}

// --- Internacionalização (i18n) ---
const translations = {
  pt: {
    dashboard: 'Dashboard',
    clients: 'Clientes',
    transactions: 'Transações',
    dataAnalysis: 'Análise de dados',
    invoices: 'Notas fiscais',
    refreshData: 'Atualizar dados',
    whyVorynex: 'Por que escolher a Vorynex?',
    deepAnalysis: 'Análise profunda de dados',
    premium: 'Premium',
    aiReview: 'Revisão com IA',
    upgrade: 'Atualizar para versão oficial',
    license: 'Certificado de Licença',
    logout: 'Sair',
    demoWarning: 'Versão DEMO limitada a 3 clientes, 3 transações e 3 usuários. Para acesso completo, adquira a versão completa.',
    totalRevenue: 'Receita Total',
    monthlyRevenue: 'Receita do Mês',
    limit: 'Limite',
    revenue: 'Receita',
    last7days: 'Últimos 7 dias',
    today: 'Hoje (1 dia)',
    last30days: 'Últimos 30 dias',
    lastYear: 'Último ano',
    custom: 'Personalizado...',
    bars: 'Barras',
    line: 'Linha',
    area: 'Área',
    to: 'até',
    apply: 'Aplicar',
    noData: 'Sem dados para o período selecionado.',
    name: 'Nome',
    actions: 'Ações',
    new: 'Novo',
    demoLimitClients: 'Limite demo: 3 clientes.',
    demoLimitTransactions: 'Limite demo: 3 transações.',
    client: 'Cliente',
    amount: 'Valor',
    date: 'Data',
    cancel: 'Cancelar',
    save: 'Salvar',
    close: 'Fechar',
    licenseCert: 'Certificado de Licença (Demo)',
    licenseText1: 'Esta é uma licença de avaliação limitada a:',
    licenseItem1: '3 clientes',
    licenseItem2: '3 transações',
    licenseItem3: '3 usuários',
    licenseText2: 'Para uso comercial ou sem limitações, adquira a versão completa em www.vorynex.com.',
    edit: 'Editar',
    delete: 'Excluir',
    search: 'Buscar...',
    filter: 'Filtrar...'
  },
  en: {
    dashboard: 'Dashboard',
    clients: 'Clients',
    transactions: 'Transactions',
    dataAnalysis: 'Data Analysis',
    invoices: 'Invoices',
    refreshData: 'Refresh Data',
    whyVorynex: 'Why choose Vorynex?',
    deepAnalysis: 'Deep Data Analysis',
    premium: 'Premium',
    aiReview: 'AI Review',
    upgrade: 'Upgrade to official version',
    license: 'License Certificate',
    logout: 'Logout',
    demoWarning: 'DEMO version limited to 3 clients, 3 transactions and 3 users. For full access, purchase the complete version.',
    totalRevenue: 'Total Revenue',
    monthlyRevenue: 'Monthly Revenue',
    limit: 'Limit',
    revenue: 'Revenue',
    last7days: 'Last 7 days',
    today: 'Today (1 day)',
    last30days: 'Last 30 days',
    lastYear: 'Last year',
    custom: 'Custom...',
    bars: 'Bars',
    line: 'Line',
    area: 'Area',
    to: 'to',
    apply: 'Apply',
    noData: 'No data for the selected period.',
    name: 'Name',
    actions: 'Actions',
    new: 'New',
    demoLimitClients: 'Demo limit: 3 clients.',
    demoLimitTransactions: 'Demo limit: 3 transactions.',
    client: 'Client',
    amount: 'Amount',
    date: 'Date',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    licenseCert: 'License Certificate (Demo)',
    licenseText1: 'This is an evaluation license limited to:',
    licenseItem1: '3 clients',
    licenseItem2: '3 transactions',
    licenseItem3: '3 users',
    licenseText2: 'For commercial use or without limitations, purchase the full version at www.vorynex.com.',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search...',
    filter: 'Filter...'
  },
  es: {
    dashboard: 'Panel',
    clients: 'Clientes',
    transactions: 'Transacciones',
    dataAnalysis: 'Análisis de datos',
    invoices: 'Facturas',
    refreshData: 'Actualizar datos',
    whyVorynex: '¿Por qué elegir Vorynex?',
    deepAnalysis: 'Análisis profundo de datos',
    premium: 'Premium',
    aiReview: 'Revisión con IA',
    upgrade: 'Actualizar a versión oficial',
    license: 'Certificado de licencia',
    logout: 'Salir',
    demoWarning: 'Versión DEMO limitada a 3 clientes, 3 transacciones y 3 usuarios. Para acceso completo, adquiera la versión completa.',
    totalRevenue: 'Ingresos Totales',
    monthlyRevenue: 'Ingresos del Mes',
    limit: 'Límite',
    revenue: 'Ingresos',
    last7days: 'Últimos 7 días',
    today: 'Hoy (1 día)',
    last30days: 'Últimos 30 días',
    lastYear: 'Último año',
    custom: 'Personalizado...',
    bars: 'Barras',
    line: 'Línea',
    area: 'Área',
    to: 'hasta',
    apply: 'Aplicar',
    noData: 'Sin datos para el período seleccionado.',
    name: 'Nombre',
    actions: 'Acciones',
    new: 'Nuevo',
    demoLimitClients: 'Límite demo: 3 clientes.',
    demoLimitTransactions: 'Límite demo: 3 transacciones.',
    client: 'Cliente',
    amount: 'Valor',
    date: 'Fecha',
    cancel: 'Cancelar',
    save: 'Guardar',
    close: 'Cerrar',
    licenseCert: 'Certificado de Licencia (Demo)',
    licenseText1: 'Esta es una licencia de evaluación limitada a:',
    licenseItem1: '3 clientes',
    licenseItem2: '3 transacciones',
    licenseItem3: '3 usuarios',
    licenseText2: 'Para uso comercial o sin limitaciones, adquiera la versión completa en www.vorynex.com.',
    edit: 'Editar',
    delete: 'Eliminar',
    search: 'Buscar...',
    filter: 'Filtrar...'
  }
};

let currentLang = localStorage.getItem('language') || 'pt';
window.translations = translations;
window.currentLang = currentLang;

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  window.currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

const langSelect = document.getElementById('languageSelect');
if (langSelect) {
  langSelect.value = currentLang;
  langSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
    updateRoleText();
  });
}

applyLanguage(currentLang);

const currentUser = userData.username;
const userRole = userData.role;

function updateRoleText() {
  const roleEl = document.getElementById('userRole');
  if (roleEl) {
    if (currentLang === 'pt') roleEl.textContent = userRole === 'admin' ? 'Administrador' : 'Funcionário';
    else if (currentLang === 'en') roleEl.textContent = userRole === 'admin' ? 'Administrator' : 'Employee';
    else roleEl.textContent = userRole === 'admin' ? 'Administrador' : 'Empleado';
  }
}

document.getElementById('loggedUser').textContent = currentUser;
updateRoleText();
document.getElementById('userInitial').textContent = currentUser.charAt(0).toUpperCase();

const canDelete = userRole === 'admin';
const canEdit = userRole === 'admin';
const canAddClient = userRole === 'admin';

const addClientBtn = document.getElementById('addClientBtn');
if (!canAddClient && addClientBtn) addClientBtn.style.display = 'none';

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('vorynex_user');
  window.location.href = '/index.html';
});

let clients = [];
let transactions = [];
let chartInstance = null;
let clientLimitReached = false;
let transactionLimitReached = false;

const clientModal = document.getElementById('clientModal');
const transactionModal = document.getElementById('transactionModal');
const closeClientModal = document.getElementById('closeClientModal');
const closeTransactionModal = document.getElementById('closeTransactionModal');

if (addClientBtn) {
  addClientBtn.addEventListener('click', () => {
    if (clientLimitReached) {
      alert('Limite de clientes da versão demo atingido (3).');
      return;
    }
    document.getElementById('clientModalTitle').textContent = translations[currentLang].new + ' ' + translations[currentLang].client;
    document.getElementById('clientId').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('clientEmail').value = '';
    clientModal.classList.remove('hidden');
    clientModal.classList.add('flex');
  });
}

const addTransactionBtn = document.getElementById('addTransactionBtn');
if (addTransactionBtn) {
  addTransactionBtn.addEventListener('click', () => {
    if (transactionLimitReached) {
      alert('Limite de transações da versão demo atingido (3).');
      return;
    }
    document.getElementById('transactionForm').reset();
    loadClientsToSelect();
    transactionModal.classList.remove('hidden');
    transactionModal.classList.add('flex');
  });
}

if (closeClientModal) {
  closeClientModal.addEventListener('click', () => {
    clientModal.classList.add('hidden');
    clientModal.classList.remove('flex');
  });
}
if (closeTransactionModal) {
  closeTransactionModal.addEventListener('click', () => {
    transactionModal.classList.add('hidden');
    transactionModal.classList.remove('flex');
  });
}

window.addEventListener('click', (e) => {
  if (e.target === clientModal) {
    clientModal.classList.add('hidden'); clientModal.classList.remove('flex');
  }
  if (e.target === transactionModal) {
    transactionModal.classList.add('hidden'); transactionModal.classList.remove('flex');
  }
});

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

async function loadClientsToSelect() {
  const select = document.getElementById('transactionClientId');
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  clients.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.name;
    select.appendChild(option);
  });
}

async function loadDashboardData() {
  try {
    const [clientsRes, transRes, limitsRes] = await Promise.all([
      fetch('/api/clients'),
      fetch('/api/transactions'),
      fetch('/api/limits')
    ]);
    clients = await clientsRes.json();
    transactions = await transRes.json();
    const limits = await limitsRes.json();
    
    clientLimitReached = limits.clients >= limits.maxClients;
    transactionLimitReached = limits.transactions >= limits.maxTransactions;
    
    updateMetrics();
    renderTables();
    renderChart();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

function updateMetrics() {
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalEl = document.getElementById('totalRevenue');
  if (totalEl) totalEl.textContent = formatCurrency(totalRevenue);
  
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const monthly = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
  });
  const monthlyRevenue = monthly.reduce((sum, t) => sum + t.amount, 0);
  const monthlyEl = document.getElementById('monthlyRevenue');
  if (monthlyEl) monthlyEl.textContent = formatCurrency(monthlyRevenue);
  
  const totalClientsEl = document.getElementById('totalClients');
  if (totalClientsEl) totalClientsEl.textContent = clients.length;
  const totalTransEl = document.getElementById('totalTransactions');
  if (totalTransEl) totalTransEl.textContent = transactions.length;
  
  const growth = (Math.random() * 20 - 5).toFixed(1);
  const monthlyGrowth = (Math.random() * 15 - 2).toFixed(1);
  const revGrowthEl = document.getElementById('revenueGrowth');
  if (revGrowthEl) revGrowthEl.textContent = `${growth > 0 ? '+' : ''}${growth}%`;
  const monthlyGrowthEl = document.getElementById('monthlyGrowth');
  if (monthlyGrowthEl) monthlyGrowthEl.textContent = `${monthlyGrowth > 0 ? '+' : ''}${monthlyGrowth}%`;
}

function renderTables() {
  renderClientsTable();
  renderTransactionsTable();
}

let filteredClients = [];
let clientSearchTerm = '';
const clientSearch = document.getElementById('clientSearch');
if (clientSearch) {
  clientSearch.addEventListener('input', (e) => {
    clientSearchTerm = e.target.value.toLowerCase();
    renderClientsTable();
  });
}

function renderClientsTable() {
  const tbody = document.getElementById('clientsTableBody');
  if (!tbody) return;
  filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearchTerm) || 
    c.email.toLowerCase().includes(clientSearchTerm)
  );
  tbody.innerHTML = '';
  filteredClients.forEach(client => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3 dark:text-gray-200">${client.id}</td>
      <td class="px-4 py-3 font-medium dark:text-white">${client.name}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${client.email}</td>
      <td class="px-4 py-3">
        <div class="flex space-x-2">
          ${canEdit ? `<button class="edit-client text-indigo-600 hover:text-indigo-800 dark:text-indigo-400" data-id="${client.id}">${translations[currentLang].edit}</button>` : ''}
          ${canDelete ? `<button class="delete-client text-red-600 hover:text-red-800 dark:text-red-400" data-id="${client.id}">${translations[currentLang].delete}</button>` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.edit-client').forEach(btn => btn.addEventListener('click', () => editClient(btn.dataset.id)));
  document.querySelectorAll('.delete-client').forEach(btn => btn.addEventListener('click', () => deleteClient(btn.dataset.id)));
}

let transactionSearchTerm = '';
const transSearch = document.getElementById('transactionSearch');
if (transSearch) {
  transSearch.addEventListener('input', (e) => {
    transactionSearchTerm = e.target.value.toLowerCase();
    renderTransactionsTable();
  });
}

function renderTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  if (!tbody) return;
  const filtered = transactions.filter(t => 
    t.client_name.toLowerCase().includes(transactionSearchTerm) ||
    t.id.toString().includes(transactionSearchTerm) ||
    formatCurrency(t.amount).toLowerCase().includes(transactionSearchTerm)
  );
  tbody.innerHTML = '';
  filtered.slice().reverse().forEach(trans => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3 dark:text-gray-200">${trans.id}</td>
      <td class="px-4 py-3 font-medium dark:text-white">${trans.client_name}</td>
      <td class="px-4 py-3 dark:text-gray-200">${formatCurrency(trans.amount)}</td>
      <td class="px-4 py-3 dark:text-gray-200">${new Date(trans.date).toLocaleDateString('pt-BR')}</td>
      <td class="px-4 py-3">
        ${canDelete ? `<button class="delete-transaction text-red-600 hover:text-red-800 dark:text-red-400" data-id="${trans.id}">${translations[currentLang].delete}</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.delete-transaction').forEach(btn => btn.addEventListener('click', () => deleteTransaction(btn.dataset.id)));
}

function filterTransactionsByPeriod(periodDays, customStart = null, customEnd = null) {
  const now = new Date();
  let startDate, endDate;
  
  if (periodDays === 'custom' && customStart && customEnd) {
    startDate = new Date(customStart);
    endDate = new Date(customEnd);
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);
    startDate = new Date(now);
    startDate.setDate(now.getDate() - parseInt(periodDays) + 1);
    startDate.setHours(0, 0, 0, 0);
  }
  
  return transactions.filter(t => {
    const d = new Date(t.date);
    return d >= startDate && d <= endDate;
  });
}

function aggregateByDay(filteredTransactions) {
  const byDate = new Map();
  filteredTransactions.forEach(t => {
    const dateStr = t.date;
    byDate.set(dateStr, (byDate.get(dateStr) || 0) + t.amount);
  });
  const sorted = Array.from(byDate.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  return {
    dates: sorted.map(e => e[0]),
    amounts: sorted.map(e => e[1])
  };
}

function renderChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;
  
  const periodSelect = document.getElementById('chartPeriod');
  const chartTypeEl = document.getElementById('chartType');
  if (!periodSelect || !chartTypeEl) return;
  
  const chartType = chartTypeEl.value;
  const customDiv = document.getElementById('customPeriodInputs');
  const noDataMsg = document.getElementById('noDataMessage');
  
  let periodDays = periodSelect.value;
  let filtered;
  
  if (periodDays === 'custom') {
    if (customDiv) customDiv.classList.remove('hidden');
    const start = document.getElementById('startDate')?.value;
    const end = document.getElementById('endDate')?.value;
    if (!start || !end) {
      filtered = filterTransactionsByPeriod(7);
    } else {
      filtered = filterTransactionsByPeriod('custom', start, end);
    }
  } else {
    if (customDiv) customDiv.classList.add('hidden');
    filtered = filterTransactionsByPeriod(parseInt(periodDays));
  }
  
  const { dates, amounts } = aggregateByDay(filtered);
  
  if (dates.length === 0) {
    if (noDataMsg) noDataMsg.classList.remove('hidden');
    if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
    return;
  } else {
    if (noDataMsg) noDataMsg.classList.add('hidden');
  }
  
  const formattedDates = dates.map(d => {
    const date = new Date(d);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  });
  
  const ctx = canvas.getContext('2d');
  if (chartInstance) chartInstance.destroy();
  
  const config = {
    type: chartType === 'area' ? 'line' : chartType,
    data: {
      labels: formattedDates,
      datasets: [{
        label: translations[currentLang].revenue + ' (R$)',
        data: amounts,
        backgroundColor: chartType === 'area' ? 'rgba(79, 70, 229, 0.2)' : '#4F46E5',
        borderColor: '#4F46E5',
        borderWidth: 2,
        tension: 0.3,
        fill: chartType === 'area',
        borderRadius: chartType === 'bar' ? 6 : 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Valor: ${formatCurrency(ctx.raw)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatCurrency(value)
          }
        }
      }
    }
  };
  
  chartInstance = new Chart(ctx, config);
}

// Event listeners do gráfico
const periodSelect = document.getElementById('chartPeriod');
const chartTypeEl = document.getElementById('chartType');
if (periodSelect) periodSelect.addEventListener('change', renderChart);
if (chartTypeEl) chartTypeEl.addEventListener('change', renderChart);
document.querySelectorAll('.period-shortcut').forEach(btn => {
  btn.addEventListener('click', () => {
    const period = btn.dataset.period;
    const periodSel = document.getElementById('chartPeriod');
    if (periodSel) {
      periodSel.value = period;
      renderChart();
    }
  });
});
const applyBtn = document.getElementById('applyCustomPeriod');
if (applyBtn) applyBtn.addEventListener('click', renderChart);

// CRUD
async function editClient(id) {
  const client = clients.find(c => c.id == id);
  if (!client) return;
  document.getElementById('clientModalTitle').textContent = translations[currentLang].edit + ' ' + translations[currentLang].client;
  document.getElementById('clientId').value = client.id;
  document.getElementById('clientName').value = client.name;
  document.getElementById('clientEmail').value = client.email;
  clientModal.classList.remove('hidden'); clientModal.classList.add('flex');
}

async function deleteClient(id) {
  if (!confirm(translations[currentLang].delete + '?')) return;
  const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
  if (res.ok) loadDashboardData(); else alert('Erro ao excluir');
}

const clientForm = document.getElementById('clientForm');
if (clientForm) {
  clientForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('clientId').value;
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/clients/${id}` : '/api/clients';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    if (res.ok) {
      clientModal.classList.add('hidden'); clientModal.classList.remove('flex');
      loadDashboardData();
    } else {
      const err = await res.json();
      alert(err.error || 'Erro ao salvar');
    }
  });
}

async function deleteTransaction(id) {
  if (!confirm(translations[currentLang].delete + '?')) return;
  const res = await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
  if (res.ok) loadDashboardData(); else alert('Erro ao excluir');
}

const transForm = document.getElementById('transactionForm');
if (transForm) {
  transForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const client_id = document.getElementById('transactionClientId').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const date = document.getElementById('transactionDate').value;
    const res = await fetch('/api/transactions', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id, amount, date })
    });
    if (res.ok) {
      transactionModal.classList.add('hidden'); transactionModal.classList.remove('flex');
      loadDashboardData();
    } else {
      const err = await res.json();
      alert(err.error || 'Erro ao criar transação');
    }
  });
}

// Inicializar
loadDashboardData();

// Datas padrão para custom period
const today = new Date();
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
if (startDate) startDate.value = lastWeek.toISOString().split('T')[0];
if (endDate) endDate.value = today.toISOString().split('T')[0];

// Tema
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
if (themeToggle) {
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
  themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    }
  });
}

// Modal de Licença
const licenseModal = document.getElementById('licenseModal');
const licenseLink = document.getElementById('licenseLink');
if (licenseLink && licenseModal) {
  licenseLink.addEventListener('click', (e) => {
    e.preventDefault();
    licenseModal.classList.remove('hidden');
    licenseModal.classList.add('flex');
  });
  document.getElementById('closeLicenseModal').addEventListener('click', () => {
    licenseModal.classList.add('hidden');
    licenseModal.classList.remove('flex');
  });
  licenseModal.addEventListener('click', (e) => {
    if (e.target === licenseModal) {
      licenseModal.classList.add('hidden');
      licenseModal.classList.remove('flex');
    }
  });
}
