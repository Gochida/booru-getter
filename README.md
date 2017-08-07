# Booru-Getter
### A Node.js module for retrieving search information or image urls from Safebooru and Gelbooru

### Usage

##### Safebooru
[A worksafe booru.](https://safebooru.org/) 

```js
const getter = require('booru-getter')

//Searching by tags
getter.get(1, 0, "brown_hair+-red*", (xml) =>{
	//work with XML here.
}

//Retrieving a random image with matching tags
getter.getRandom("blue_hair+red_shirt+-dress*", (err, url)=>{
   
   if(err){
        //handle error
    }
    
	//do something with URL here
}
```

#### Gelbooru
[A booru that contains NSFW images.](http://gelbooru.com/)

```js
//Searching by tags
getter.getLewd(1, 0, "brown_hair+-red*", (xml) =>{
	//work with XML here.
}

//Retrieving a random image with matching tags
getter.getRandomLewd("blue_hair+red_shirt+-dress*", (err,url)=>{

    if(err){
        //handle error
    }
    
	//do something with URL here
}
```
