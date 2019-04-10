# VAI Developer Challenge
- API with single route
- queries the complexity of input text from the URL

# Pseudo Revisions
Falling just short of the 3 hour goal, here are some next steps I would take to complete this app:
- Refactor JS logic to incorporate the MongoDB that is now storing the non-lexical words
  - Remove the nonLexicalWords variable
  - Replace corresponding logic to function with MongoDB queries that identify and match words in the database    with words in the input 
  - Remove those words from appropriate array and calculate lexical density using the new queries
- Create a protected endpoint to incorporate new words
  - Add a POST route to allow a user to communicate with the database
  - implement basic email/password authentication or oAuth to protect this endpoint
  - hinge access to the endpoint on a boolean which represents whether or not an appropriate user is logged in
- Bug Fixes
  - tighten logic to prevent unwanted errors (e.g. when a user forgets a period on sentence two, current logic only recognizes one sentence)