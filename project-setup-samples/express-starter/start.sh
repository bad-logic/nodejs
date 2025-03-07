#!/bin/zsh

start(){
  docker compose -f docker-compose.yaml up --build
}

generate_migration(){
   if [ -z "$1" ]; then
      echo "please provide migration file name"
  else
      docker exec -it express_starter_container npm run migration:generate src/migrations/"$1"
  fi
}

run_migration(){
      docker exec -it express_starter_container npm run migration:run
}

revert_migration(){
      docker exec -it express_starter_container npm run migration:revert
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
else
    echo "unknown command $1 $2"
fi
