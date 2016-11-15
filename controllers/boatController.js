var boat = require('../models/boatModel');
var config = require('../config.js');
var s3 = require('s3');

//initial config
var s3Client = s3.createClient ({
	s3Options : {
		accessKeyId : config.AWS_KEY,
		secretAccessKey : "kCUSfDcq7rhqQugyfVctTOIGBusV40dsxwQt3ig1"
	}
})

function create (req, res) {

	console.log("Got boat!");

	var body = req.body.data;
	var file = req.files.files;

	var filePath = 'socalboat/' + (new Date()).getTime() + file.name // This is WHERE in your s3 bucket, the file will be stored

	// Initiate the upload
    var uploader = s3Client.uploadFile({
        localFile : file.path,
        s3Params :{
            Bucket : 'socalboat', // "droplet" / container for s3 storage
            Key : filePath, // filepath on the bucket where the image will live
            ACL : 'public-read', // Access control
        }
    });

    uploader.on('progress', function(){
        console.log("progress", uploader.progressAmount, uploader.progressTotal, ((uploader.progressAmount / uploader.progressTotal) * 100) + '%')
    });

	uploader.on('error', function(err) {
  		console.error("unable to upload:", err.stack);
	});
    
    uploader.on('end', function(){
        // Where all the interesting stuff will happen
        var url = s3.getPublicUrlHttp('socalboat', filePath) //Takes Bucket name and filepath IN the bucket
        console.log('URL', url)

        body.image = url;
        var newBoat = new boat(body);
    
        newBoat.save(function(err, doc){
            if(err) {
            	res.send(err);
            } else {
            	res.send(doc)
        	}
        })
    })
}

function get (req, res) {
	if(req.params.id) {
		boat.findOne({_id : req.params.id}, function(err, document) {

			if(err) {
				return res.send(err);
			}
			if(!document){
				return res.send("Can't find this boat")
			}
			res.send(document);
		});
	}
	else {
		boat.find({}, function(err, documents) {
			if(err) {
				return res.send(err);
			}
			res.send(documents);
		});
	}
}

module.exports = {
	create 	: create,
	get 	: get,
}