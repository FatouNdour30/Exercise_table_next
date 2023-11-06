const students = [];
const resultsDiv = document.getElementById("results");

function displayStudent(student) {
    const tableBody = document.getElementById("studentsTable");
    const row = tableBody.insertRow();
    student.forEach(data => {
        const cell = row.insertCell();
        cell.textContent = data;
    });
}

function addStudent() {
    const id = prompt("Entrez l'ID de l'élève");
    const nom = prompt("Entrez le nom de l'élève");
    const prenom = prompt("Entrez le prénom de l'élève");
    const statut = prompt("Entrez le statut de l'élève (Présent ou Absent)");
    const age = prompt("Entrez l'âge de l'élève");
    const note = prompt("Entrez la note de l'élève");

    const student = [id, nom, prenom, statut, age, note];
    students.push(student);

    displayStudent(student);
}

const addButton = document.createElement("button");
addButton.textContent = "Ajouter un élève";
addButton.className = "btn btn-primary";
addButton.addEventListener("click", addStudent);
document.body.appendChild(addButton);

function filterStudents(predicate) {
    return students.filter(student => predicate(student));
}

function displayStudents(title, filteredStudents, format) {
    resultsDiv.innerHTML += `<h2>${title} (${filteredStudents.length}) :</h2>`;
    if (filteredStudents.length === 0) {
        resultsDiv.innerHTML += "<p>Aucun élève trouvé.</p>";
    } else {
        const list = document.createElement("ul");
        filteredStudents.forEach(student => {
            const listItem = document.createElement("li");
            listItem.textContent = format(student);
            list.appendChild(listItem);
        });
        resultsDiv.appendChild(list);
    }
}

function formatStudent(student) {
    return `${student[1]} ${student[2]} (${student[5]})`;
}

function formatStudentWithoutAge(student) {
    return `${student[1]} ${student[2]}`;
}

function displayResults() {
    resultsDiv.innerHTML = ""; // Efface le contenu précédent

    const studentsWithoutAge = filterStudents(student => student[4] === "");
    displayStudents("Liste des élèves sans âge", studentsWithoutAge, formatStudentWithoutAge);

    const presentStudents = filterStudents(student => student[3].toLowerCase() === "présent");
    displayStudents("Liste des élèves présents", presentStudents, formatStudent);

    const highNoteStudents = filterStudents(student => parseFloat(student[5]) >= 10);
    displayStudents("Liste des élèves avec note >= 10", highNoteStudents, formatStudent);
}
