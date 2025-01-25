import math

'''
i=input("Your goood name please:")
print("Hello" , i)
print("Enter any two integers:")
num1=int(input("enter integr 1:"))
num2=int(input("enter integer 2:"))
sum=num1+num2
print(sum)
'''
'''
print("conveting celsius to fahrenheit")
C=int(input("Enter celsius temperature:"))
F=9/5*C+32
print("Fahrenheit temperature=",F)
'''
'''
print("Calculating simple interst...")
P=int(input("Enter Principle amount:"))
T=int(input("Enter time:"))
R=int(input("Enter rate:"))
S=(P*T*R)/100
print("Simple interst =",S)
'''
'''
print("Converting seconds into hours minitues and seconds...")
innn=int(input("enter seconds:"))
hours=innn//3600
minutes=(innn%3600)//60
seconds=innn%60
print("min=",minutes)
print("hourss=",hours)
print("sec=",seconds)
'''
'''
print("Swaping of two integers....")
print("Enter two integers")
int1=int(input("Enter int1:"))
int2=int(input("Enter int2:"))
print("num1=",int1)
print("num2=",int2)
print("After Swaping")
S=int1
int1=int2
int2=S
print("num1=",int1)
print("num2=",int2)
'''
'''
print("Swaping without any extra variable")
print("Enter two integers")
int1=int(input("Enter int1:"))
int2=int(input("Enter int2:"))
print("num1=",int1)
print("num2=",int2)
print("After Swaping")
int1=int1+int2
int2=int1-int2
int1=int1-int2
print("num1=",int1)
print("num2=",int2)
'''
'''
print("Calculating Area and Circumfernce of a circle...")
r=int(input("Enter the radius of a circle:"))
A=3.14*(r**2)
C=2*3.14*r
print("Area=",A)
print("Circumference=",C)
'''
'''
print("Calculating Area and perimeter of a Rectangle...")
l=int(input("Emter length of a rectangle:"))
b=int(input("Enter breadth of a Rectangle:"))
A=l*b
P=2*l*b
print("Area of a rectangle=",A)
print("Permeter of a rectangle=",P)
'''
'''
print("Calculating Area of a Triangle")
print("Enter the sides of a Triangle")
a=int(input("Enter side 1:"))
b=int(input("Enter side 2:"))
c=int(input("Enter side 3:"))
s=(a+b+c)/2
A=math.sqrt(s*(s-a)*(s-b)*(s-c))
print("Area of a Triangle=",A)
'''
print("Calculating Compound interst...")
P=int(input("Enter Principle amount:"))
T=int(input("Enter time:"))
R=int(input("Enter rate:"))
C=(P*(1+(R/100)**T)-P)
print("Compound interst =",C)