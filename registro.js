
const fs = require('fs').promises; // Use the promises version of fs
const usuariosArchivo = 'usuarios.json';

// Constructor function for User
function Usuario(nombre, correoElectronico) {
  this.nombre = nombre;
  this.correoElectronico = correoElectronico;
}

// Method to register a user in the usuarios.json file
Usuario.prototype.registrar = async function () {
  try {
    // Check if the file exists
    await fs.access(usuariosArchivo);

    // If the file exists, read its content
    const data = await fs.readFile(usuariosArchivo, 'utf8');
    const usuarios = JSON.parse(data);
    usuarios.push({ nombre: this.nombre, correoElectronico: this.correoElectronico });

    // Write the updated data back to the file
    await fs.writeFile(usuariosArchivo, JSON.stringify(usuarios, null, 2));

    console.log('Usuario registrado con éxito.');
  } catch (err) {
    // If the file doesn't exist or there's an error, create it with the first user
    const usuarios = [{ nombre: this.nombre, correoElectronico: this.correoElectronico }];
    await fs.writeFile(usuariosArchivo, JSON.stringify(usuarios, null, 2));

    console.log('Usuario registrado con éxito.');
  }
};

// Function to list users
async function listarUsuarios() {
  try {
    // Read the usuarios.json file
    const data = await fs.readFile(usuariosArchivo, 'utf8');
    const usuarios = JSON.parse(data);

    console.log('Usuarios registrados:');
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. Nombre: ${usuario.nombre}, Correo Electrónico: ${usuario.correoElectronico}`);
    });
  } catch (err) {
    console.error('Error al leer usuarios.');
  }
}

// Check if the correct number of command-line arguments is provided
if (process.argv.length < 4) {
  console.log('Uso: node registroUsuarios.js <nombre> <correoElectrónico>');
} else {
  const nombre = process.argv[2];
  const correoElectronico = process.argv[3];

  // Create a new instance of Usuario and register the user
  const nuevoUsuario = new Usuario(nombre, correoElectronico);
  nuevoUsuario.registrar();

  // List registered users
  listarUsuarios();
}
