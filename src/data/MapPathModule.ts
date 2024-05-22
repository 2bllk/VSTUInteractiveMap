interface IEdge {
    from: string;
    to: string;
}

interface IMapGraph {
    edges: IEdge[];
}

function dijkstra(graph: IMapGraph, startNodeId: string, endNodeId: string): string[] {
    const nodes = [...new Set(graph.edges.flatMap(edge => [edge.from, edge.to]))];
    const distances: { [key: string]: number } = {};
    const paths: { [key: string]: string[] } = {};
    const visited: { [key: string]: boolean } = {};
    const queue: string[] = [];

    // Инициализация расстояний и добавление начальной вершины в очередь
    for (const node of nodes) {
        distances[node] = node === startNodeId ? 0 : Number.MAX_SAFE_INTEGER;
        paths[node] = [];
        queue.push(node);
    }

    while (queue.length > 0) {
        // Извлечение вершины с минимальным расстоянием из очереди
        queue.sort((a, b) => distances[a] - distances[b]);
        const currentNode = queue.shift();
        if (!currentNode)
            break;
        visited[currentNode] = true;

        // Обновление расстояний до смежных вершин
        for (const edge of graph.edges) {
            if ((edge.from === currentNode || edge.to === currentNode) && !visited[edge.from === currentNode ? edge.to : edge.from]) {
                const neighbor = edge.from === currentNode ? edge.to : edge.from;
                const newDistance = distances[currentNode] + 1; // Вес ребра равен 1
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    paths[neighbor] = [...paths[currentNode], currentNode];
                }
            }
        }
    }
    // Формирование пути от начальной вершины до конечной вершины
    const shortestPath = [...paths[endNodeId], endNodeId].reverse();

    return shortestPath;
}

function drawPathOnMap(svg: SVGSVGElement | null, nodes: string[]) {
    if (!svg)
        return;
    // let svg = document.getElementById("map").contentDocument;
    let pointsGroup = svg.getElementById("points");

    var element = svg.getElementById('pathIdD');
    if (typeof (element) != 'undefined' && element != null) {
        element.remove()
    }

    let lol = ""
    for (let i = 0; i < nodes.length; i++) {
        console.log(nodes[i])
        let kek = svg.getElementById(nodes[i]);
        console.log(kek);
        console.log(`${kek?.getAttribute("cx")},${kek?.getAttribute("cy")} `)
        lol += `${kek?.getAttribute("cx")},${kek?.getAttribute("cy")} `;
    }

    let newpath = document.createElementNS(svg.namespaceURI, "path");
    // .documentElement as HTMLElement)
    console.log(svg.namespaceURI);
    newpath.setAttributeNS(null, "id", "pathIdD");
    //newpath.setAttributeNS(null, "d", "M 23.418022,170.94228 L 30.666456,172.15034");
    newpath.setAttributeNS(null, "d", "M " + lol);
    newpath.setAttributeNS(null, "style", "fill:none;stroke-width:5;stroke:#000000");
    newpath.setAttributeNS(null, "stroke-dasharray", "7");
    // newpath.setAttributeNS(null, "stroke-width", 3);
    // newpath.setAttributeNS(null, "opacity", 1);
    // newpath.setAttributeNS(null, "fill", "red");

    pointsGroup?.appendChild(newpath);
}

function findPath(roomIdA: string, roomIdb: string, svg: SVGSVGElement) {
    fetch('graph.json')
        .then(response => response.json())
        .then(data => {
            const shortestPaths = dijkstra(data, roomIdA, roomIdb); // Запуск алгоритма Дейкстры с начальной вершиной 1
            drawPathOnMap(svg, shortestPaths);
            console.log(shortestPaths);
        })
        .catch(error => {
            console.error('Ошибка при загрузке файла:', error);
        });
}

export { findPath, drawPathOnMap, dijkstra };