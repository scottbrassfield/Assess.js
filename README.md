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

###Assessment
As a student answers questions correctly or incorrectly, the assessment is designed to follow up with questions on concepts that either build on or precede the answered question.  This required a fair amount of database interaction and more involved queries while the assessment is running. I created an express server with a series of endpoints that queried related concepts based on a test-taker's progress.  See the endpoints section below for detail on the api.

###User Interface
For this first phase of the project, the user interface consists of student and administrative dashboards. On the administrative side, I create two forms. One inserts a new concept into the database, including the relationships between other concepts.  The other inserts a test question into the database which can be connected to any concept. The student dashboard provides an entry point for the assessment.


##Endpoints

###Add a problem to the database
```
POST /problems 
```
The request body should contain a Problem object with the following properties:

| Name | Type | Description |
| --- | --- | --- |
| question | string, required | the text of the question to be shown the learner |
| answer | string/number, required | the answer to the provided question |
