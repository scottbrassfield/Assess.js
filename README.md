# Assess.js
An adaptive knowledge assessment for JavaScript learners

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
