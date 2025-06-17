#!/bin/bash

usage() {
  cat << USAGE >&2
    Options:
        --help                      for help
        
    Commands:
        generate:migration          create migration file  
        migrate                     run migration
        start                       run infrastructure
USAGE
exit 1
}



startInfrastructure(){
    docker compose -f docker-compose.yaml up --build
}



generateMigrationFile(){
    docker exec -it nestjs-prisma-test-server npm run create:migration 
}

runMigration(){
    docker exec nestjs-prisma-test-server npm run migrate:dev
}


if [ "$1" == "--help" ];
then
    usage
else
    if [ -n "$1" ];
    then
        case $1 in 
        "generate:migration")
            generateMigrationFile 
            ;;

        "start")
            startInfrastructure 
            ;;
        "migrate")
            runMigration
            ;;
        *)
            echo "unknown command $1"
            usage
            ;;
        esac
    else
        usage
    fi
fi