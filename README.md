# Simple CQRS example in Kubernetes with Nodejs / TypeScript

## What is this project ?
In this project, I try to build a simple app following <strong>CQRS architecture</strong>. I created a simple ordering platform. You can make orders to buy some apples and pears. The merchant will be able to see the total number and price of product ordered. For simplicity, here the two databases are just NodeJS app.
![Project architecture](/assets/CQRS.png)

Using this project locally :<br/>
![Gif demo of this app](/assets/testing-this-project.gif)

With kubernetes, on OVH : 
```bash
./build-docker-k8s 1.0.0 all docker-pseudo

kubectl get deploy,pod,svc
NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/cqrs-command-order    1/1     1            1           3h56m
deployment.apps/cqrs-dispatcher       1/1     1            1           4h41m
deployment.apps/cqrs-order-db         1/1     1            1           108m
deployment.apps/cqrs-process-data     1/1     1            1           97m
deployment.apps/cqrs-query-order      1/1     1            1           19m
deployment.apps/cqrs-stats-order-db   1/1     1            1           79m

NAME                                       READY   STATUS    RESTARTS   AGE
pod/cqrs-command-order-8586cc964b-qwwxr    1/1     Running   0          3h54m
pod/cqrs-dispatcher-544cd494fd-t4xfh       1/1     Running   0          3h54m
pod/cqrs-order-db-b4fb7c758-7x2k2          1/1     Running   0          108m
pod/cqrs-process-data-b988f897d-hf6j7      1/1     Running   0          5m15s
pod/cqrs-query-order-657b9f87d-jqh7j       1/1     Running   0          17m
pod/cqrs-stats-order-db-74768cbd54-8t9l9   1/1     Running   0          64m

NAME                              TYPE           CLUSTER-IP     EXTERNAL-IP                         PORT(S)        AGE
service/cqrs-command-order-svc    ClusterIP      10.3.188.8     <none>                              80/TCP         3h56m
service/cqrs-dispatcher-svc       LoadBalancer   10.3.20.108    XXXXXXXXXXXXXXXX.gra7.k8s.ovh.net   80:30874/TCP   4h38m
service/cqrs-order-db-svc         ClusterIP      10.3.77.252    <none>                              80/TCP         108m
service/cqrs-process-data-svc     ClusterIP      10.3.112.183   <none>                              80/TCP         100m
service/cqrs-query-order-svc      ClusterIP      10.3.29.20     <none>                              80/TCP         19m
service/cqrs-stats-order-db-svc   ClusterIP      10.3.29.173    <none>                              80/TCP         79m
service/kubernetes                ClusterIP      10.3.0.1       <none>                              443/TCP        23d
```

## What is CQRS ?

CQRS is about <strong>separating reads and writes</strong>, thought having two separate databases.
- The action of reading the database is called <strong>a query</strong>, equivalent in HTTP of a <strong>GET</strong> Request
- The action of writing the database is called <strong>a command</strong>, equivalent in HTTP of a <strong>POST, PUT and DELETE</strong>


CQRS is suitable for systems in which <strong>the number of writing and reading accesses differs greatly</strong>. With CQRS, read and write will <strong>scale independently</strong>. However, it adds a lot of complexity, and your data will be "eventual consistent" : the synchronisation between your read and write databases may extend the time to see the result of a write. 

More info on CQRS :
- Greg Young on CQRS and Event Sourcing https://www.youtube.com/watch?v=JHGkaShoyNs
- Clear explaination of CQRS : https://community.risingstack.com/when-to-use-cqrs/
- Nice schemas : https://martinfowler.com/bliki/CQRS.html


Event Sourcing is not implemented in this project. Event Sourcing is commonly found with CQRS architectures. 
## How to setup NodeJS / TypeScript on VSCode 
https://github.com/dleurs/learn_nodejs_ts

## Other
build-docker-k8s.sh script is a bit tricky. I will try to look for cleaner solutions, maybe Tekton
