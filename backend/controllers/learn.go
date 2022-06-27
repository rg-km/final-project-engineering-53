package controllers

import (
	"futuremap/models"
	"math/rand"
	"strconv"
	"futuremap/utils/token"
	"github.com/gin-gonic/gin"
	"strings"
	"context"
	"io"
	"log"
	"net/http"
	firebase "firebase.google.com/go"
	"cloud.google.com/go/firestore"
	cloud "cloud.google.com/go/storage"
	"google.golang.org/api/option"
)
type App struct {
	ctx     context.Context
	client  *firestore.Client
	storage *cloud.Client
}

type Image struct {
	Url string `json:"url"`
	Image string `json:"image"`
}
func (r *App) Init(){
	r.ctx = context.Background()
	sa := option.WithCredentialsFile("./key/futurego.json")
	app, err := firebase.NewApp(r.ctx, nil, sa)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	r.client, err = app.Firestore(r.ctx)
	if err != nil {
		log.Fatalf("error initializing firestore: %v\n", err)
	}
	//admin
	r.storage, err = cloud.NewClient(r.ctx, option.WithCredentialsFile("./key/futurego.json"))
	if err != nil {
		log.Fatalf("error initializing storage: %v\n", err)
	}
}
func Learning(c *gin.Context) {
	//input learning data with post form method
	var route App
	learning := models.Learning{}
	route.Init()
	learning.Header = c.PostForm("header")
	learning.SubHeader = c.PostForm("sub_header")
	learning.Content = c.PostForm("content")
	//input image data with post formfile method
	file, handler, err := c.Request.FormFile("image")
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()
	image_name := handler.Filename
	image_name = strings.Replace(image_name, " ", "", -1)
	imagePath := strconv.FormatUint(uint64(rand.Int63()), 10) + image_name
	ctx := context.Background()
	wc := route.storage.Bucket("futurego-29b1b.appspot.com").Object(imagePath).NewWriter(ctx)
	io.Copy(wc, file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	wc.Close()
	err = CreateImageUrl(imagePath, "futurego-29b1b.appspot.com", ctx, route.client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	learning.Image = imagePath
	//save learning data to database with function SaveLearning from models learning.go
	_, err = models.SaveLearning(&learning)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with success message
	c.JSON(200, gin.H{"message": "success"})
}
func LearningList(c *gin.Context) {
	//get learning list from database
	var learning []models.Learning
	//using the function GetLearningList from models learning.go to get learning list
	learning, err := models.GetLearning()
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//replace image url with image url
	for i := 0; i < len(learning); i++ {
		learning[i].Image = "https://storage.googleapis.com/futurego-29b1b.appspot.com/" + learning[i].Image
	}
	//if no error, return with learning list
	c.JSON(200, gin.H{"materials": learning})
}
func GetLearningById(c *gin.Context) {
	//get learning id from url
	id := c.Param("id")
	//convert id string to uint64 with function ParseUint from strconv package
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get learning from database with id and function GetLearningById from models learning.go
	learning, err := models.GetLearningById(uint(id_uint))
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//extract token from id user if click detail learning
	user_id,err := token.ExtractTokenID(c)
	//if errror, return with error message
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	history := models.History{}
	//set user id to history
	history.UserID = uint(user_id)
	//set learning id to history
	history.LearningID = uint(id_uint)
	//set learning header id to history
	history.Header = learning.Header
	//set learning sub header id to history
	history.SubHeader = learning.SubHeader
	//save history to database with function SaveHistory from models history.go
	_,err = models.SaveHistory(&history)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//replace image url with image url
	learning.Image = "https://storage.googleapis.com/futurego-29b1b.appspot.com/" + learning.Image
	//if no error, return with learning
	c.JSON(200, gin.H{"materials": learning})
}
//get history list from database
func GetHistory(c *gin.Context){
	//extract token and show history list by id 
	user_id,err := token.ExtractTokenID(c)
	//if error, return with error message
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get history list from database with user id and function GetHistory from models history.go
	history,err := models.GetHistory(uint(user_id))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with history list
	c.JSON(200, gin.H{"history": history})
}
func UpdateLearning(c *gin.Context) {
	var route App
	route.Init()
	id := c.Param("id")
	id_uint, err := strconv.ParseUint(id, 10, 64)
	//get old learning data from database with id and function GetLearningById from models learning.go
	old_learning, err := models.GetLearningById(uint(id_uint))
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	old_image := old_learning.Image
	//delete image from firebase storage
	ctx := context.Background()
	err = route.storage.Bucket("futurego-29b1b.appspot.com").Object(old_image).Delete(ctx)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	learning := models.Learning{}
	learning.Header = c.PostForm("header")
	learning.SubHeader = c.PostForm("sub_header")
	learning.Content = c.PostForm("content")
	file, handler, err := c.Request.FormFile("image")
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()
	image_name := handler.Filename
	//remove space from image name
	image_name = strings.Replace(image_name, " ", "", -1)
	//if no error, save image to local disk and save image path to database with random number + image name
	imagePath := strconv.FormatUint(uint64(rand.Int63()), 10) + image_name
	ctx = context.Background()
	//create file with image path
	wc := route.storage.Bucket("futurego-29b1b.appspot.com").Object(imagePath).NewWriter(ctx)
	io.Copy(wc, file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	wc.Close()
	//create image url with function CreateImageUrl 
	err = CreateImageUrl(imagePath, "futurego-29b1b.appspot.com", ctx, route.client)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//url
	learning.Image = imagePath
	_, err = models.UpdateLearning(uint(id_uint), &learning)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
func DeleteLearning(c *gin.Context) {
	var route App
	route.Init()
	id := c.Param("id")
	id_uint, err := strconv.ParseUint(id, 10, 64)
	//get old learning data from database with id and function GetLearningById from models learning.go
	learning, err := models.GetLearningById(uint(id_uint))
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	image := learning.Image
	//delete image from firebase storage
	ctx := context.Background()
	delete := route.storage.Bucket("futurego-29b1b.appspot.com").Object(image).Delete(ctx)
	if err != nil {
		c.JSON(400, gin.H{"error": delete.Error()})
		return
	}
	err = models.DeleteLearning(uint(id_uint))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
func MakeDiscussion(c *gin.Context){
	id := c.Param("id")
	//get discussion by id learning
	user_id,err := token.ExtractTokenID(c)
	//extract token id user
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//convert id string to uint64 with function ParseUint from strconv package
	learning_id, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	discussion := models.Discussion{}
	//set message to discussion
	discussion.Message = c.PostForm("message")
	//set user id to discussion
	discussion.UserID = uint(user_id)
	user,err := models.GetUserID(uint(user_id))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//set user name to discussion
	discussion.Username = user.Username
	//get time now
	discussion.CreatedAt = models.GetTimeNow()
	//set learning id to discussion
	discussion.LearningID = uint(learning_id)
	//save discussion to database with function SaveDiscussion from models discussion.go
	_,err = models.SaveDiscussion(&discussion)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with message success
	c.JSON(200, gin.H{"message": "success"})
}
//show discussion by learning id
func ShowDiscussion(c *gin.Context){
	//get learning id from url
	id := c.Param("id")
	//convert id string to uint64 with function ParseUint from strconv package
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get discussion from database with learning id and function GetDiscussion from models discussion.go
	discussion,err := models.GetDiscussionByLearningId(uint(id_uint))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with discussion
	c.JSON(200, gin.H{"discussion": discussion})
}

// func SearchLearning(c *gin.Context){
// 	//get search from url
// 	search := c.PostForm("search")
// 	//get learning from database with search and function SearchLearning from models learning.go
// 	learning,err := models.SearchLearning(search)
// 	if err != nil {
// 		c.JSON(400, gin.H{"error": err.Error()})
// 		return
// 	}
// 	//if no error, return with learning
// 	c.JSON(200, gin.H{"materials": learning})
// }

func CreateImageUrl(imagePath string, bucket string, ctx context.Context, client *firestore.Client) error {
	// Create a new instance of the Firestore service.
	db := client.Collection("images")
	// Create a new image document.
	_, err := db.Doc(imagePath).Set(ctx, &Image{
		Url: "https://firebasestorage.googleapis.com/v0/b/" + bucket + "/o/" + imagePath + "?alt=media",
		Image: imagePath,
	})
	if err != nil {
		return err
	}
	return nil
}
//delete image from firebase storage
func DeleteImage(c *gin.Context){
	//get image path from url
	var route App
	route.Init()
	imagePath := c.Param("imagePath")
	//delete image from firebase storage
	ctx := context.Background()
	err := route.storage.Bucket("futurego-29b1b.appspot.com").Object(imagePath).Delete(ctx)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with message success
	c.JSON(200, gin.H{"message": "success"})
}