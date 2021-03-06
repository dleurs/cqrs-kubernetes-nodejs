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

```bash
kubectl top pod
NAME                                   CPU(cores)   MEMORY(bytes)   
cqrs-command-order-8586cc964b-qwwxr    0m           23Mi            
cqrs-dispatcher-544cd494fd-t4xfh       0m           24Mi            
cqrs-order-db-b4fb7c758-7x2k2          0m           22Mi            
cqrs-process-data-b988f897d-hf6j7      0m           23Mi            
cqrs-query-order-657b9f87d-jqh7j       0m           23Mi            
cqrs-stats-order-db-74768cbd54-8t9l9   0m           22Mi
```

# Install guide
## Get a K8s cluster
With OVH : https://www.ovh.com/manager/public-cloud/<br/>
In OVH, two B2-7-FLEX (2 CPU, 7Go RAM) will do.<br/>
It will take around 15 minuts to setup.<br/>
Then, get the kubeconfig and put it on ~/.kube/config
## Install Knative and Istio
https://knative.dev/docs/install/any-kubernetes-cluster/

Install the Custom Resource Definitions :
```bash
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/serving-crds.yaml
```
Install the core components of Serving :
```bash
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/serving-core.yaml
```
Install istioctl on your laptop terminal
```bash
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.6.5
export PATH=$PWD/bin:$PATH
```
Install Istio 1.6.5 for Knative with sidecar injection
```bash
cat << EOF > ./istio-minimal-operator.yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  values:
    global:
      proxy:
        autoInject: enabled
      useMCP: false
      # The third-party-jwt is not enabled on all k8s.
      # See: https://istio.io/docs/ops/best-practices/security/#configure-third-party-service-account-tokens
      jwtPolicy: first-party-jwt

  addonComponents:
    pilot:
      enabled: true
    prometheus:
      enabled: false

  components:
    ingressGateways:
      - name: istio-ingressgateway
        enabled: true
      - name: cluster-local-gateway
        enabled: true
        label:
          istio: cluster-local-gateway
          app: cluster-local-gateway
        k8s:
          service:
            type: ClusterIP
            ports:
            - port: 15020
              name: status-port
            - port: 80
              name: http2
            - port: 443
              name: https
EOF
```
```bash
istioctl manifest apply -f istio-minimal-operator.yaml
rm -rf istio-minimal-operator.yaml
```
```bash
kubectl label namespace knative-serving istio-injection=enabled
```
```bash
cat <<EOF | kubectl apply -f -
apiVersion: "security.istio.io/v1beta1"
kind: "PeerAuthentication"
metadata:
  name: "default"
  namespace: "knative-serving"
spec:
  mtls:
    mode: PERMISSIVE
EOF
```
Knative Istio controller
```bash
kubectl apply --filename https://github.com/knative/net-istio/releases/download/v0.16.0/release.yaml
```

## Checking the install
```bash
kubectl get pods --namespace istio-system
kubectl get pods --namespace knative-serving
```

## Test with a hello world
```bash
cat <<EOF | kubectl apply -f -
apiVersion: serving.knative.dev/v1 # Current version of Knative
kind: Service
metadata:
  name: helloworld-go # The name of the app
  namespace: default # The namespace the app will use
spec:
  template:
    spec:
      containers:
        - image: gcr.io/knative-samples/helloworld-go # Reference to the image of the app
          env:
            - name: TARGET # The environment variable printed out by the sample app
              value: "Go Sample v1"
EOF
```
```bash
kubectl get ksvc
kubectl --namespace istio-system get service istio-ingressgateway
curl -H "Host: helloworld-go.default.example.com" http://51.178.XXX.XXX # Hello World
```


## DNS configuation
Without DNS setup, after creating helloworld
```bash
kubectl get ksvc
kubectl --namespace istio-system get service istio-ingressgateway
curl -H "Host: helloworld-go.default.example.com" http://51.178.XXX.XXX
```
Magic DNS (xip.io)
```bash
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.16.0/serving-default-domain.yaml
```
If you want to set up a custom domain :<br/>
https://knative.dev/docs/serving/using-a-custom-domain/
```bash
kubectl edit cm config-domain --namespace knative-serving
```
```bash
apiVersion: v1
data:
  mydomain.com: ""
kind: ConfigMap
[...]
```
To publish your domain, you need to update your DNS provider to point to the IP address for your service ingress.<br/>
In OVH, Web > Domains > mydomain.com > DNS Zone > Add an entry > 
```bash
*.default IN A 51.178.XXX.XXX
```

To remove namespace from URL, for example http://helloworld-go.dleurs.fr instead of http://helloworld-go.default.dleurs.fr :<br/>
In OVH, Web > Domains > mydomain.com > Redirect > Add a redirection

helloworld-go.dleurs.fr, with tick wwww. > Tick to other web address > Tick invisible redirect > http://helloworld-go.default.dleurs.fr
## Step 1 : No CICD > bash script 
## Step 2 : Install Tekton Pipeline
Tested only for small exampleow<br/>
Install Tekton
```bash
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```
```bash
kubectl get pods --namespace tekton-pipelines
```
## Step 3 : Testing Tekton 
https://github.com/tektoncd/pipeline/blob/master/docs/README.md<br/>
https://github.com/tektoncd/pipeline/blob/master/docs/auth.md#basic-authentication-git<br/>

```bash
kubectl create secret docker-registry docker-creds \
                    --docker-server=index.docker.io \
                    --docker-username=<your-name> \
                    --docker-password=<your-pword> 
```
```bash
kubectl apply -f cicd-tekton/tekton-sa.yaml
kubectl apply -f cicd-tekton/docker-targets-resc.yaml
kubectl apply -f cicd-tekton/build-task.yaml
```
### Choose what service you want to build
```bash
kubectl apply -f cicd-tekton/git-source-resc.yaml # Modify image git
kubectl apply -f cicd-tekton/build-XXXXXX-task-run.yaml
```
```bash
tkn taskrun describe build-dispatcher-task-run
tkn taskrun logs build-dispatcher-task-run
```
```bash
tkn taskrun delete build-dispatcher-task-run --force
kubectl delete -f cicd-tekton
kubectl delete secret docker-creds

tkn taskrun delete build-dispatcher-task-run --force; kubectl apply -f cicd-tekton/builds-task-run.yaml
```

## Step 4 : Install Tekton Triggers

## Configure HTTPS
Not yet tested
```bash
https://knative.dev/docs/serving/using-a-tls-cert/
https://knative.dev/docs/serving/using-auto-tls/
https://cert-manager.io/docs/configuration/acme/dns01/
```



## Installation using Rancher
https://rancher.com/docs/rancher/v2.x/en/installation/k8s-install/helm-rancher/#1-install-the-required-cli-tools<br/>

```bash
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=rancher.default.dleurs.fr \     
  --set ingress.tls.source=letsEncrypt \
  --set letsEncrypt.email=contact@dleurs.fr
```
