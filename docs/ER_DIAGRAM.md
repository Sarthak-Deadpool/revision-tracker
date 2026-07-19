High level relationship

-----------------------------------------------------------------

User
 │
 │ 1
 │
 ▼
Subject
 │
 │ 1
 │
 ▼
Topic
 │
 │ 1
 │
 ▼
Revision

_______________________________________________________________________________

Relation between user and subject and topic and revision


-------------------------------------------------------

                    USER
         +-----------------------+
         | _id                   |
         | name                  |
         | email                 |
         | password              |
         | avatar                |
         | streak                |
         | longestStreak         |
         +-----------------------+
                   │
                 1 │
                   │
                   ▼
                 MANY
               SUBJECT
         +-----------------------+
         | _id                   |
         | userId (FK)           |
         | name                  |
         | color                 |
         | description           |
         +-----------------------+
                   │
                 1 │
                   │
                   ▼
                 MANY
                TOPIC
         +-----------------------+
         | _id                   |
         | userId (FK)           |
         | subjectId (FK)        |
         | name                  |
         | difficulty            |
         | masteryLevel          |
         | totalRevisions        |
         | notes                 |
         +-----------------------+
                   │
                 1 │
                   │
                   ▼
                 MANY
              REVISION
         +-----------------------+
         | _id                   |
         | userId (FK)           |
         | subjectId (FK)        |
         | topicId (FK)          |
         | revisionNumber        |
         | scheduledDate         |
         | completedAt           |
         | status                |
         | rating                |
         +-----------------------+

_____________________________________________________________________________