import LinkedList from "./LinkendList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.#map.has(value)) {
                this.#matrizAdyacencia.push(new LinkedList());
                this.#map.set(value, this.#matrizAdyacencia.length - 1);
            }
        }
    }

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addC(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const stack = [];
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const queue = [];
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current !== null) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    dijkstra(startVertex, endVertex) {
        const inf = 1000000;
        const numVertices = this.numVertices();
        let D = [];
        let L_p = [];
        let L = [];
        let V = [];


            for (let i = 0; i < numVertices; i++) {
            D.push(inf);
            L_p.push(i);
            V.push(i);
        }

        const start = this.#map.get(startVertex);
        const end = this.#map.get(endVertex);

        D[start] = 0;



            while (L.length < V.length) {

                let minDistance = inf;
                let minIndex = -1;

                    for (let i = 0; i < L_p.length; i++) {
                        const vertex = L_p[i];
                    if (minIndex === -1 || D[vertex] < minDistance) {
                        minDistance = D[vertex];
                    minIndex = i;
                }
            }

            const u = L_p[minIndex];
            L.push(u);


            L_p[minIndex] = L_p[L_p.length - 1];
            L_p.pop();

            const neighborsLinkedList = this.#matrizAdyacencia[u];
            let current = neighborsLinkedList.getHead();

                while (current) {
                    const neighbor = this.#map.get(current.value.node);
                    const weight = current.value.weight;

                    if (L_p.includes(neighbor) && D[u] + weight < D[neighbor]) {
                    D[neighbor] = D[u] + weight;
                }
                current = current.next;
            }
        }

        return D[end];
    }


        getVertices() {
            return this.#map.keys();
        }

        getNeighbors(vertex) {
            const index = this.#map.get(vertex);
            if (index !== undefined) {
                return this.#matrizAdyacencia[index];
            }
            return null;
        }

        numVertices() {
            return this.#map.size;
        }
    }

