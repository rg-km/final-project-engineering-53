package models
import (
	"golang.org/x/crypto/bcrypt"
	"futuremap/utils/token"
)
type User struct {
	ID        uint   `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role"`
	Username  string `json:"username"`
	Phone    string `json:"phone"`
}
// HashPassword hashes the user's password. and send it to function SaveUser
func (user *User) HashPassword() {
	// Generate a hashed version of our password 
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	if err != nil {
		panic(err)
	}
	// Set the hashed password to our user
	user.Password = string(hashedPassword)
}
func SaveUser(user *User) {
	// Hash the password before saving from func HashPassword
	user.HashPassword()
	// Insert the user into the database
	DB.Exec("INSERT INTO users (email, password, role, username, phone) VALUES (?, ?, ?, ?, ?)", user.Email, user.Password, user.Role, user.Username, user.Phone)
}
func Login(email, password string) (string, error) {
	// Get the user from the database
	var user User
	// Get the user from the database with the email 
	err := DB.QueryRow("SELECT * FROM users WHERE email = ?", email).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.Username, &user.Phone)
	if err != nil {
		return "", err
	}
	// Check if the password is correct and return the token 
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", err
	}
	// Create a token with user id , user email and user role and return it
	token,err := token.GenerateToken(user.ID,user.Email,user.Role)
	if err != nil {
		return "",err
	}
	// Return the token
	return token,nil
}
func GetUserID(id uint) (User, error) {
	// Get the user from the database
	var user User
	// Get the user from the database with the id user.ID
	err := DB.QueryRow("SELECT * FROM users WHERE id = ?", id).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.Username, &user.Phone)
	if err != nil {
		return user, err
	}
	// Return the user
	return user, nil
}
func UpdateUser(user *User) {
	//Hash the password before saving from func HashPassword
	user.HashPassword()
	// Update the user in the database
	DB.Exec("UPDATE users SET email = ?, password = ?, role = ?, username = ?, phone = ? WHERE id = ?", user.Email, user.Password, user.Role, user.Username, user.Phone, user.ID)
}
func GetUserEmail(email string,phone string) (User, error) {
	// Get the user from the database
	var user User
	// Get the user from the database with the email and phone
	err := DB.QueryRow("SELECT * FROM users WHERE email = ? OR phone = ?", email,phone).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.Username, &user.Phone)
	if err != nil {
		return user, err
	}
	// Return the user data 
	return user, nil
}