'''
class Student:
    
    def grade(self):
        idd=int(input("Enter student id:"))
        namee=input("enter student name:")
        total=int(input("Enter total marks:"))
        marks=int(input("enter marks:"))
        percent=(marks/total)*100
        print(percent)
        print("your percent=",percent)
        if percent>90:
            print("Grade is A")
        elif percent>80:
            print("Grade is B")
        elif percent>70:
            print("Grade is C")
        else :
            print("you are failed")       

obj=Student()
obj.grade()                 
'''
