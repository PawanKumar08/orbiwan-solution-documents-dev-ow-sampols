SSH_KEY="~/.ssh/id_rsa"
USER="ubuntu"
HOST="resources.orbiwise.com"
PROJECT_DIR="/usr/local/var/sites_rkg/owdocs"
DEST_DIR="/usr/local/var/sites_rkg/owdocs"

SRC_DIR="ow-resources-ejs-like"

process_documentation_files(){

    # rm -rf dist/logs
    # rm -rf $SRC_DIR/_site
    # rm -rf build
    # mkdir -p build
    rm -rf _site
    

    # cd $SRC_DIR
    bundle exec jekyll build
    # cd _site/
    # tar cvzf ../../build/site.tar.gz * 
    # cd ../..
    cp -R _site/* $DEST_DIR/.

    # echo "==> Transferring SaaS Signup Server . <=="
    # echo "========================================="
    # scp -i "$SSH_KEY" build/site.tar.gz "$USER@$HOST":$PROJECT_DIR/. || exit 1
    
    # echo "==> Extracting the site files <=="
    # echo "================================="
    # ssh -i "$SSH_KEY" "$USER@$HOST" "cd $PROJECT_DIR/;tar xvzf site.tar.gz" || exit 1

}



process_documentation_files


echo ""
echo ""
echo "==============================="
echo "==> The Deployment finished <=="
echo "==============================="


