import matplotlib.pyplot as plt
most5passedCourses_withDate=['2013-06-ER22x','2013-07-ER22x','2013-05-ER22x','2012-10-PH207x','2012-09-PH207x']
ratio=[0.0825,0.07,0.0509,0.0979,0.0609]
plt.bar(most5passedCourses_withDate,ratio,0.5)
plt.title('the highest 5 passing ratios for each courses and months')
plt.xlabel('date-course')
plt.ylabel('the ratio')
plt.show()