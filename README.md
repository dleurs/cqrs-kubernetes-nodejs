# Simple CQRS example in Kubernetes with Nodejs / TypeScript

## What is CQRS ?

CQRS is about separating the read and write, thought having two separate databases.
- The action of reading the database is called <strong>a query</strong>, equivalent in HTTP of a <strong>GET</strong> Request
- The action of writing the database is called <strong>a command</strong>, equivalent in HTTP of a <strong>POST, PUT, DELETE and PATCH</strong>


CQRS is suitable for systems in which the number of writing and reading accesses differs greatly. With CQRS, read and write will scale independently. However, it adds a lot of complexity, and your data will be "eventual consistent". The synchronisation between your read and write databases may extend the time you will be able to see the result of a write. 

More info on CQRS :
- Greg Young on CQRS and Event Sourcing https://www.youtube.com/watch?v=JHGkaShoyNs
- Clear explaination of CQRS : https://community.risingstack.com/when-to-use-cqrs/
- Nice schemas : https://martinfowler.com/bliki/CQRS.html
## What is this example about ?
In this project, I created a simple ordering platform. You can make orders to buy some apple and pear. The merchant will be able to see the total number and price of product sold.
![Project architecture](/assets/CQRS.png)

![Gif demo of this app](/assets/testing-this-project.gif)

Event Sourcing is not implemented in this project. Event Sourcing is commonly found with CQRS architectures. 
## How to setup NodeJS / TypeScript on VSCode 
https://github.com/dleurs/learn_nodejs_ts

