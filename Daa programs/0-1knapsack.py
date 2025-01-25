# 0-1 Knapsack problem with user input using dynamic programming

def knapsack_01(values, weights, W):
    n = len(values)
    # Create a 2D DP array to store the maximum value for each weight and item combination
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]

    # Build table dp[][] in a bottom-up manner
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][W]  # Maximum value that can be carried in the knapsack

# Taking user inputs
n = int(input("Enter the number of items: "))

values = []
weights = []

print("Enter the value and weight of each item:")

for i in range(n):
    value = int(input(f"Value of item {i+1}: "))
    weight = int(input(f"Weight of item {i+1}: "))
    values.append(value)
    weights.append(weight)

W = int(input("Enter the maximum weight capacity of the knapsack: "))

# Solve the knapsack problem with user input
max_value = knapsack_01(values, weights, W)
print(f"Maximum value that can be placed in the knapsack: {max_value}")

