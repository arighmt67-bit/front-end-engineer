/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 */

// ── Storage & State ──────────────────────────────────────
const STORAGE_KEY = 'transactions';
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;
let searchKeyword = '';

// ── Utilities ────────────────────────────────────────────
const generateId    = () => +new Date();
const saveToStorage = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
const formatRupiah  = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

// ── DOM References ───────────────────────────────────────
const incomeList  = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');

const transactionForm        = document.getElementById('transactionForm');
const titleInput             = document.getElementById('transactionFormTitleInput');
const amountInput            = document.getElementById('transactionFormAmountInput');
const dateInput              = document.getElementById('transactionFormDateInput');
const typeSelect             = document.getElementById('transactionFormTypeSelect');
const submitButton           = document.querySelector('[data-testid="transactionFormSubmitButton"]');

const searchForm             = document.getElementById('searchTransactionForm');
const searchInput            = document.getElementById('searchTransactionFormTitleInput');

const balanceEl   = document.querySelector('.tracker-summary__balance-amount');
const incomeEl    = document.querySelector('.tracker-summary__stat-amount--income');
const expenseEl   = document.querySelector('.tracker-summary__stat-amount--expense');
const formHeading = document.querySelector('.tracker-form-section__heading');

// ── Create Card Element ──────────────────────────────────
function createCard(tx) {
  const isIncome = tx.type === 'income';

  const card = document.createElement('div');
  card.setAttribute('data-testid', 'transactionItem');
  card.className = 'tracker-transaction-item';
  card.dataset.id = tx.id;

  const icon = document.createElement('div');
  icon.className = `tracker-transaction-item__icon tracker-transaction-item__icon--${tx.type}`;
  icon.textContent = isIncome ? '↑' : '↓';

  const detail = document.createElement('div');
  detail.className = 'tracker-transaction-item__detail';

  const title = document.createElement('h3');
  title.setAttribute('data-testid', 'transactionItemTitle');
  title.className = 'tracker-transaction-item__title';
  title.textContent = tx.title;

  const date = document.createElement('p');
  date.setAttribute('data-testid', 'transactionItemDate');
  date.className = 'tracker-transaction-item__date';
  date.textContent = `Date: ${tx.date}`;

  detail.appendChild(title);
  detail.appendChild(date);

  const right = document.createElement('div');
  right.className = 'tracker-transaction-item__right';

  const amount = document.createElement('p');
  amount.setAttribute('data-testid', 'transactionItemAmount');
  amount.className = `tracker-transaction-item__amount tracker-transaction-item__amount--${tx.type}`;
  amount.textContent = `Amount: ${formatRupiah(tx.amount)}`;

  const typeLabel = document.createElement('p');
  typeLabel.setAttribute('data-testid', 'transactionItemType');
  typeLabel.className = 'tracker-transaction-item__type-label';
  typeLabel.textContent = `Type: ${isIncome ? 'Income' : 'Expense'}`;

  const actions = document.createElement('div');
  actions.className = 'tracker-transaction-item__actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'tracker-transaction-item__btn tracker-transaction-item__btn--edit';
  editBtn.textContent = 'Ubah';
  editBtn.addEventListener('click', () => handleEdit(tx.id));

  const toggleBtn = document.createElement('button');
  toggleBtn.setAttribute('data-testid', 'transactionItemEditTypeButton');
  toggleBtn.className = 'tracker-transaction-item__btn tracker-transaction-item__btn--toggle';
  toggleBtn.textContent = 'Ubah Tipe';
  toggleBtn.addEventListener('click', () => handleToggleType(tx.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('data-testid', 'transactionItemDeleteButton');
  deleteBtn.className = 'tracker-transaction-item__btn tracker-transaction-item__btn--delete';
  deleteBtn.textContent = 'Hapus';
  deleteBtn.addEventListener('click', () => handleDelete(tx.id));

  actions.appendChild(editBtn);
  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);

  right.appendChild(amount);
  right.appendChild(typeLabel);
  right.appendChild(actions);

  card.appendChild(icon);
  card.appendChild(detail);
  card.appendChild(right);

  // entrance animation
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.3s cubic-bezier(0.2,0,0,1), transform 0.3s cubic-bezier(0.2,0,0,1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  return card;
}

// ── Render ───────────────────────────────────────────────
function renderTransactions() {
  incomeList.innerHTML = '';
  expenseList.innerHTML = '';

  const keyword = searchKeyword.toLowerCase().trim();
  const filtered = keyword
    ? transactions.filter(tx => tx.title.toLowerCase().includes(keyword))
    : transactions;

  filtered.forEach(tx => {
    const card = createCard(tx);
    if (tx.type === 'income') {
      incomeList.appendChild(card);
    } else {
      expenseList.appendChild(card);
    }
  });
}

// ── Update Dashboard ─────────────────────────────────────
function updateDashboard() {
  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance      = totalIncome - totalExpense;

  balanceEl.textContent  = formatRupiah(balance);
  incomeEl.textContent   = formatRupiah(totalIncome);
  expenseEl.textContent  = formatRupiah(totalExpense);
}

// ── Custom Event Listener ─────────────────────────────────
document.addEventListener('transaction:updated', () => {
  renderTransactions();
  updateDashboard();
});

// ── Form Submit ──────────────────────────────────────────
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title  = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const date   = dateInput.value;
  const type   = typeSelect.value;

  if (!title) {
    alert('Keterangan tidak boleh kosong!');
    return;
  }
  if (amount < 1) {
    alert('Nominal harus lebih dari 0!');
    return;
  }

  if (editingId !== null) {
    // Update existing
    transactions = transactions.map(tx =>
      tx.id === editingId ? { ...tx, title, amount, date, type } : tx
    );
    editingId = null;
    submitButton.textContent = 'Simpan';
    formHeading.textContent = 'Tambah Pencatatan Baru';
  } else {
    // Add new
    const newTx = { id: generateId(), title, amount, date, type };
    transactions.push(newTx);
  }

  saveToStorage();
  transactionForm.reset();
  document.dispatchEvent(new Event('transaction:updated'));
});

// ── Edit ─────────────────────────────────────────────────
function handleEdit(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;

  editingId = id;
  titleInput.value  = tx.title;
  amountInput.value = tx.amount;
  dateInput.value   = tx.date;
  typeSelect.value  = tx.type;

  submitButton.textContent = 'Perbarui';
  formHeading.textContent = 'Edit Pencatatan';
  titleInput.focus();
}

// ── Toggle Type ───────────────────────────────────────────
function handleToggleType(id) {
  transactions = transactions.map(tx =>
    tx.id === id ? { ...tx, type: tx.type === 'income' ? 'expense' : 'income' } : tx
  );
  saveToStorage();
  document.dispatchEvent(new Event('transaction:updated'));
}

// ── Delete ────────────────────────────────────────────────
function handleDelete(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  saveToStorage();
  document.dispatchEvent(new Event('transaction:updated'));
}

// ── Search ────────────────────────────────────────────────
searchForm.addEventListener('submit', (e) => e.preventDefault());

searchInput.addEventListener('input', (e) => {
  searchKeyword = e.target.value;
  renderTransactions();
});

// ── Init ──────────────────────────────────────────────────
document.dispatchEvent(new Event('transaction:updated'));
