const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILENAME = 'alumnos.json';

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo`);
});

const saveData = (data) => {
    let alumnos = [];
    if (fs.existsSync(FILENAME)) {
        const fileData = fs.readFileSync(FILENAME);
        alumnos = fileData.length ? JSON.parse(fileData) : [];
    }
    alumnos.push(data);
    fs.writeFileSync(FILENAME, JSON.stringify(alumnos, null, 4));
};

app.post('/alumno', (req, res) => {
    const { cuenta, nombre, promedio, grado, grupo } = req.body;
    const nuevoAlumno = { cuenta, nombre, promedio, grado, grupo };
    saveData(nuevoAlumno);
});

