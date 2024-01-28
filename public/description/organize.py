import pandas as pd

eng = []
de = []
filesLen = 16

csv = pd.read_csv("all_description.csv")

for i in range(0, len(csv["Deutsch"])):
    de.append(csv["Deutsch"][i])
    eng.append(csv["English"][i])

start = 0
verben_pack = int(len(de) / filesLen)
end = verben_pack

for i in range(1, filesLen):
    info_pack = {"Deutsch": de[start:end], "English": eng[start:end]}

    df = pd.DataFrame(info_pack)
    df.to_csv(f"description{i}.csv", mode="w", index=False)
    start += verben_pack
    end += verben_pack


info_pack = {"Deutsch": de[start:], "English": eng[start:]}

df = pd.DataFrame(info_pack)
df.to_csv(f"description{filesLen}.csv", mode="w", index=False)
