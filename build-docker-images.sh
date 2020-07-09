if [ "$#" -ne 2 ]; then
    echo "[Arguments missing] image tags and service name required, like ./build-docker-images.sh 1.0.0 dispatcher or ./build-docker-images.sh 1.0.0 all"
elif [ $2 = "all" ]; then
    echo "Building all images with tag $1"
else
    echo "Building a single image, $2 $1"
    cp -a utils $2/
    cd $2
    docker build . -t dleurs/cqrs-$2:$1
    docker push dleurs/cqrs-$2:$1
    /bin/rm -rf utils
    cd ../k8s
    sed "s/IMAGETAG/$1/g" NOIMAGETAG/$2-NOIMAGETAG.yaml > $2.yaml #sed `s/NOIMAGETAB/$1/g` dispatcher.yaml 
fi
