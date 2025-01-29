package models

import (
	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	UUID      string `json:"_id" bson:"_id"`
	FirstName string `json:"name" bson:"name"`
	LastName  string `json:"last_name" bson:"last_name"`
	Email     string `json:"email" bson:"email"`
	PwdHash   string `json:"pwd_hash" bson:"pwd_hash"`
	PwdSalt   string `json:"pwd_salt" bson:"pwd_salt"`
}

func ToUser(m bson.M) User {
	return User{
		UUID:      m["_id"].(string),
		FirstName: m["name"].(string),
		LastName:  m["last_name"].(string),
		Email:     m["email"].(string),
		PwdHash:   m["pwd_hash"].(string),
		PwdSalt:   m["pwd_salt"].(string),
	}
}
