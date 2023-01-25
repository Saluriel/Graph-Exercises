class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.nodes.add(node)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let seen = new Set();
    let arr = [];

    function search(node) {
      // if there's no graph return null
      if (!node) {
        return null;
      }

      seen.add(node)
      arr.push(node.value)

      // console.log("ARRAY", arr)

      // console.log(node.adjacent)
      // console.log(seen)

      node.adjacent.forEach(neighbor => {
        if (!seen.has(neighbor)) {
          return search(neighbor)
        }
      })
    }
    search(start);

    // console.log("FINAL ARRAY", arr)
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set();
    let currVertex;
    let arr = [];

    seen.add(start);

    while (toVisitQueue.length) {
      currVertex = toVisitQueue.shift();
      arr.push(currVertex.value);

      currVertex.adjacent.forEach(neighbor => {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          toVisitQueue.push(neighbor);
        }
      })

    }
    return arr;
  }

}

module.exports = { Graph, Node }