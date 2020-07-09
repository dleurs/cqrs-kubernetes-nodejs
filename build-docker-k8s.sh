createImageAndK8s () {
    echo "Building image, $2 $1"
    cp -a utils $2/
    cd $2
    docker build . -t dleurs/cqrs-$2:$1
    docker push $3/cqrs-$2:$1
    /bin/rm -rf utils
    cd ../k8s
    sed "s/IMAGETAG/$1/g" NOIMAGETAG/$2-NOIMAGETAG.yaml > $2.yaml #sed `s/NOIMAGETAB/$1/g` dispatcher.yaml 
    #kubectl delete -f $2.yaml
    kubectl create -f $2.yaml
    kubectl replace -f $2.yaml
}

if [ "$#" -ne 2 ]; then
    echo "[Arguments missing] image tags and service name required, like ./build-docker-k8s.sh 1.0.0 dispatcher pseudo-docker or ./build-docker-k8s.sh 1.0.0 all pseudo-docker"
elif [ $2 = "all" ]; then
    echo "Building all images with tag $1 hosted with docker pseudo $3"
    createImageAndK8s $1 "command-order" $3
    createImageAndK8s $1 "dispatcher" $3
    createImageAndK8s $1 "order-db" $3
    createImageAndK8s $1 "process-data" $3
    createImageAndK8s $1 "query-order" $3
    createImageAndK8s $1 "stats-order-db" $3
else
    echo "Building a single image with tag $1 hosted with docker pseudo $3"
    createImageAndK8s $1 $2 $3
fi

