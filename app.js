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
                const id = document.getElementById("studentId").value;
                const nom = document.getElementById("studentNom").value;
                const prenom = document.getElementById("studentPrenom").value;
                const statut = document.getElementById("studentStatut").value;
                const age = document.getElementById("studentAge").value;
                const note = document.getElementById("studentNote").value;

                const student = [id, nom, prenom, statut, age, note];
                students.push(student);

                displayStudent(student);
                displayResults();
            }

            const form = document.createElement("form");
            form.innerHTML = `
                <label>ID de l'élève:</label>
                <input type="text" id="studentId"><br>

                <label>Nom de l'élève:</label>
                <input type="text" id="studentNom"><br>

                <label>Prénom de l'élève:</label>
                <input type="text" id="studentPrenom"><br>

                <label>Statut de l'élève (Présent ou Absent):</label>
                <input type="text" id="studentStatut"><br>

                <label>Âge de l'élève:</label>
                <input type="text" id="studentAge"><br>

                <label>Note de l'élève:</label>
                <input type="text" id="studentNote"><br>

                <button type="button" class="btn btn-primary" onclick="addStudent()">Ajouter un élève</button>
            `;
            document.body.appendChild(form);

            function filterStudents(predicate) {
                return students.filter(student => predicate(student));
            }

            function displayStudents(title, filteredStudents, format) {
                const studentsList = document.createElement("div");
                studentsList.innerHTML += `<h2>${title} (${filteredStudents.length}) :</h2>`;
                if (filteredStudents.length === 0) {
                    studentsList.innerHTML += "<p>Aucun élève trouvé.</p>";
                } else {
                    const list = document.createElement("ul");
                    filteredStudents.forEach(student => {
                        const listItem = document.createElement("li");
                        listItem.textContent = format(student);
                        list.appendChild(listItem);
                    });
                    studentsList.appendChild(list);
                }
                resultsDiv.appendChild(studentsList);
            }

            function formatStudent(student) {
                return `${student[1]} ${student[2]} (${student[5]})`;
            }

            function formatStudentWithoutAge(student) {
                return `${student[1]} ${student[2]}`;
            }

            function displayResults() {
                resultsDiv.innerHTML = ""; // Efface le contenu précédent

                // Afficher l'élève avec la plus grande note
                const studentWithMaxNote = students.reduce((max, student) => (parseFloat(student[5]) > parseFloat(max[5]) ? student : max), students[0]);
                const maxNoteDiv = document.createElement("div");
                maxNoteDiv.innerHTML += `<h2>Élève avec la plus grande note :</h2>`;
                maxNoteDiv.innerHTML += `<p>${formatStudent(studentWithMaxNote)}</p>`;
                resultsDiv.appendChild(maxNoteDiv);

                const studentsWithoutAge = filterStudents(student => student[4] === "");
                displayStudents("Liste des élèves sans âge", studentsWithoutAge, formatStudentWithoutAge);

                const presentStudents = filterStudents(student => student[3].toLowerCase() === "présent");
                displayStudents("Liste des élèves présents", presentStudents, formatStudent);

                const highNoteStudents = filterStudents(student => parseFloat(student[5]) >= 10);
                displayStudents("Liste des élèves avec note >= 10", highNoteStudents, formatStudent);
            }

            // Appeler la fonction pour afficher les résultats
            displayResults();