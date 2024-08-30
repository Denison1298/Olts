function openTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    }
}

function openSubTab(evt, subTabName) {
    var subTabcontent = document.getElementsByClassName("sub-tabcontent");
    for (var i = 0; i < subTabcontent.length; i++) {
        subTabcontent[i].style.display = "none";
    }

    var subTablinks = document.getElementsByClassName("sub-tablinks");
    for (var i = 0; i < subTablinks.length; i++) {
        subTablinks[i].className = subTablinks[i].className.replace(" active", "");
    }

    document.getElementById(subTabName).style.display = 'block';
    if (evt) {
        evt.currentTarget.className += ' active';
    }
}

function search() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    let found = false;

    // Esconder todos os resultados previamente exibidos
    const campoAltoResults = document.getElementById('campo-alto-results');
    campoAltoResults.style.display = 'none';

    const losAngelesResults = document.getElementById('los-angeles-results');
    losAngelesResults.style.display = 'none';

    const novaLimaResults = document.getElementById('nova-lima-results');
    novaLimaResults.style.display = 'none';

    const moreninhasResults = document.getElementById('moreninhas-results');
    moreninhasResults.style.display = 'none';

    if (input === "ceo") {
        campoAltoResults.style.display = 'block';
        found = true;
    } else if (input === "l.ceo") {
        losAngelesResults.style.display = 'block';
        found = true;
    } else if (input === "c.ceo") {
        openTab(null, 'caioba');
        found = true;
    } else if (input === "nl.ceo") {
        novaLimaResults.style.display = 'block';
        found = true;
    } else if (input === "m.ceo") {
        moreninhasResults.style.display = 'block';
        found = true;
    } else if (input === "t.ceo") {
        // Abrir a aba "U2000" e a sub-aba "Taquaral"
        openTab(null, 'u2000'); // Abre a aba 'U2000'
        openSubTab(null, 'taquaral-u2000'); // Abre a sub-aba 'Taquaral' dentro de 'U2000'
        found = true;
    } else {
        // Lógica de pesquisa genérica para outros termos
        const sections = document.querySelectorAll('.tabcontent');

        sections.forEach(section => {
            const items = section.querySelectorAll('li');
            let sectionFound = false;

            items.forEach(item => {
                const itemText = item.textContent.toLowerCase().trim();

                if (itemText.includes(input)) { // Verifica se o item inclui o texto buscado
                    sectionFound = true;
                    item.style.display = 'list-item';
                    item.style.backgroundColor = "#ffff99"; // Destacar o item encontrado
                    found = true;
                } else {
                    item.style.display = 'none'; // Esconder itens que não correspondem
                    item.style.backgroundColor = ""; // Remover destaque de itens que não correspondem
                }
            });

            if (sectionFound) {
                const tabButton = document.querySelector(`.tablinks[onclick*="${section.id}"]`);
                if (tabButton) {
                    openTab({ currentTarget: tabButton }, section.id);
                }

                const subTabs = section.querySelectorAll('.sub-tabcontent');
                subTabs.forEach(subTab => {
                    const subItems = subTab.querySelectorAll('li');
                    let subTabFound = false;

                    subItems.forEach(subItem => {
                        const subItemText = subItem.textContent.toLowerCase().trim();

                        if (subItemText.includes(input)) {
                            subTabFound = true;
                            subItem.style.display = 'list-item';
                            subItem.style.backgroundColor = "#036e11"; // Destacar o item encontrado
                            found = true;
                        } else {
                            subItem.style.display = 'none'; // Esconder itens que não correspondem
                            subItem.style.backgroundColor = ""; // Remover destaque de itens que não correspondem
                        }
                    });

                    if (subTabFound) {
                        subTab.style.display = 'block';
                        const subTabButton = document.querySelector(`.sub-tablinks[onclick*="${subTab.id}"]`);
                        if (subTabButton) {
                            openSubTab({ currentTarget: subTabButton }, subTab.id);
                        }
                    } else {
                        subTab.style.display = 'none';
                    }
                });
            } else {
                section.style.display = 'none';
            }
        });
    }

    if (!found) {
        alert('Nenhum resultado encontrado.');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        search();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const firstTabButton = document.querySelector('.tablinks');
    if (firstTabButton) {
        firstTabButton.click();
    }

    document.getElementById('searchInput').addEventListener('input', () => {
        const sections = document.querySelectorAll('.tabcontent');
        sections.forEach(section => {
            const items = section.querySelectorAll('li');
            items.forEach(item => {
                item.style.display = 'list-item';
                item.style.backgroundColor = ""; // Remover destaque de itens que não correspondem
            });
            section.style.display = 'none'; // Esconde todas as seções inicialmente
        });
    });
});
