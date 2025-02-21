import matplotlib.pyplot as plt
genders=['male','female'] 
passed=[1874,1159]
failed=[106328,49446]
plt.bar(genders,passed,.6,label="passed")
plt.bar(genders,failed,.6,bottom=passed,label="failed")
plt.xlabel('gender')
plt.ylabel('passed and failed')
plt.title("failed vs passed ratio for students under betwee 30 and 40 years old")
plt.legend()
plt.show()