import pickle
from sklearn import svm

loaded_model = pickle.load(open('agePrediction_model.sav', 'rb'))

test = [0] * 8
test.append(40382)
test.append(27760)

prediction = loaded_model.predict([test])

print prediction
