package main

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/go-redis/redis/v8"
)

func main() {
	fmt.Println("[WORKER] JUST STARTED")

	err := godotenv.Load()
	if err != nil {
		fmt.Println("[WORKER] [ERROR] COULD NOT LOAD ENVIRONMENT VARIABLES")
		fmt.Println(err)
	} else {
		fmt.Println("[WORKER] JUST LOADED ENVIRONMENT VARIABLES")
	}

	ctx := context.Background()

	config := redis.Options{
		Addr:     os.Getenv("REDIS"),
		Password: "",
		DB:       0,
	}

	dbHost := os.Getenv("DATABASE_HOST")
	dbPost := os.Getenv("DATABASE_PORT")
	dbUser := os.Getenv("DATABASE_USERNAME")
	dbName := os.Getenv("DATABASE_NAME")
	dbPassword := os.Getenv("DATABASE_PASSWORD")

	dbConfig := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", dbHost, dbPost, dbUser, dbName, dbPassword)
	db, err := gorm.Open(postgres.Open(dbConfig), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	} else {
		fmt.Println("[WORKER] JUST CONNECTED TO POSTGRES")
	}

	sub := redis.NewClient(&config)

	fmt.Println("[WORKER] JUST CONNECTED TO REDIS")

	pubsub := sub.Subscribe(ctx, "meme:created")

	defer pubsub.Close()

	channel := pubsub.Channel()

	for msg := range channel {
		id := msg.Payload
		fmt.Println("[WORKER] JUST RECIEVED A MEME WITH ID ", id)

		db.Exec("update meme set verified = true where id = ? ", id)

		if err != nil {
			fmt.Println("[WORKER] [ERROR] COULD NOT VERIFY A MEME WITH ID ", id)
		} else {
			fmt.Println("[WORKER] VERIFIED A MEME WITH ID ", id)
		}

	}

}
