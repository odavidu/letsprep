package auth

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/odavidu/lets-prep/models"
	"github.com/odavidu/lets-prep/opt/cookie"
	"github.com/odavidu/lets-prep/opt/env"
	"os"
	"time"
)

var jwtSecret string

func InitJWT() {
	jwtSecret = os.Getenv(env.Jwt)
}

func getSecretKey() []byte {
	return []byte(jwtSecret)
}

func GenerateToken(user *models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims[cookie.FirstName] = user.FirstName
	claims[cookie.LastName] = user.LastName
	claims[cookie.Uuid] = user.UUID
	claims[cookie.Expiry] = time.Now().Add(time.Hour * 24).Unix()

	return token.SignedString(getSecretKey())
}

func ValidateToken(tokenString string) (jwt.MapClaims, error) {
	secretKey := getSecretKey()

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid or expired token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, fmt.Errorf("could not extract claims")
	}

	return claims, nil
}
