# Clip It!
Clip It is a video sharing platform loosely inspired by[Twitch](https://twitch.tv) and [Reddit](https://www.reddit.com/). It mimicks the post sharing features of Reddit while sharing some styling of both Reddit and Twitch

## Live site

https://clipit-june-21.herokuapp.com/

## Technologies used

- ### Frontend
  - HTML, CSS, Javascript, React, Redux
- ### Backend
  - Flask, SQLAlchemy, Python, PostgreSQL

## Screenshots

### Splash Page
![image](https://user-images.githubusercontent.com/76127850/139607174-199eac29-2e90-4d1c-9dd6-a9577f32abe5.png)

### Sign Up Page

![image](https://user-images.githubusercontent.com/76127850/139607198-9eb73436-9f71-42ad-9229-50fd4b6a5705.png)

### Home Page

![image](https://user-images.githubusercontent.com/76127850/139607240-3c7fb79e-2ad7-4cec-b526-ac60f1af6725.png)

## Features

Users are able to upload their favorite gaming clips and share them with everyone else. Users can also leave comments on any of the videos of their choosing. Users are also able to only edit/delete their own video/comment.

## Challenges

- Understanding the workflow
   -Clip It is my third ever project working with redux, and my second project working with flask. Understanding the react-redux flow from front end to backend and back to front end is still challenging to me. I found it difficult to understand how the store's action, thunk, and reducer work together. Also I had some problems with mounted and unmounted components giving me errors
   
- CSS
   - CSS has always been very challenging to me, especially when it comes to positioning. Heroku is also inconsistent on displaying items differently from development and production. On local host, everything looks fine, but on Heroku, everything is smaller, and there are subtle changes on positioning. Also my design sense is extremely bad

```JS
   let featured
    if(videos?.videos?.length > 0) {
        featured = videos?.videos?.reduce((prev, current) => {
            return (prev.likes_count > current.likes_count) ? prev : current
        })
    }
```
