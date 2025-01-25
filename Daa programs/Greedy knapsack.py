# Greedy algorithm for Fractional Knapsack problem

class Item:
    def __init__(self, value, weight):
        self.value = value
        self.weight = weight
        self.ratio = value / weight  # Value-to-weight ratio

def fractional_knapsack(capacity, items):
    # Sort items by value-to-weight ratio in descending order
    items.sort(key=lambda x: x.ratio, reverse=True)

    total_value = 0.0  # Total value in the knapsack
    for item in items:
        if capacity >= item.weight:
            # Take the whole item
            capacity -= item.weight
            total_value += item.value
        else:
            # Take the fraction of the remaining capacity
            fraction = capacity / item.weight
            total_value += item.value * fraction
            break  # Knapsack is full

    return total_value

# Taking user inputs
n = int(input("Enter the number of items: "))

items = []
for i in range(n):
    value = int(input(f"Enter value of item {i+1}: "))
    weight = int(input(f"Enter weight of item {i+1}: "))
    items.append(Item(value, weight))

capacity = int(input("Enter the maximum weight capacity of the knapsack: "))

# Solve the Fractional Knapsack problem
max_value = fractional_knapsack(capacity, items)
print(f"Maximum value in the knapsack: {max_value:.2f}")
