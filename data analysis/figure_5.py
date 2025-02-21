import matplotlib.pyplot as plt
course=['PH207x','PH278x','CS50x','CB22x','ER22x']
count=[20733,12544,0,0,0]
plt.bar(course,count,0.6)
plt.title('number of vedio plays for each course')
plt.xlabel('course')
plt.ylabel('number of vedio plays')
plt.show()
	