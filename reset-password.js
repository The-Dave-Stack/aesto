// Ejemplo de script Node.js para generar un hash bcrypt
// Guarda esto como generate-hash.js y ejecútalo con node generate-hash.js "tuNuevaContraseña"
const bcrypt = require('bcrypt');
const password = process.argv[2]; // Obtiene la contraseña del argumento de la línea de comandos
if (!password) {
  console.error('Por favor, proporciona una contraseña como argumento.');
  process.exit(1);
}
const saltRounds = 10; // El número de rondas de sal que usa Ghost (puede variar, pero 10 es común)
bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error generando el hash:', err);
    return;
  }
  console.log('Tu hash Bcrypt es:', hash);
});