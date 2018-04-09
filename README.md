# cs5610project2
Spotify Data Viz Site

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
test
