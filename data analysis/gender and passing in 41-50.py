import matplotlib.pyplot as plt
genders=['male','female'] 
passed=[1576,812]
failed=[77225,36565]
plt.bar(genders,passed,.6,label="passed")
plt.bar(genders,failed,.6,bottom=passed,label="failed")
plt.xlabel('gender')
plt.ylabel('passed and failed')
plt.title("failed vs passed ratio for students under betwee 40 and 50 years old")
plt.legend()
plt.show()