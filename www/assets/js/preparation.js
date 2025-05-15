import { MEDICATIONS } from '../constants/medications.js';

const block = document.getElementById('medications-js-block');

let selectedMedications = [];

const GROUPS = [
    { name: 'Все', test: () => true },
    { name: 'А - Ж', test: name => /^[А-Ж]/i.test(name) },
    { name: 'З - Н', test: name => /^[З-Н]/i.test(name) },
    { name: 'О - У', test: name => /^[О-У]/i.test(name) },
    { name: 'Ф - Я', test: name => /^[Ф-Я]/i.test(name) },
];

let currentFilterFn = () => true;
let currentSearch = '';

function renderInitialSelector() {
    block.innerHTML = '';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'medications__input-wrapper';

    const input = document.createElement('input');
    input.placeholder = 'Введите название препарата';
    input.className = 'medications__input';

    input.addEventListener('focus', () => {
        if (!document.querySelector('.medications__filters')) {
            renderMedicationsUI(inputWrapper);
        }
    });

    input.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim().toLowerCase();
        renderMedicationsItems();
    });

    inputWrapper.appendChild(input);
    block.appendChild(inputWrapper);
}

function renderMedicationsUI(afterElement) {
    const filterNav = document.createElement('div');
    filterNav.className = 'medications__filters';
    GROUPS.forEach(group => {
        const btn = document.createElement('button');
        btn.textContent = group.name;
        btn.addEventListener('click', () => {
            currentFilterFn = group.test;
            renderMedicationsItems();
        });
        filterNav.appendChild(btn);
    });

    const medsList = document.createElement('div');
    medsList.className = 'medications__list';

    const doneBtn = document.createElement('button');
    doneBtn.className = 'medications__done';
    doneBtn.textContent = 'Завершить';
    doneBtn.addEventListener('click', () => {
        currentSearch = '';
        renderDosageSelector();
    });

    block.insertBefore(filterNav, afterElement.nextSibling);
    block.insertBefore(medsList, filterNav.nextSibling);
    block.insertBefore(doneBtn, medsList.nextSibling);

    renderMedicationsItems();
}

function renderMedicationsItems() {
    const medsList = document.querySelector('.medications__list');
    if (!medsList) return;

    medsList.innerHTML = '';

    const meds = MEDICATIONS
        .filter(med => !selectedMedications.find(sel => sel.id === med.id))
        .filter(med => currentFilterFn(med.name))
        .filter(med => med.name.toLowerCase().includes(currentSearch));

    meds.forEach(med => {
        const item = document.createElement('div');
        item.className = 'medications__item';
        item.textContent = med.name;
        item.addEventListener('click', () => {
            selectedMedications.push({ ...med, dosage: 1 });
            currentSearch = '';
            renderDosageSelector();
        });
        medsList.appendChild(item);
    });

    if (meds.length === 0) {
        const empty = document.createElement('div');
        empty.textContent = 'Ничего не найдено';
        empty.className = 'medications__empty';
        medsList.appendChild(empty);
    }
}

function renderDosageSelector() {
    block.innerHTML = '';

    // Добавляем/удаляем модификатор в зависимости от наличия выбранных препаратов
    if (selectedMedications.length > 0) {
        block.classList.add('medications--selected');
    } else {
        block.classList.remove('medications--selected');
    }

    const title = document.createElement('div');
    title.textContent = 'Укажите дозировки';
    title.className = 'medications__title';
    block.appendChild(title);

    selectedMedications.forEach((med, index) => {
        const medRow = document.createElement('div');
        medRow.className = 'medications__selected';

        const name = document.createElement('div');
        name.textContent = med.name;
        name.className = 'medications__selected-name';

        const dosageRow = document.createElement('div');
        dosageRow.className = 'medications__dosage-row';

        const select = document.createElement('select');
        select.className = 'medications__dosage-select';
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}`;
            if (i === med.dosage) option.selected = true;
            select.appendChild(option);
        }
        select.addEventListener('change', e => {
            selectedMedications[index].dosage = +e.target.value;
        });

        const delBtn = document.createElement('button');
        delBtn.className = 'medications__delete';
        const icon = document.createElement('img');
        icon.src = '/assets/images/icons/trash-ico.svg';
        icon.alt = 'Удалить';
        delBtn.appendChild(icon);
        icon.className = 'medications__delete-icon';
        delBtn.addEventListener('click', () => {
            selectedMedications.splice(index, 1);
            renderDosageSelector(); 
        });

        dosageRow.appendChild(select);
        dosageRow.appendChild(delBtn);

        medRow.appendChild(name);
        medRow.appendChild(dosageRow);
        block.appendChild(medRow);
    });

    const addBtn = document.createElement('button');
    addBtn.textContent = '+ Добавить препарат';
    addBtn.className = 'medications__add';
    addBtn.addEventListener('click', () => {
        renderInitialSelector();
    });

    block.appendChild(addBtn);
}


renderInitialSelector();
