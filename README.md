# Simple CQRS example in Kubernetes with Nodejs / TypeScript

## What is this project ?
In this project, I try to build a simple app following <strong>CQRS architecture</strong>. I created a simple ordering platform. You can make orders to buy some apples and pears. The merchant will be able to see the total number and price of product ordered. For simplicity, here the two databases are just NodeJS app.
![Project architecture](/assets/CQRS.png)

Using this project locally :
![Gif demo of this app](/assets/testing-this-project.gif)

## What is CQRS ?

CQRS is about <strong>separating reads and writes</strong>, thought having two separate databases.
- The action of reading the database is called <strong>a query</strong>, equivalent in HTTP of a <strong>GET</strong> Request
- The action of writing the database is called <strong>a command</strong>, equivalent in HTTP of a <strong>POST, PUT, DELETE and PATCH</strong>


CQRS is suitable for systems in which <strong>the number of writing and reading accesses differs greatly</strong>. With CQRS, read and write will <strong>scale independently</strong>. However, it adds a lot of complexity, and your data will be "eventual consistent" : the synchronisation between your read and write databases may extend the time to see the result of a write. 

More info on CQRS :
- Greg Young on CQRS and Event Sourcing https://www.youtube.com/watch?v=JHGkaShoyNs
- Clear explaination of CQRS : https://community.risingstack.com/when-to-use-cqrs/
- Nice schemas : https://martinfowler.com/bliki/CQRS.html


Event Sourcing is not implemented in this project. Event Sourcing is commonly found with CQRS architectures. 
## How to setup NodeJS / TypeScript on VSCode 
https://github.com/dleurs/learn_nodejs_ts

## Other
Soft links are used in order for the utils/ to be present in all NodeJs app, and to be able to build docker image

