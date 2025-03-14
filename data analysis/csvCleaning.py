import pandas as pd
import numpy as np
df=pd.read_csv("HXPC13_DI_v3_11-13-2019 - Copy.csv")
df["LoE_DI"]=df["LoE_DI"].replace({np.nan : "other"})
df["gender"]=df["gender"].replace({np.nan : "prefer not to say"})
df["YoB"]=df["YoB"].replace({np.nan : "uknown"})
df["last_event_DI"]=df["last_event_DI"].replace({np.nan : "no events"})
df["nevents"]=df["nevents"].replace({np.nan : 0})
df["ndays_act"]=df["ndays_act"].replace({np.nan : 0})
df["nplay_video"]=df["nplay_video"].replace({np.nan : 0})
df["nchapters"]=df["nchapters"].replace({np.nan : 0})
df["incomplete_flag"]=df["incomplete_flag"].replace({np.nan : 0})
df=df.drop("roles",axis=1)
df.to_csv("HXPC13_DI_v3_11-13-2019 - Copy.csv",index=False)
print("Done!")
