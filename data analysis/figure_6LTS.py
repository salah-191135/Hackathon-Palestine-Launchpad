import matplotlib.pyplot as plt
course=['CB22x','CS50x','ER22x','PH207x','PH278x']
num_of_ncer=[652,5235,1164,168,529]                                                                                                                                                                                                     
num_of_cer=[14,65,87,3,12]
plt.bar(course,num_of_cer,.6,label="certefied")
plt.bar(course,num_of_ncer,.6,bottom=num_of_cer,label="not certefied")
plt.xlabel('course')
plt.ylabel('num of cer and not cer students')
plt.title("not cer vs cer less than secondary students ratio")
plt.legend()
plt.show()
