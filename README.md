## Booru-Getter
###A Node.js module for retrieving search information or image urls from Safebooru and Gelbooru

###Usage

####Safebooru

Searching by tags

```
const getter = require('booru-getter')

getter.get(1, 0, "brown_hair+-red*", (xml) =>{
	//work with XML here.
}

getter.getRandom("brown_hair+red_shirt+-dress*", (url)=>{
	//do something with URL here
}
```

