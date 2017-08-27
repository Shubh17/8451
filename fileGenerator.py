import csv 
import math
#from _future_import with_statement

prod_data = []
with open('./hh_demographic.csv', 'r') as prod_file:
	prod_reader = csv.reader(prod_file, delimiter='\t', quotechar='|')
	for row in prod_reader:
		prod_data.append(row)

trans_data = []
with open('./transaction_data.csv', 'r') as trans_file:
	trans_reader = csv.reader(trans_file, delimiter='\t', quotechar='|')
	for row in trans_reader:
		trans_data.append(row)

demo_data = []
with open('./product.csv', 'r') as demo_file:
#the file above is the one being read in
	demo_reader = csv.reader(demo_file, delimiter='\t', quotechar='|')
	for row in demo_reader:
		demo_data.append(row)

print "Length of demo data {}".format(len(demo_data))
print "Length of trans data {}".format(len(trans_data))
print "Length of product data {}".format(len(prod_data))
x=(int(.2*len(demo_data)))
y=str(demo_data)
with open('demo_test.csv', 'w') as csvfile:
	spamwriter = csv.writer(csvfile, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
	for i in range(0,x):
		spamwriter.writerow(y)
