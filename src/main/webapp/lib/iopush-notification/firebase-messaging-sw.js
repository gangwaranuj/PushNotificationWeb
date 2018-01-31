 importScripts('https://www.gstatic.com/firebasejs/3.6.4/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.6.4/firebase-messaging.js');
 
firebase.initializeApp({
  'messagingSenderId': '103953800507'
});

const messaging = firebase.messaging();

self.addEventListener('install', function(event) {
 console.log('Installed', event);
});

self.addEventListener('activate', function(event){
    console.log('activated ',event);
});
self.addEventListener('notificationclick', function(event) {
  
  var type = event.notification.data.url.type;
 var click_url;
    if(type == 3)
	  {
	  var rssName = event.notification.data.url.rssName;
	  var date = event.notification.data.url.date;
	  click_url =  event.notification.data.url.rssUrl;
	  
		  var url  = 'https://dev.iopushtech.com/iopush/rest/externalapi/rssanalytics/'+rssName+'/'+date;
		event.waitUntil(
				fetch(url).then(function(response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ',response.status);
						// Throw an error so the promise is rejected and catch() is executed
						throw new Error();
					}
					else{
						console.log('Successful!!!');
					}
				}).catch(function(err) {
					console.error('Unable to retrieve data', err);

					var title = 'An error occured';
					var message = 'We were unable to get the information for this ' +
					'push message';

				
				})  );
	  }
else if(type == 2)
{
	click_url = event.notification.data.url.url;
  var campaign_id = event.notification.data.url.campaign_id;
  var geo_id = event.notification.data.url.geo_id;
		var campaign_id = event.notification.data.url.campaign_id;
		var type = event.notification.data.url.type;
		var platform_id = event.notification.data.url.platform_id;
		var city_id = event.notification.data.url.city_id;
		var product_id= event.notification.data.url.product_id;
	var url = 'https://dev.iopushtech.com/iopush/rest/externalapi/campaignanalytics/'+campaign_id+'/'+1+'/'+geo_id+'/'+platform_id+'/'+city_id+'/'+product_id;
	event.waitUntil(
    fetch(url).then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ',response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }
	  else{
		  console.log('Successful!!!');
	  }
		}).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';

      
    })  );
}
else{
click_url = event.notification.data.url.url;
}
console.log(click_url);
 clients.openWindow(click_url);
    event.notification.close();	
});

self.addEventListener('push', function(event) {
var payload = event.data ? event.data.text() : 'no payload';
payload=JSON.parse(payload);
console.log(payload);
  var title = payload.data.title;
  var body = payload.data.status;
  var icon = payload.data.icon;
  var tag = payload.data.tag;
  var data ;
if(payload.data.type == 3)
{
	data = {
    url: {
       rssName: payload.data.name,
	   rssUrl:payload.data.url,
		date: payload.data.date,
		type:payload.data.type
    }
  };
}
else if(payload.data.type == 2) {  data = {
    url: {
        url:payload.data.url,
		geo_id:payload.data.geo_id,
		campaign_id:payload.data.campaign_id,
		type:payload.data.type,
		platform_id : payload.data.platform_id,
		city_id : payload.data.city_id,
		product_id:payload.data.product_id
    }
  };
  var url  = 'https://dev.iopushtech.com/iopush/rest/externalapi/campaignanalytics/'+payload.data.campaign_id+'/'+payload.data.type+'/'+payload.data.geo_id+'/'+payload.data.platform_id+'/'+payload.data.city_id+'/'+payload.data.product_id;
	event.waitUntil(
			fetch(url).then(function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ',response.status);
					// Throw an error so the promise is rejected and catch() is executed
					throw new Error();
				}
				else{
					console.log('Successful!!!');
				}
			}).catch(function(err) {
				console.error('Unable to retrieve data', err);

				var title = 'An error occured';
				var message = 'We were unable to get the information for this ' +
				'push message';

			
			})  );

}
else{
	data = {
    url: {
        url:payload.data.url,
		type:1
              
    }
  };
}

//campaignanalytics/{campaign_id}/{type}/{geo_id}/{platform_id}/{city_id}
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: data
    })
  );
});

