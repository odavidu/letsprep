package db

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/odavidu/lets-prep/opt/env"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

type MongoDB struct {
	Username string
	Password string
	Address  string
}

var client *mongo.Client

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	username := os.Getenv(env.MongoUser)
	password := os.Getenv(env.MongoPassword)
	address := os.Getenv(env.MongoAddress)

	mongodb := MongoDB{
		Username: username,
		Password: password,
		Address:  address,
	}
	client = mongodb.Connect()
}

func GetClient() *mongo.Client {
	if client == nil {
		log.Fatal("MongoDB client is not initialized")
	}
	return client
}

func (db *MongoDB) Connect() *mongo.Client {
	uri := "mongodb+srv://" + db.Username + ":" + db.Password + "@" + db.Address

	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}

	fmt.Println("Connected to MongoDB Community Server!")
	return client
}
