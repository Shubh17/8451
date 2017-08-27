import numpy as np
import csv


prod_data = []
with open('./csvFiles/product.csv', 'r') as prod_file:
	prod_reader = csv.reader(prod_file, delimiter='\t', quotechar='|')
	for row in prod_reader:
		prod_data.append(row)


#print ("Length of product data {}".format(len(prod_data)))
#print(prod_data[1])
for row in range (0,len(prod_data)):
	columns=prod_data[row][0].split(",")
	prod_data[row]=[columns[0]+","+columns[5]]
	#print(prod_data[row])
with open('./csvFiles/product_info.csv', 'wb') as csvfile_b:
	spamwriter = csv.writer(csvfile_b, delimiter=' ', quotechar=' ')#, quoting=csv.QUOTE_MINIMAL)
	for p in range(0,  len(prod_data)):
		spamwriter.writerow(prod_data[p])



