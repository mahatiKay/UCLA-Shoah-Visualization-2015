# This is to write the uniqueness score from the csv file generated by the previous 
# scirpt to a table. 
import csv
import common.db as db

insert_query = """
INSERT INTO uniquenessSecond2015 
(IntCode, IntervieweeName, UniquenessScore, SaturationPercent, TotSegments)
VALUES (%s, %s, %s, %s, %s)
"""
cursor = db.get_cursor()

with open('uniqueness_full_unsorted.csv') as csvfile:
	reader = csv.DictReader(csvfile)
     	for row in reader:
      		print(row['IntCode'], row['IntervieweeName'])
		IntCode = row['IntCode']
		IntervieweeName = row['IntervieweeName']
		UniquenessScore = row['uniqueness_score']
		SaturationPercent = row['SaturationPercent']
		TotSegments = row['TotSegments']
		
		cursor.execute(insert_query, (IntCode, IntervieweeName, UniquenessScore, SaturationPercent, TotSegments))		

cursor.close()