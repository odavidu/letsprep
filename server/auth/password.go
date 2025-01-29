package auth

import (
	"bytes"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"golang.org/x/crypto/argon2"
)

const (
	Memory     = 64 * 1024
	Time       = 1
	Threads    = 4
	KeyLength  = 32
	SaltLength = 16
)

func HashPassword(password string) (string, string, error) {
	salt := make([]byte, SaltLength)
	_, err := rand.Read(salt)
	if err != nil {
		return "", "", fmt.Errorf("failed to generate salt: %v", err)
	}

	hash := argon2.IDKey([]byte(password), salt, Time, Memory, Threads, KeyLength)

	saltBase64 := base64.RawStdEncoding.EncodeToString(salt)
	hashBase64 := base64.RawStdEncoding.EncodeToString(hash)

	return saltBase64, hashBase64, nil
}

func VerifyPassword(password, saltBase64, hashBase64 string) (bool, error) {
	salt, err := base64.RawStdEncoding.DecodeString(saltBase64)
	if err != nil {
		return false, fmt.Errorf("failed to decode salt: %v", err)
	}
	hash, err := base64.RawStdEncoding.DecodeString(hashBase64)
	if err != nil {
		return false, fmt.Errorf("failed to decode hash: %v", err)
	}

	match := argon2.IDKey([]byte(password), salt, Time, Memory, Threads, KeyLength)
	return bytes.Compare(hash, match) == 0, nil
}
