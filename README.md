### Navigation Bar Kata

A company desires to have an easy way to manage roles and sharing permissions.
This is inspired by AWS console, with introduction of a few complexities.
This should be Test Driven to achieve desired result. 

- The highest unit of the hierarchy is an organization. An Organization must have an id and a name 
- An Organization can be an Owner or a Partner
- An Organization can have 0 to 100 accounts. An account must have an id and a name.
- An Organization can have 0 to 10000 users. A user must have an id and a name.
- An Organization can give permissions to users in another account to manage resources via an account.
- When an organization gives permission to another organization via an account we call it partnership. i.e
An Organization A can give permission to Organization B and Organization C. We therefore call Organization B and Organization C
partners of Organization A. An Organization B can give permission to Organization A which means Organization A is a partner of Organization B
- When a user is created they belong to an account, and they are staff of that organization. 


Simple Tasks:
Hint: You can use local storage to store data

1. Create a simple form to manage organizations with properties
   - id
   - name 
   
2. Create a simple form to manage accounts and associate with an organization
    - id
    - orgId
    - name 
   
3. Create a simple form to manage users and associate with accounts
    - accountId
    - name
    - userId
   
4. Create a simple form to add users to 



1. We are supposed to create a navigation bar to allow switching between organizations



