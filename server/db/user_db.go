package db

import (
	"context"
	"errors"
	"github.com/google/uuid"
	"github.com/odavidu/lets-prep/auth"
	"github.com/odavidu/lets-prep/handlers"
	"github.com/odavidu/lets-prep/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func GetUserByEmail(email string) (*models.User, error) {
	return getUser(bson.M{
		"email": email,
	})
}

func GetUserByUUID(uuid string) (*models.User, error) {
	return getUser(bson.M{
		"_id": uuid,
	})
}

func EmailExist(email string) (bool, error) {
	user, err := getUser(bson.M{
		"email": email,
	})

	if err != nil {
		return false, err
	}

	return user != nil, nil
}

func CreateUser(request handlers.SignUpRequest) error {
	client := GetClient()
	collection := client.Database("lets_prep").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	saltBase64, hashBase64, err := auth.HashPassword(request.Password)

	if err != nil {
		return err
	}

	user := models.User{
		UUID:      uuid.New().String(),
		FirstName: request.FirstName,
		LastName:  request.LastName,
		Email:     request.Email,
		PwdHash:   hashBase64,
		PwdSalt:   saltBase64,
	}

	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		return err
	}
	return nil
}

func getUser(filter bson.M) (*models.User, error) {
	client := GetClient()
	collection := client.Database("lets_prep").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var result bson.M

	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}

	user := models.ToUser(result)

	return &user, nil
}
