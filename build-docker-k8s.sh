createImageAndK8s () {
    echo "Building image $3/cqrs-$2:$1"
    cp -a utils $2/
    cd $2
    docker build . -t $3/cqrs-$2:$1
    docker push $3/cqrs-$2:$1
    /bin/rm -rf utils
    cd ../k8s
    sed "s/IMAGETAG/$1/g" NOIMAGETAG/$2-NOIMAGETAG.yaml > $2.yaml #sed `s/NOIMAGETAB/$1/g` dispatcher.yaml 
    #kubectl delete -f $2.yaml
    kubectl create -f $2.yaml
    cd ..
    kubectl replace -f $2.yaml
}
services=(
    "dispatcher"
    "command-order"
    "order-db"
    "process-data"
    "query-order"
    "stats-order-db"
)

# kubectl create
if [ "$#" -eq 1 ] && [ $1 == "run-k8s" ]; then
    for i in "${services[@]}"; do
        kubectl create -f k8s/"$i".yaml
    done
# kubectl replace
elif [ "$#" -eq 1 ] && [ $1 == "replace-k8s" ]; then
    for i in "${services[@]}"; do
        kubectl replace -f k8s/"$i".yaml
    done
# kubectl delete
elif [ "$#" -eq 1 ] && [ $1 == "delete-k8s" ]; then
    for i in "${services[@]}"; do
        kubectl delete -f k8s/"$i".yaml
    done
# docker build and kubernetes create
elif [ "$#" -ne 3 ]; then
    echo "[Arguments missing] image tags and service name required, like ./build-docker-k8s.sh 1.0.0 dispatcher pseudo-docker or ./build-docker-k8s.sh 1.0.0 all pseudo-docker. If you just want to create k8s services, ./build-docker-k8s.sh (run-k8s | delete-k8s)"
elif [ $2 = "all" ]; then
    echo "Building all images with tag $1 hosted with docker pseudo $3"
    for i in "${services[@]}"; do
        createImageAndK8s $1 "$i" $3
    done
else
    echo "Building a single image with tag $1 hosted with docker pseudo $3"
    createImageAndK8s $1 $2 $3
fi

