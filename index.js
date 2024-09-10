import { parse } from './gramatica/gramatica.js';
import { InterpreterVisitor } from './Compilador/interprete.js';

document.getElementById('new-file').addEventListener('click', createNewFile);
document.getElementById('save-file').addEventListener('click', saveFile);
document.getElementById('open-file').addEventListener('click', () => document.getElementById('file-input').click());
document.getElementById('file-input').addEventListener('change', openFile);
document.getElementById('run').addEventListener('click', run);
const salida = document.getElementById('consoleOutput');
let tabs = [];
let activeTab = null;

// Crear un nuevo archivo en blanco
function createNewFile() {
    const fileName = prompt("Nombre del archivo:", `nuevoArchivo${tabs.length + 1}.oak`);
    if (!fileName) return;

    const newTab = { name: fileName, content: '' };
    tabs.push(newTab);
    activeTab = newTab;
    updateTabs();
    updateEditor();
}

// Guardar el archivo actual
function saveFile() {
    if (!activeTab) return;

    const fileContent = document.getElementById('codeEditor').value;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = activeTab.name;
    link.click();
}

// Abrir un archivo desde el sistema
function openFile(event) {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith('.oak')) {
        alert('Solo se permiten archivos .oak');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        const newTab = { name: file.name, content: fileContent };
        tabs.push(newTab);
        activeTab = newTab;
        updateTabs();
        updateEditor();
    };
    reader.readAsText(file);
}

function updateTabs() {
    const tabContainer = document.getElementById('tabs-container');
    tabContainer.innerHTML = ''; // Limpiar las pestañas anteriores

    tabs.forEach(tab => {
        const tabElement = document.createElement('div');
        tabElement.classList.add('tab');
        tabElement.textContent = tab.name;
        if (tab === activeTab) {
            tabElement.classList.add('active');
        }
        tabElement.addEventListener('click', () => {
            activeTab = tab;
            updateTabs();
            updateEditor();
        });
        tabContainer.appendChild(tabElement);
    });
}

// Actualizar el contenido del editor
function updateEditor() {
    if (activeTab) {
        document.getElementById('codeEditor').value = activeTab.content;
    } else {
        document.getElementById('codeEditor').value = '';
    }
}

function run(){
    const code = document.getElementById('codeEditor').value;
    try {
        console.log(code);
        const sentencias = parse(code);
        const interprete = new InterpreterVisitor();
        console.log({sentencias})
        for (let i = 0; i < sentencias.length; i++) {
            try{
                if (sentencias[i].tipo !== undefined) {
                    sentencias[i].accept(interprete);
                }
                salida.innerHTML = interprete?.salida || "";
                console.log(interprete.salida)
            }catch(error){
                console.log(error)
            }
        }
 
    } catch (error) {
        console.log(error)
        salida.innerHTML += error.message + ' at line ' + error.location.start.line + ' column ' + error.location.start.column
   }
}
// Actualizar el contenido del archivo actual al escribir
document.getElementById('codeEditor').addEventListener('input', () => {
    if (activeTab) {
        activeTab.content = document.getElementById('codeEditor').value;
    }
});

