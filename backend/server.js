const http = require("http");
const app = require("./app");

//Normalisation du port.
const normalizePort = val => {
  const port = parseInt(val, 10);
  if(isNaN(port)){
    return val;
  }
  if(port >= 0){
    return port;
  }
  return false;
};

//Renvoi d'un port valide, sous la forme d'un numéro ou d'une chaîne.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port)

//Recherche et gestion des différentes erreurs.
const errorHandler = error => {
  if(error.syscall !== "listen"){
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch(error.code){
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
    }
};

const server = http.createServer(app);

//Enregistrement de la fonction "errorHandler" dans le serveur.
server.on("error", errorHandler);

//Consignation du port ou du canal sur lequel le serveur s'éxécute.
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

//Enregistrement de l'écouteur d'événements dans le serveur.
server.listen(port);