import numpy as np
import scipy.stats as st
import matplotlib.pyplot as plt
genders=['male','female'] 
females=[5157,108]
males=[11867,219]
passed=[219,108]
failed=[11867,5157]
s1,p_val,DOF,ex=st.chi2_contingency(np.array([[5157,108],[11867,219]]))
print("P value:",round(p_val,5))
if p_val<.05:
	print("there is a statistically significant relationship between the gender and the passing")
else:
	print("there is no statistically significant relationship between the gender and the passing")
plt.bar(genders,passed,.6,label="passed")
plt.bar(genders,failed,.6,bottom=passed,label="failed")
plt.xlabel('gender')
plt.ylabel('passed and failed')
plt.title("failed vs passed ratio for students under 30 years old")
plt.legend()
plt.show()