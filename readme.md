# Zipscene Programming Test

## Facebook API Demo

This is a programming test given to people applying for a job at Zipscene, LLC (http://www.zipscene.com/). The test took me approximately 7 hours to complete. It initially ran on a nodejitsu server, but now runs on an AWS EC2instance.

http://fbtest.wheresshermansbus.com

As far as I know, Zipscene no longer uses this test for filtering applicants.

## Open Source

This project is now an open source demo. The only changes I made to the project are removing the config file containing the Facebook secret, and setting it up to run on a new server.

The config.js file is not in git. Instead there is a config.example.js which can be copied and modified to add the appropriate secret.

## Instructions From Zipscene

### Facebook User App

#### Purpose: 
Create a web page that displays a Facebook user’s name and profile image


#### Components:
* Node.js server using the Express framework
* Browser side Facebook JavaScript SDK plus any additional libraries you would like to use

#### Requirements:
* Allow a Facebook user to login to a web page using Facebook Connect, use the client side JavaScript SDK not one of the server side SDKs for this step
* Send the authorization token to the Node.js server using an AJAX request
* Utilizing the authorization token and Facebook graph API return the user’s name and profile image url to the browser
* Display the user’s name and profile image on the page
* Allow logout

#### Deliverables:
* Full source code
* Application hosted on a server for testing

## Contact

Sherman Adelson
sherman.adelson@gmail.com
513-218-8048

