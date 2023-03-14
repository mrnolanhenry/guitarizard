set -e

echo "🔥";
ls -alh;

#,__________________________________________________
#| Globals
project_root=$(dirname $(npm root))
cd "${project_root}/packages/ui";

#,__________________________________________________
# Clear the dist directory.
mkdir -p ./dist; rm -rf ./dist/*;

#,__________________________________________________
#| Client Build
npx vite build \
    --outDir ./dist \
    --emptyOutDir
