from sklearn import svm
import csv

cleaned_data = []

prod_data = []
with open('./product_sample.csv', 'r') as prod_file:
	prod_reader = csv.reader(prod_file, delimiter='\t', quotechar='|')
	for row in prod_reader:
		prod_data.append(row)

trans_data = []
with open('./transaction_data.csv', 'r') as trans_file:
	trans_reader = csv.reader(trans_file, delimiter='\t', quotechar='|')
	for row in trans_reader:
		trans_data.append(row)

demo_data = []
with open('./hh_demographic.csv', 'r') as demo_file:
	demo_reader = csv.reader(demo_file, delimiter='\t', quotechar='|')
	for row in demo_reader:
		demo_data.append(row)

for i in range(1, len(demo_data)):#skip row 1
	#cleaned_data.append(demo_data[i][0].split(',')[0])
	cleaned_data.append([0]*10)

#print cleaned_data
max_rows = 100000
row_count = 0

for i in range(0, len(trans_data)):
	trans_row = trans_data[i][0].split(',')
	row_count += 1
	if(row_count > max_rows):
		break
	for j in range(0, len(demo_data)):
		if(i != 0 and j != 0 and demo_data[j][0].split(',')[7] == trans_row[0]):#household keys equal
			try:
				cleaned_data[j].append(int(trans_row[3]))#product id
			except:
				continue


age_category = ['19-24','25-34','35-44','45-54','55-64','65+']

def vectorizeColumn(category, column):
	position = category.index(column)
	if(position != -1):
		return position

X = cleaned_data#vector of purchase data
y = []#their ages

for d in range(1, len(demo_data)):
	y.append(vectorizeColumn(age_category, demo_data[d][0].split(',')[0]))

for info in range(0, len(X)):
	X[info] = X[info][-10:]


#print X

clf = svm.SVC()
clf.fit(X, y)

total = 0
correct = 0
close = 0

for p in range(0, len(X)):
	if total > 2000:
		break
	prediction = clf.predict([X[p]])[0]
	answer = y[p]
	if prediction == answer:
		correct += 1
	elif abs(prediction - answer) < 2:
		close += 1
	total += 1

print "% of correct answers {}".format(float(correct)/total)
print "% of answers correct or off by one {}".format(float(close+correct)/total)

