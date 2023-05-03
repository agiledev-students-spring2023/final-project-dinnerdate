# Dinner Date
Dinner Date is a social networking app that provides a platform for users to find others to dine with.

[Deployment Link](https://dinnerdate-vvwz2.ondigitalocean.app/login)

## Team Members
[Andrew Huang](https://github.com/andrew0022), [Claire Guo](https://github.com/clairekguo), [Frank Weng](https://github.com/wengf2086), [Jeffrey Chen](https://github.com/FrozenEclipse), [Victoria Carroll](https://github.com/victoriacarroll323) 

## Product Vision Statement
With Dinner Date, users will need to register with an account. Once logged in, they will gain access to all the resturants and invitations in their geographic area. A map will display pins marking resturants that the user can click on to view exisitng invitations along with the creators' profiles and rating. The user has the option of accepting the invitation of another user or to post one of their own by filling out a form with time and description information. If the user has an active post, they will be able to view a list of other users that have accepted their invitation. The original creator of the post can either "accept" or "decline" each user. Once a date is set, the two parties will be able to engage in conversation over our app with our chat feature. The details of the date can also be edited or cancelled by either user. Following the scheduled time of the date, both users will be prompted to rate the other on a scale of 1-5 stars based on punctuality, behavior, etc. Users will also be allowed access to their chat history and to edit their own profile settings.

Our product is targeted towards adults looking to try new resturants while meeting new people with a simialr interest. Given the nature of our product, it is expected to have a larger presence in metropolitan areas. 

The ultimate goal of Dinner Date is to provide a safe, reliable space for food loving adults to quickly connect with others looking to try the same restruant. 

## History
New York City arguably has the most prominent food scene in the wrold. The city is home to hundreds of unique resturants. However, while there is an endless number of places to try, it can prove difficult finding people to share the experiences with. With the current market flooded with various social networking and dating apps, it can be time consuming and cumbersome to find a stranger just to eat with. What are the chances of finding a post on Twitter looking for someone to go to dinner with? Pretty low. And planning a date with a Tinder match? That could take weeks. That's when we came up with Dinner Date. We wanted an easy and efficient way to quickly find other individuals near you who share the intention of looking for someone to dine with. With Dinner Date, we envision a future where no one will ever miss out on the opportunity of trying a new resturnat in fear of eating alone. 

## Contribution
If you are interesting in contributing, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## Building & Testing 
To build and test this project, follow these instructions:
1. Go to /back-end
2. Create an `.env` file with the following line:
GOOGLE_MAPS_API_KEY=AIzaSyB8VORRZ3mEDvFhU8z9cxkZM4Bqautc85s
3. Run `npm install --force`
4. Run `nodemon`
5. Open a new terminal and go to /front-end
6. Create an `.env` file with the following line:
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyB8VORRZ3mEDvFhU8z9cxkZM4Bqautc85s
7. Run `npm install --force`
8. Run `npm start`

Notes: 
- Sometimes we reach the rate limit for the Mockaroo API. When this happens, we serve static data instead.
- It may a take a while for data on `/restaurant-info` and `/home-lfd` to load. Please give it some time.
- It is impossible to generate a random placeId for a random restaurant, so we've used static data for sample restaurant info. 