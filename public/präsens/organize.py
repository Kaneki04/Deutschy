import pandas as pd

pronomen = []
verben = []
tra = []
filesLen = 20

csv = pd.read_csv("all_präsens.csv")
for i in range(0, len(csv["Pronomen"])):
    pronomen.append(csv["Pronomen"][i])
    verben.append(csv["Verben"][i])
    tra.append(csv["Translation"][i])

start = 0
verben_pack = int(len(verben) / filesLen)
end = int(verben_pack / 7) * 7

for i in range(1, filesLen):
    info_pack = {
        "Pronomen": pronomen[start:end],
        "Verben": verben[start:end],
        "Translation": tra[start:end],
    }
    df = pd.DataFrame(info_pack)
    df.to_csv(f"präsens{i}.csv", mode="w", index=False)
    start += int(verben_pack / 7) * 7
    end += int(verben_pack / 7) * 7


info_pack = {
    "Pronomen": pronomen[start:],
    "Verben": verben[start:],
    "Translation": tra[start:],
}

df = pd.DataFrame(info_pack)
df.to_csv(f"präsens{filesLen}.csv", mode="w", index=False)
