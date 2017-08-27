import csv

cleaned_data = []

prod_data = []
with open('./product.csv', 'r') as prod_file:
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

first_line = True
for item in demo_data:
	cleaned_data.append(item[0].split(','))
	if(first_line):
		cleaned_data[-1].append('PRODUCT_IDS')
		first_line = False
	else:
		cleaned_data[-1].append([])

for i in range(0, len(trans_data)):
	trans_row = trans_data[i][0].split(',')
	for j in range(0, len(demo_data)):
		if(i != 0 and j != 0 and demo_data[j][0].split(',')[7] == trans_row[0]):#household keys equal
			cleaned_data[j][-1].append(trans_row[3])#product id


"""
print "Product data length: {}".format(len(prod_data))
print "Transaction data length: {}".format(len(trans_data))
print "Demographic data length: {}".format(len(demo_data))
"""
"""
for d in cleaned_data:
	print d
"""
