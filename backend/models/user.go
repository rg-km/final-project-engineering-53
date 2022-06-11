package models

import (
	"html"
	"strings"
	"errors"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"futuremap/utils/token"
)

type User struct {
	gorm.Model
	Username string `gorm:"size:255;not null;unique" json:"username"`
	Password string `gorm:"size:255;not null;" json:"password"`
	Email   string `gorm:"size:100;not null;unique" json:"email"`
	Phone   string `gorm:"size:20;not null;unique" json:"phone"`
	Role string `gorm:"size:255;not null;" json:"role"`
}

func GetUserByID(uid uint) (User,error) {
	var u User
	if err := DB.First(&u,uid).Error; err != nil {
		return u,errors.New("User not found!")
	}
	u.PrepareGive()
	return u,nil
}

func GetUserClientByID(uid uint) (User,error) {
	var u User
	if err := DB.First(&u,uid).Error; err != nil {
		return u,errors.New("User not found!")
	}
	u.PrepareGive()
	return u,nil

}

func (u *User) PrepareGive(){
	u.Password = ""
}
 
func VerifyPassword(password,hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(email string, password string,role string) (string,error) {
	var err error
	u := User{}
	err = DB.Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		return "", err
	}
	err = VerifyPassword(password, u.Password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}
	token,err := token.GenerateTokenAdmin(u.ID,u.Email,u.Role)
	if err != nil {
		return "",err
	}
	return token,nil
}
func LoginCheckClient(email string, password string,role string) (string,error) {
	var err error
	u := User{}
	err = DB.Model(User{}).Where("email = ?", email).Take(&u).Error
	if err != nil {
		return "", err
	}
	err = VerifyPassword(password, u.Password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}
	token,err := token.GenerateToken(u.ID,u.Email,u.Role)
	if err != nil {
		return "",err
	}
	return token,nil
}
func (u *User) SaveUser() (*User, error) {
	var err error
	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) SaveUserClient() (*User, error) {
	var err error
	err = DB.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

func (u *User) BeforeSave() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password),bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	return nil

}
