/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined(); //expects allFeeds to not be undefined
            expect(allFeeds.length).not.toBe(0); //expects its length to not be 0
        });

        it('have URLs', function() {
            for (let i = 0; i < allFeeds.length; i++) { // loops through the allFeeds array
                expect(allFeeds[i].url).toBeDefined(); // makes sure each element's url property is defined
                expect(allFeeds[i].url).not.toBe(''); // makes sure each element's url property is not an empty string
            }
        });

        it('have names', function() {
            for (let i = 0; i < allFeeds.length; i++) { // loops through the allFeeds array
                expect(allFeeds[i].name).toBeDefined(); // makes sure each element's name property is defined
                expect(allFeeds[i].name).not.toBe(''); // makes sure each element's name property is not an empty string
            }
        });
    });

    describe('the menu', function() {

       const body = document.querySelector('body');

       it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true); //expect the body to have the "menu-hidden" class
        });

       it('changes visibility when clicked', function() {
            var menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click(); // clicks the menu icon
            expect(body.classList.contains('menu-hidden')).toBe(false); // expects the menu to be visible
            menuIcon.click(); // clicks hte menu icon
            expect(body.classList.contains('menu-hidden')).toBe(true); // expects the menu to be hidden
        });
    });

    describe('initial entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
          });

        it('have at least one entry', function(done) {
            const listOfEntries = document.querySelectorAll('.feed .entry');
            expect(listOfEntries.length).toBeGreaterThan(0); // expects there to be at least 1 entry class
            done();
        });
    });

    describe('new feed selection', function() {

        beforeEach(function() {
            loadFeed(0, function(done) {
                entryItems1 = document.querySelector('.entry').innerHTML; //after the feed is loaded at index 0, saves the html

                loadFeed(1, function(done) { // loads the feed at index 1
                    done();
                })
            });
        });

        it('updates the feed', function(done) {
            entryItems2 = document.querySelector('.entry').innerHTML; // after the feed is loaded at index 1, saves the html
            expect(entryItems1 === entryItems2).toBe(false); // compares entryItems1 and entryItems2, expects them to be different
            done();
        });
    });



}());
