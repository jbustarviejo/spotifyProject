from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["spotify"]
mycol = mydb["playLists"]

genres = mycol.find()

tracks = []
tracks_target = []

i = 0
for genre in genres:
  i+=1;
  for track in genre["tracks"]:
    track_info = track["info"]
    tracks.append( [track_info["danceability"], track_info["energy"], track_info["loudness"], track_info["speechiness"], track_info["acousticness"], track_info["instrumentalness"], track_info["liveness"], track_info["valence"], track_info["tempo"]] )
    tracks_target.append( i )


# Importing Modules
from sklearn import datasets
from sklearn.manifold import TSNE


# Loading dataset
# iris_df = datasets.load_iris()
# print(iris_df.target)
dataset=tracks

target = tracks_target

# Defining Model
model = TSNE(learning_rate=100)


# Fitting Model
transformed = model.fit_transform(dataset)

# Plotting 2d t-Sne
x_axis = transformed[:, 0]
y_axis = transformed[:, 1]

print(transformed)

plt.scatter(x_axis, y_axis, c=target)
plt.show()
