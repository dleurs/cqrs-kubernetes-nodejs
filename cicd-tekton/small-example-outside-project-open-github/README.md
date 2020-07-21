## Step 3.0 : Testing Tekton with small helloworld on Open GitHub
https://github.com/tektoncd/pipeline/blob/master/docs/README.md<br/>
```bash
kubectl create secret docker-registry regcred \
                    --docker-server=index.docker.io \
                    --docker-username=<your-name> \
                    --docker-password=<your-pword>
```
```bash
kubectl apply -f cicd-tekton/small-example-outside-project-open-github/sa.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-open-github/skaffold-git-resc.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-open-github/docker-target-resc.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-open-github/task.yaml
kubectl apply -f cicd-tekton/small-example-outside-project-open-github/task-run.yaml

```
```bash
tkn taskrun describe build-docker-image-from-git-source-task-run
tkn taskrun logs build-docker-image-from-git-source-task-run
```
```bash
tkn taskrun delete build-docker-image-from-git-source-task-run --force
kubectl delete -f cicd-tekton/small-example-outside-project-open-github
kubectl delete secret regcred