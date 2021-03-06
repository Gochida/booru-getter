"use strict";

const rp = require("request")
const sa = require("superagent");
const parseString = require('xml2js').parseString;

exports.get = function(limit, pid, tags, callback){
	var results;
	var url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&limit=${limit}&pid=${pid}&tags=${tags}`;
	console.log("Sending POST:",url);
	sa.post(url).end(function(err, res){
		if(err)
			console.log(err);
		callback(res);
	});

};

/**
Gets xml formated response from Gelbooru. 
Tags passed in should be formated with +'s in place of whitespace. White space in tag strings will not work!
*/
exports.getLewd = function(limit, pid, tags, callback){
	var results;
	// var url = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&limit='+limit+'&pid='+pid+'&tags='+tags;
	var url = `http://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=${limit}&pid=${pid}&tags=${tags}`;
	console.log("Sending POST:",url);
	sa.post(url).end(function(err, res){
		if(err)
			console.log(err);
		callback(res);
	});

};

/**
Gets a random image from Safebooru. 
Tags passed in should be formated with +'s in place of whitespace. White space in tag strings will not work!
*/
exports.getRandom = function(tags, callback){
	let randomPage = exports.get(1, 0, tags, function(data){
		let cleanedString = data.text.replace("\ufeff", ""); //remove text fuckery
		parseString(cleanedString, function(err, result) {
			if(err){
				console.log("Error", err);
			}
			else {
				let randomPid = Math.floor(Math.random() * result.posts.$.count);
			
				let data = exports.get(1, randomPid, tags, function(data){
					let cleanedString = data.text.replace("\ufeff", "");
					parseString(cleanedString, function(err, result) {
						if(err)
							console.log("Error", err);
						else {
							console.log(result.posts);
                            try{
                                var output = result.posts.post[0].$.file_url;//.replace("//","");
							callback(undefined,"http:"+output);	
							// callback("http://"+output);	
                            }catch(err){
                                callback(err,undefined)
                            }
						}
					});
				});		
			}
		});
	})
};

/**
Gets a random image from Gelbooru. 
Tags passed in should be formated with +'s in place of whitespace. White space in tag strings will not work!
*/
exports.getRandomLewd = function(tags, callback)
{
	let randomPage = exports.getLewd(1, 0, tags, function(data){
		let cleanedString = data.text.replace("\ufeff", ""); //remove text fuckery
		parseString(cleanedString, function(err, result) {
			if(err){
				console.log("Error", err);
			}
			else {
				let randomPid = Math.floor(Math.random() * result.posts.$.count);
			
				let data = exports.getLewd(1, randomPid, tags, function(data){
					let cleanedString = data.text.replace("\ufeff", "");
					parseString(cleanedString, function(err, result) {
						if(err)
							console.log("Error", err);
						else {
							console.log(result.posts);
                             try{
                                
							var output = result.posts.post[0].$.file_url;//.replace("//","");
							// callback("http://"+output);	
							callback(undefined,output);//.replace("http:", "http://"));	
                                }catch(err){
                                    callback(err,undefined)
                                }
						}
					});
				});		
			}
		});
	})
};