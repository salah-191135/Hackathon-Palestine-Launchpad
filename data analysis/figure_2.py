import pandas as pd
import matplotlib.pyplot as plt

course=['ER22x','PH207x','CS50x','PH278x','CB22x']
passed=[2466,2362,1287,697,373]
failed=[54940,39230,168334,38905,28630]
plt.bar(course,passed,.6,label="passed")
plt.bar(course,failed,.6,bottom=passed,label="failed")
plt.xlabel('course')
plt.ylabel('count')
plt.title("failed vs passed ratio")
plt.legend()
plt.show()
