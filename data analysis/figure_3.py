import pandas as pd
import matplotlib.pyplot as plt
course_LOE=["Bachelor's-CS50x","Secondary-CS50x","Master's-CS50x","other-CS50x","<Secondary-CS50x","Doctorate-PH207x"]
maxnum=[59626,51546,25823,24941,5300,3296]
plt.bar(course_LOE,maxnum,0.6)
plt.title('the most regestered courae for each LOE');
plt.xlabel('course-LOE')
plt.ylabel('num of students')
plt.show()