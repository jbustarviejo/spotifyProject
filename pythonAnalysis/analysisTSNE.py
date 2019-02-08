from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt


# Importing Modules
from sklearn import datasets
from sklearn.manifold import TSNE


# Loading dataset
# iris_df = datasets.load_iris()
# print(iris_df.target)
dataset=[[5.1 ,3.5 ,1.4 ,0.2],
 [4.9, 3. , 1.4 ,0.2],
 [4.7, 3.2, 1.3, 0.2],
 [5.4, 3.7, 1.5 ,0.2]]

target = [1,2,1,2]

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
