import matplotlib.pyplot as plt
course=['CB22x','CS50x','ER22x','PH207x','PH278x']
num_of_ncer=[1066,2368,1535,3141,987]                                                                                                                                                                                                     
num_of_cer=[10,17,55,155,20]
plt.bar(course,num_of_cer,.6,label="certefied")
plt.bar(course,num_of_ncer,.6,bottom=num_of_cer,label="not certefied")
plt.xlabel('course')
plt.ylabel('num of cer and not cer students')
plt.title("not cer vs cer Doctorate students ratio")
plt.legend()
plt.show()
