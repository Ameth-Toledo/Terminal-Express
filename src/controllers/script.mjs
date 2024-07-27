import Graph from "../models/Graph.mjs";

const graph = new Graph();

let btnAgregarDestino = document.getElementById("AgregarDestino");
let btnAgregarConexion = document.getElementById("AgregarRutaB");
let btnRecorridoProfundidad = document.getElementById("buttonProfundidad");
let btnRecorridoAnchura = document.getElementById("buttonAnchura");
let imprimir = document.getElementById("MostrarRecorridos");
let imprimir2 = document.getElementById("MostrarRecorridosAn");

let btnDijstra = document.getElementById("rutaMasCorta");
let imprimir3 = document.getElementById("mostrarRutaCorta");

btnAgregarDestino.addEventListener("click", () => {
    let terminal = document.getElementById("destinos").value.trim();
    
    if (terminal === '') {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, ingrese un nombre de terminal válido.",
        });
        return;
    }
    
    if (graph.addVertex(terminal)) {
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: `La terminal '${terminal}' se ha registrado correctamente.`,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `La terminal '${terminal}' ya existe o no se pudo registrar.`,
        });
    }
});

btnAgregarConexion.addEventListener("click", () => {
    let terminal = document.getElementById("terminalInicio").value.trim();
    let destino = document.getElementById("destino").value.trim();
    let peso = parseInt(document.getElementById("peso").value);

    if (!terminal || !destino || isNaN(peso) || peso <= 0) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, ingrese valores válidos para la terminal, el destino y la distancia.",
        });
        return;
    }
    
    if (graph.addC(terminal, destino, peso)) {
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: `La ruta desde '${terminal}' hasta '${destino}' se ha agregado correctamente.`,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo agregar la ruta. Verifique que las terminales existan y que los datos sean correctos.",
        });
    }
});

btnRecorridoProfundidad.addEventListener("click", () => {
    imprimir.innerHTML = '';
    const vertices = [...graph.getVertices()][0];
    if (!vertices) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No hay terminales registradas para mostrar el recorrido.",
        });
        return;
    }
    graph.dfs(vertices, (vertex) => {
        imprimir.innerHTML += `${vertex} `;
        console.log(vertex);
    });
    Swal.fire({
        icon: "info",
        title: "Recorrido en Profundidad",
        text: "Ahora puede ver las terminales en el orden de recorrido.",
    });
});

document.addEventListener('DOMContentLoaded', () => {
    btnRecorridoAnchura.addEventListener("click", () => {
        imprimir2.innerHTML = '';
        
        const vertices = [...graph.getVertices()][0];
        if (!vertices) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No hay terminales registradas para mostrar el recorrido.",
            });
            return;
        }
        graph.bfs(vertices, (vertex) => {
            imprimir2.innerHTML += `${vertex} `;
            console.log(vertex);
        });
        Swal.fire({
            icon: "info",
            title: "Recorrido en Anchura",
            text: "Ahora puede ver las terminales en el orden de recorrido.",
        });
    });
});

btnDijstra.addEventListener("click", () => {
    let origen = document.getElementById("verticeInicio").value.trim();
    let destino = document.getElementById("verticeFinal").value.trim();

    if (!origen || !destino) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, ingrese un origen y destino válidos.",
        });
        return;
    }

    const shortestDistance = graph.dijkstra(origen, destino);

    if (shortestDistance === 1000000) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró ningún camino entre las terminales.",
        });
    } else {
        imprimir3.innerHTML = `La ruta más corta es ${shortestDistance}`;
        Swal.fire({
            icon: "success",
            title: "Ruta Más Corta",
            text: "Ya puede ver la ruta más corta entre las terminales seleccionadas.",
        });
    }
});
