import matplotlib.pyplot as plt
course=['CB22x','CS50x','ER22x','PH207x','PH278x']
num_of_ncer=[4418,24724,7060,3424,3688]                                                                                                                                                                                                     
num_of_cer=[61,217,359,95,73]
plt.bar(course,num_of_cer,.6,label="certefied")
plt.bar(course,num_of_ncer,.6,bottom=num_of_cer,label="not certefied")
plt.xlabel('course')
plt.ylabel('num of cer and not cer students')
plt.title("not cer vs cer other students ratio")
plt.legend()
plt.show()