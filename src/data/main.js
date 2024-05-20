let SELECTED_ROOMS = [];

function dijkstra(graph, startNodeId, endNodeId) {
    const nodes = [...new Set(graph.edges.flatMap(edge => [edge.from, edge.to]))];
    const distances = {};
    const paths = {};
    const visited = {};
    const queue = [];

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

// https://learn.javascript.ru/coordinates
// получаем координаты элемента в контексте документа
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("map").addEventListener("load", () => {
        let svg = document.getElementById("map").contentDocument;
        console.log(svg);

        let roomsGroup = svg.getElementById("g24");
        roomsGroup.addEventListener("mouseover", (e) => {
            //console.log(e.target.dataset.targetPoint);
        })

        roomsGroup.addEventListener("click", (e) => {
            if (!SELECTED_ROOMS.includes(e.target.dataset.targetPoint)) {
                if (SELECTED_ROOMS.length == 2) {
                    return;
                }
                SELECTED_ROOMS.push(e.target.dataset.targetPoint);
                e.target.classList.add("selected-room");
            } else {
                SELECTED_ROOMS = SELECTED_ROOMS.filter(item => item !== e.target.dataset.targetPoint)
                //SELECTED_ROOMS.pop(e.target.dataset.targetPoint);
                e.target.classList.remove("selected-room");
            }
            console.log(e.target.dataset.targetPoint);
        })

        roomsGroup.addEventListener("mouseover", (e) => {
            let tooltip = document.getElementsByClassName("tooltip")[0];
            tooltip.classList.add('active');
            //description.innerHTML = "Lol";

            tooltipWidth = tooltip.getBoundingClientRect().width;
            tooltipHeight = tooltip.getBoundingClientRect().height;

            tooltipOffsetX = (e.target.getBoundingClientRect().width - tooltipWidth) / 2;
            tooltipOffsetY = (e.target.getBoundingClientRect().height - tooltipHeight) / 2;

            tooltip.style.left = e.target.getBoundingClientRect().left + document.getElementById("map").getBoundingClientRect().left + tooltipOffsetX + "px";
            //tooltip.style.top = e.target.getBoundingClientRect().top + document.getElementById("map").getBoundingClientRect().top + tooltipOffsetY - 20 + "px";
            //tooltip.style.top = e.target.getBoundingClientRect().top + document.getElementById("map").getBoundingClientRect().top + "px";

            let aaa = getCoords(document.getElementById("map"));
            tooltip.style.top = e.target.getBoundingClientRect().top + aaa.top - tooltipHeight + e.target.getBoundingClientRect().height / 2 + "px";

            // description.style.left = e.pageX + "px";
            // description.style.top = e.pageY + "px";

            console.log(document.getElementById("map").getBoundingClientRect());
        });

        // roomsGroup.addEventListener("mousemove", (e) => {
        //     let description = document.getElementsByClassName("description")[0];
        //     description.style.left = e.clientX + document.getElementById("map").getBoundingClientRect().left + "px";
        //     description.style.top = e.clientY + document.getElementById("map").getBoundingClientRect().top + "px";
        // });

        roomsGroup.addEventListener("mouseout", (e) => {
            let tooltip = document.getElementsByClassName("tooltip")[0];
            tooltip.classList.remove('active');
        });
    })
})

function drawPath(nodes) {
    let svg = document.getElementById("map").contentDocument;
    let pointsGroup = svg.getElementById("g23");

    var element = svg.getElementById('pathIdD');
    if (typeof (element) != 'undefined' && element != null) {
        element.remove()
    }

    let lol = ""
    for (let i = 0; i < nodes.length; i++) {
        let kek = svg.getElementById(nodes[i]);
        lol += `${kek.getAttribute("cx")},${kek.getAttribute("cy")} `;
    }

    let newpath = document.createElementNS(svg.documentElement.namespaceURI, "path");
    console.log(svg.namespaceURI);
    newpath.setAttributeNS(null, "id", "pathIdD");
    //newpath.setAttributeNS(null, "d", "M 23.418022,170.94228 L 30.666456,172.15034");
    newpath.setAttributeNS(null, "d", "M " + lol);
    newpath.setAttributeNS(null, "style", "fill:none;stroke-width:0.2;stroke:#000000");
    newpath.setAttributeNS(null, "stroke-dasharray", "1");
    // newpath.setAttributeNS(null, "stroke-width", 3);
    // newpath.setAttributeNS(null, "opacity", 1);
    // newpath.setAttributeNS(null, "fill", "red");

    pointsGroup.appendChild(newpath);
}

function findPath() {
    fetch('graph.json')
        .then(response => response.json())
        .then(data => {
            const shortestPaths = dijkstra(data, SELECTED_ROOMS[0], SELECTED_ROOMS[1]); // Запуск алгоритма Дейкстры с начальной вершиной 1
            drawPath(shortestPaths);
            console.log(shortestPaths);
        })
        .catch(error => {
            console.error('Ошибка при загрузке файла:', error);
        });
}