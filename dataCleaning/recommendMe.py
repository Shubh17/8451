import pickle

loaded_model = pickle.load(open('productRec_model.sav', 'rb'))

print loaded_model.predict([[27958,27958,27958,27958,27958,27958,27958,27958,27958]])
