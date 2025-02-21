import matplotlib.pyplot as plt
course=['CB22x','CS50x','ER22x','PH207x','PH278x']
num_of_ncer=[9779,59239,19130,14275,15059]                                                                                                                                                                                                     
num_of_cer=[117,387,668,599,258]
plt.bar(course,num_of_cer,.6,label="certefied")
plt.bar(course,num_of_ncer,.6,bottom=num_of_cer,label="not certefied")
plt.xlabel('course')
plt.ylabel('num of cer and not cer students')
plt.title("not cer vs cer Bachelor's students ratio")
plt.legend()
plt.show()
