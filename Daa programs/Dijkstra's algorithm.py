import heapq

def dijkstra(graph, source):
    # Number of vertices
    n = len(graph)
    
    # Initialize distances with infinity and source distance to 0
    distances = {i: float('infinity') for i in range(n)}
    distances[source] = 0
    
    # Priority queue to select the minimum distance node
    priority_queue = [(0, source)]  # (distance, node)
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        # If the distance to the current node is already greater, skip it
        if current_distance > distances[current_node]:
            continue
        
        # Explore neighbors

        for neighbor, weight in enumerate(graph[current_node]):
            if weight != 0:  # There is an edge
                distance = current_distance + weight
                
                # If a shorter path to the neighbor is found
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    heapq.heappush(priority_queue, (distance, neighbor))
    
    return distances

# Taking user inputs
n = int(input("Enter the number of vertices: "))

# Initialize the graph as a 2D matrix
graph = []
print("Enter the adjacency matrix (enter 0 for no edge):")
for i in range(n):
    row = list(map(int, input(f"Row {i + 1}: ").split()))
    graph.append(row)

source = int(input("Enter the source node (index from 0 to n-1): "))

# Solve the shortest paths using Dijkstra's algorithm
shortest_paths = dijkstra(graph, source)

# Print the shortest paths from the source to all other nodes
print(f"Shortest paths from node {source}:")
for node, distance in shortest_paths.items():
    print(f"Node {node} : {distance}")
