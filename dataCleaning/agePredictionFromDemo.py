from sklearn import svm
import csv

cleaned_data = []
""" prod_data = []
with open('./product_sample.csv', 'r') as prod_file:
	prod_reader = csv.reader(prod_file, delimiter='\t', quotechar='|')
	for row in prod_reader:
		prod_data.append(row)

trans_data = []
with open('./transaction_sample.csv', 'r') as trans_file:
	trans_reader = csv.reader(trans_file, delimiter='\t', quotechar='|')
	for row in trans_reader:
		trans_data.append(row)
"""

demo_data = []
with open('./hh_demographic.csv', 'r') as demo_file:
	demo_reader = csv.reader(demo_file, delimiter='\t', quotechar='|')
	for row in demo_reader:
		demo_data.append(row)

first_line = True
for item in demo_data:
	cleaned_data.append(item[0].split(','))
#to be uncommented, just want to test with pure number and vectorized data first
"""
	if(first_line):
		cleaned_data[-1].append('PRODUCT_IDS')
		first_line = False
	else:
		cleaned_data[-1].append([0])

for i in range(0, len(trans_data)):
	trans_row = trans_data[i][0].split(',')
	for j in range(0, len(demo_data)):
		if(i != 0 and j != 0 and demo_data[j][0].split(',')[7] == trans_row[0]):#household keys equal
			cleaned_data[j][-1].append(int(trans_row[3]))#product id
"""

#time to vectorize
categories = [['19-24','25-34','35-44','45-54','55-64','65+'],['A', 'B', 'U'],
							['Under 15K', '15-24K', '25-34K', '35-49K', '50-74K', '75-99K', '100-124K', '125-149K', '150-174K', '175-199K', '200-249K', '250K+'],
							['Homeowner', 'Probable Owner', 'Renter', 'Probable Renter', 'Unknown'], 
							['2 Adults No Kids', '2 Adults Kids', '1 Adult Kids', 'Single Female', 'Single Female', 'Single Male', 'Unknown'],
							['1', '2', '3', '4', '5+'],['1', '2', '3+', 'None/Unknown']]

def vectorizeColumn(category, column):
	"""vector = [0] * len(category)
	position = category.index(column)
	if(position != -1):
		vector[position] = 1
	return vector"""
	position = category.index(column)
	if(position != -1):
		return position
	return len(category)-1
	

X = []#vectors of demographic data
y = []#their age classification

for rNum in range(1, len(cleaned_data)):#skip the first row
	for cNum in range(0, len(cleaned_data[rNum])):
		if(cNum <= 6):
			cleaned_data[rNum][cNum] = vectorizeColumn(categories[cNum], cleaned_data[rNum][cNum])
		elif(cNum == 7):
			cleaned_data[rNum][cNum] = [int(cleaned_data[rNum][cNum])]
	y.append(cleaned_data[rNum][0])
	X.append(cleaned_data[rNum][1:-1])


#print X

#vectorizer = TfidfVectorizer()
#vectors = vectorizer.fit_transform(cleaned_data)
clf = svm.SVC()
clf.fit(X, y)

total = 0
correct = 0
close = 0

for p in range(0, len(X)):
	prediction = clf.predict([X[p]])[0]
	answer = y[p]
	if prediction == answer:
		correct += 1
	elif abs(prediction - answer) < 2:
		close += 1
	total += 1

print "% of correct answers {}".format(float(correct)/total)
print "% of answers correct or off by one {}".format(float(close+correct)/total)


