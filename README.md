# Assess.js
An adaptive knowledge assessment for JavaScript learners

##Overview
Assess.js is a platform for assessing someone's knowledge of basic JavaScript concepts. Inspiration for this project came from the ideas surrounding knowledge space theory, a theory that relies on the notion that a topic can be broken down into several interrelated concepts. Each person's understanding of the topic is called a knowledge state, and it can be represented by the collection of related concepts within the topic that the person best understands.

##Technologies
- React
- Redux
- Neo4j 
- Cypher Query Language
- Node
- Express
- Semantic UI


##Details

###Data storage and maintenance
Given that the underpinnings of the assessment platform deal with data that is interrelated, it made sense to model this data using a graph database.  I used Neo4j to create a database of JavaScript concepts (e.g., data types, variables) with relationships between the concepts based on how the concepts build on each other. I used Neo4j's Cypher Query Language to interact with the database, with the help of a Node library that provided a light abstraction for simpler queries. 

![Alt text](/src/images/screenshots/Screen Shot 2016-11-09 at 12.53.13 PM.png?raw=true "Graph Database")

###Assessment
As a student answers questions correctly or incorrectly, the assessment is designed to follow up with questions on concepts that either build on or precede the answered question.  This required a fair amount of database interaction and more involved queries while the assessment is running. I created an express server with a series of endpoints that queried related concepts based on a test-taker's progress.  See the Api section below for detail on the api.

###User Interface
For this first phase of the project, the user interface consists of student and administrative dashboards. On the administrative side, I create two forms. One inserts a new concept into the database, including the relationships between other concepts.  The other inserts a test question into the database which can be connected to any concept. The student dashboard provides an entry point for the assessment.

![Alt text](/src/images/screenshots/Screen Shot 2016-11-09 at 9.24.51 AM.png?raw=true "Home Page")
![Alt text](/src/images/screenshots/Screen Shot 2016-11-09 at 9.26.36 AM.png?raw=true "Admin Dashboard")
![Alt text](/src/images/screenshots/Screen Shot 2016-11-09 at 9.26.55 AM.png?raw=true "Student Dashboard")


##Api

As discussed above, the graph database consists of a series of nodes (i.e., JavaScript concepts and test questions), and relationships between the concepts and questions. In Neo4j, the nodes and relationships are provided with labels for identification. Here is a summary of the nodes and relationships modeled in the database.

Nodes:  
- Concepts
- Problems (test questions)

Relationships
- Concept PRECEDES Concept
- Problem TESTS Concept

###Endpoints

####Add a problem to the database
```
POST /problems 
```
The request body should contain a Problem object with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| question | string, required | the text of the question to be shown the learner |
| answer | string/number, required | the answer to the provided question |


###Run in Development Environment
- Make sure Neo4j is installed. Instructions here: https://neo4j.com/download/
- Get a free GrapheneDB sandbox, and copy URL into a GRAPHENEDB_URL environment variable in your bash profile
- ```npm install```
- ```npm run dev```
- Open http://localhost:8080/
