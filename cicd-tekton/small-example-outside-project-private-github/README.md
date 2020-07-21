## Step 3.0 : Testing Tekton with small helloworld on private GitHub
https://github.com/tektoncd/pipeline/blob/master/docs/README.md<br/>
https://github.com/tektoncd/pipeline/blob/master/docs/auth.md#basic-authentication-git<br/>
```bash
kubectl create secret docker-registry regcred \
                    --docker-server=index.docker.io \
                    --docker-username=<your-name> \
                    --docker-password=<your-pword>

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: github-creds
  annotations:
    tekton.dev/git-0: https://github.com # Described below
type: kubernetes.io/basic-auth
stringData:
  username: <username>
  password: <github-oath-token> # To get the token, GitHub.com > Settings (click top right, on bubble profile) > Developer settings (Vertical menu on the right, last choice) > Personal Access Token > Generate new token > just check repo and add note > that's it
EOF
```
```bash
kubectl apply -f cicd-tekton/small-example-outside-project-private-github/sa.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-private-github/skaffold-git-resc.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-private-github/docker-target-resc.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-private-github/task.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-private-github/task-run.yaml

```
```bash
tkn taskrun describe build-docker-image-from-git-source-task-run
tkn taskrun logs build-docker-image-from-git-source-task-run
```
```bash
tkn taskrun delete build-docker-image-from-git-source-task-run --force
kubectl delete -f cicd-tekton/small-example-outside-project-private-github
kubectl delete secret regcred
```
```bash
cat <<EOF | kubectl apply -f -
apiVersion: serving.knative.dev/v1 # Current version of Knative
kind: Service
metadata:
  name: helloworld-private-repo # The name of the app
  namespace: default # The namespace the app will use
spec:
  template:
    spec:
      containers:
        - image: index.docker.io/dleurs/tekton-basic-nodejs-app-private-repo:1.0.1
EOF
```