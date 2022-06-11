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
func (user *User) HashPassword() {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	if err != nil {
		panic(err)
	}
	user.Password = string(hashedPassword)
}
func SaveUser(user *User) {
	user.HashPassword()
	DB.Exec("INSERT INTO users (email, password, role, username, phone) VALUES (?, ?, ?, ?, ?)", user.Email, user.Password, user.Role, user.Username, user.Phone)
}
func Login(email, password string) (string, error) {
	var user User
	err := DB.QueryRow("SELECT * FROM users WHERE email = ?", email).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.Username, &user.Phone)
	if err != nil {
		return "", err
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return "", err
	}
	token,err := token.GenerateToken(user.ID,user.Email,user.Role)
	if err != nil {
		return "",err
	}
	return token,nil
}
func GetUserID(id uint) (User, error) {
	var user User
	err := DB.QueryRow("SELECT * FROM users WHERE id = ?", id).Scan(&user.ID, &user.Email, &user.Password, &user.Role, &user.Username, &user.Phone)
	if err != nil {
		return user, err
	}
	return user, nil
}