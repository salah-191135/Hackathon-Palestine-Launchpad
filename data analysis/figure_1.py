import pandas as pd
import matplotlib.pyplot as plt
course=['CS50x','ER22x','PH207x','PH278x','CB22x']
count=[169621,57406,41592,39602,29003]
plt.figure(figsize=(10,6))
plt.bar(course,count,0.6)
plt.title('number of students for each course')
plt.xlabel('course')
plt.ylabel('count')
plt.show()
	