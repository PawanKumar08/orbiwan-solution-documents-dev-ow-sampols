SSH_KEY="~/.ssh/id_rsa"
USER="ubuntu"
HOST="resources.orbiwise.com"
PROJECT_DIR="/var/www/html-Sampols-public" # Change as per the instance 

SRC_DIR="ow-resources-ejs-like"
mkdir -p bkup
mv $SRC_DIR/en/gettingStarted/noiseui.md bkup/.  
mv $SRC_DIR/en/Documentation/eula.md bkup/.
mv $SRC_DIR/en/Documentation/device-datasheet.md bkup/. 

process_documentation_files_without_images(){

    # rm -rf dist/logs
    # rm -rf $SRC_DIR/_site
    rm -rf build
    mkdir -p build
    

    cd $SRC_DIR
    bundle exec jekyll build
    # arch -arch x86_64 bundle exec jekyll build

    cd _site/
    rm -rf videos
    rm -rf images
    rm -rf videos
    tar cvzf ../../build/site.tar.gz * 
    cd ../..
    

    echo "==> Transferring SaaS Signup Server . <=="
    echo "========================================="
    scp -i "$SSH_KEY" build/site.tar.gz "$USER@$HOST":$PROJECT_DIR/. || exit 1
    
    echo "==> Extracting the site files <=="
    echo "================================="
    ssh -i "$SSH_KEY" "$USER@$HOST" "cd $PROJECT_DIR/;tar xvzf site.tar.gz" || exit 1
}

process_documentation_files(){

    # rm -rf dist/logs
    rm -rf $SRC_DIR/_site
    rm -rf build
    mkdir -p build
    

    cd $SRC_DIR
    bundle exec jekyll build
    # arch -arch x86_64 bundle exec jekyll build

    
    cd _site/
    rm -rf videos
    tar cvzf ../../build/site.tar.gz * 
    cd ../..
    

    echo "==> Transferring SaaS Signup Server . <=="
    echo "========================================="
    scp -i "$SSH_KEY" build/site.tar.gz "$USER@$HOST":$PROJECT_DIR/. || exit 1
    
    echo "==> Extracting the site files <=="
    echo "================================="
    ssh -i "$SSH_KEY" "$USER@$HOST" "cd $PROJECT_DIR/;tar xvzf site.tar.gz" || exit 1

}

echo "Do you wish to push images?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) process_documentation_files; break;;
        No ) process_documentation_files_without_images; break;;
    esac
done

mv bkup/noiseui.md $SRC_DIR/en/gettingStarted/.
mv bkup/eula.md $SRC_DIR/en/Documentation/.
mv bkup/device-datasheet.md $SRC_DIR/en/Documentation/.


echo ""
echo ""
echo "==============================="
echo "==> The Deployment finished <=="
echo "==============================="


