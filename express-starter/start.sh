#!/bin/zsh

CONTAINER_NAME="express_starter_container"

start(){
  docker compose -f docker-compose.yaml up --build
}

generate_migration(){
   if [ -z "$1" ]; then
      echo "please provide migration file name"
  else
      docker exec -it "$CONTAINER_NAME" npm run migration:generate src/migrations/"$1"
  fi
}

run_migration(){
      docker exec -it "$CONTAINER_NAME" npm run migration:run
}

revert_migration(){
      docker exec -it "$CONTAINER_NAME" npm run migration:revert
}

test(){
  docker exec -it "$CONTAINER_NAME" npm run test
}

test_watch(){
  docker exec -it "$CONTAINER_NAME" npm run test:watch
}


if [ -z "$1" ]; then
  echo "starting application"
  start
elif [ "$1" = "migration:generate" ]; then
  echo "generating migration file"
  generate_migration "$2"
elif [ "$1" = "migration:run" ]; then
    echo "running migration"
    run_migration
elif [ "$1" = "migration:revert" ]; then
    echo "reverting migration"
    revert_migration
elif [ "$1" = "test" ]; then
    echo "running test"
    test
elif [ "$1" = "test:watch" ]; then
    echo "running test in watch mode"
    test_watch
else
    echo "unknown command $1 $2"
fi
