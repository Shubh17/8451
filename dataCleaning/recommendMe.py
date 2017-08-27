import pickle

loaded_model = pickle.load(open('productRec_model.sav', 'rb'))

print loaded_model.predict([[1,2,3,4,5,6,7,8,9]])
