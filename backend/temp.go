package main

import (
	"futuremap/routes"
	"context"
	"fmt"
	"io"
	"log"
	"net/http"

	firebase "firebase.google.com/go"

	"cloud.google.com/go/firestore"
	cloud "cloud.google.com/go/storage"
	"github.com/joho/godotenv"
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
func main() {
	godotenv.Load()
	r := routes.SetupRoutes()
	app := &App{}
	app.Init()
	//run server uploadimage
	http.HandleFunc("/uploadimage", app.UploadImage)
	http.HandleFunc("/getimageurl/{imageName}", GetImageUrl)
	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)

}
func (r *App) Init(){
	r.ctx = context.Background()
	sa := option.WithCredentialsFile("futurego.json")
	app, err := firebase.NewApp(r.ctx, nil, sa)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	r.client, err = app.Firestore(r.ctx)
	if err != nil {
		log.Fatalf("error initializing firestore: %v\n", err)
	}
	r.storage, err = cloud.NewClient(r.ctx, option.WithCredentialsFile("futurego.json"))
	if err != nil {
		log.Fatalf("error initializing storage: %v\n", err)
	}
}
func (route *App) UploadImage(w http.ResponseWriter, r *http.Request) {
	file, handler, err := r.FormFile("image")
	r.ParseMultipartForm(10 << 20)
	if err != nil {
		// respondWithJSON undefined
		fmt.Println(err)
		return
	}
	defer file.Close()

	imagePath := handler.Filename

	bucket := "futurego-29b1b.appspot.com"
	wc := route.storage.Bucket(bucket).Object(imagePath).NewWriter(route.ctx)
	_, err = io.Copy(wc, file)
	if err != nil {
		fmt.Println(err)
		return

	}
	if err := wc.Close(); err != nil {
		fmt.Println(err)
		return
	}

	err = CreateImageUrl(imagePath, bucket, route.ctx, route.client)
	if err != nil {
		fmt.Println(err)
		return
	}
	// respondWithJSON
	//print url image
	url := "https://storage.cloud.google.com/" + bucket + "/" + imagePath
	fmt.Fprintf(w, "Successfully uploaded", url)
}
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
func GetImageUrl(w http.ResponseWriter, r *http.Request) {
	imageName := r.URL.Query().Get("imageName")
	fmt.Fprintf(w, "https://firebasestorage.googleapis.com/v0/b/futurego-29b1b.appspot.com/o/"+imageName+"?alt=media")
}