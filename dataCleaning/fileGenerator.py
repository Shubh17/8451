import csv 

prod_data = []
with open('./csvFiles/product.csv', 'r') as prod_file:
	prod_reader = csv.reader(prod_file, delimiter='\t', quotechar='|')
	for row in prod_reader:
		prod_data.append(row)

trans_data = []
with open('./csvFiles/transaction_data.csv', 'r') as trans_file:
	trans_reader = csv.reader(trans_file, delimiter='\t', quotechar='|')
	for row in trans_reader:
		trans_data.append(row)

demo_data = []
with open('./csvFiles/hh_demographic.csv', 'r') as demo_file:
#the file above is the one being read in
	demo_reader = csv.reader(demo_file, delimiter='\t', quotechar='|')
	for row in demo_reader:
		demo_data.append(row)

print "Length of demo data {}".format(len(demo_data))
print "Length of trans data {}".format(len(trans_data))
print "Length of product data {}".format(len(prod_data))

#print demo_data[0]

with open('./csvFiles/demo_test.csv', 'wb') as csvfile:
	spamwriter = csv.writer(csvfile, delimiter=' ', quotechar=' ')#, quoting=csv.QUOTE_MINIMAL)
	for d in range(0, int(0.2 * len(demo_data))):
		spamwriter.writerow(demo_data[d])

with open('./csvFiles/product_test.csv', 'wb') as csvfile_b:
	spamwriter = csv.writer(csvfile_b, delimiter=' ', quotechar=' ')#, quoting=csv.QUOTE_MINIMAL)
	for p in range(0, int(0.2 * len(prod_data))):
		spamwriter.writerow(prod_data[p])

with open('./csvFiles/transaction_test.csv', 'wb') as csvfile_a:
	spamwriter = csv.writer(csvfile_a, delimiter=' ', quotechar=' ')#, quoting=csv.QUOTE_MINIMAL)
	for t in range(0, int(0.2 * len(trans_data))):
		spamwriter.writerow(trans_data[t])
