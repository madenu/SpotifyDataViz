# cs5610project2

## TODO
### Part I
* ~~Take protections off master branch~~
* Convert to a SPA
* Move the login button (display where nav bar would be)
* Look at API and decide how to plot "album mood over time"
  * figure out track mood
  * each track is a data point (create a stem plot)
* Plot a sample album mood
* Merge changes into master

### Part II
* Get / merge in work for radar-spider-chart`
* Do we want to use the database to store auth tokens?   
  * Should they be present if the server is restarted?
  * How long do they / should they last?

### Part III
* TBD

## Requirements Checklist
* Phoenix Elixir for non-trivial server-side logic
  * This will be met just by doing the project
* Use external API (Spotify)
* Use Postgres database (auth tokens or site log info)
* Use a channel (i.e. a websocket) to pass data to/from server
* Use React-Router to create a SPA
* Use React to render the app
* (Use Redux to control app state)
* Use something not covered this semester (D3.js)
* Deploy to VPS with HTTPS
* Create a 2000-word report

I don't think we'll need to use the API part of our router. We won't be making AJAX requests to GET/POST stuff from/to our database. It looks like, we can use a websocket to have the sever and client communicate. We should still be able to create a single-page-application.

## Spotify Data Viz Site
Idea Submission

Our project idea is to build a single-page web app that displays visualized trends from a users Spotify data over time.  For example, a user could see a visual chart of attributes from individual songs pulled from their 50 most recently-played songs. This chart will display attributes such as the “danceability” and “energy” intensity of the song. The user will be able to choose which song is displayed from a dropdown.

We can also apply this idea to an entire album and have a visual representation of how an album’s attributes shift over time.  Different attributes include the “energy”, “danceability”, “instrumentalness”, “speechiness” (frequency of spoken words), etc.
We will be using the Spotify Web API, which allows us to access user-related data such as playlists and track history, in addition to artist, album, and track metadeta from the Spotify catalogue.  We will use OAuth, specifically the OAuth 2.0 specification, for client authorization and our visualizations will be created using components from the D3.js JavaScript library.

The database will store information related to user requests, such as frequency of logins and which visual components users are using more often.  We think this is very useful information, especially if we were to continue development of the app.

We plan to build the UI by dividing the work among members of the team. The current plan is to have two data visualizations. Two members will work on the first, and the remaining two will work on the second. The user will be presented with a landing page where they can choose which visualization to navigate to. A general mockup is shown below using ASCII art.

```
******************************************************
*         NAVIGATION BAR AND USER LOGIN              *
******************************************************
*                                                    *
*    ********************     *******************    *  
*    *                  *     *                 *    *
*    * CLICK TO SEE     *     * CLICK TO SEE    *    *
*    * VISUALIZATION    *     * VISUALIZATION   *    *
*    * NUMBER ONE       *     * NUMBER TWO      *    *
*    *                  *     *                 *    *
*    ********************     *******************    *
*                                                    *     
******************************************************
```
