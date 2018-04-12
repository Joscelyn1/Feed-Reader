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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });

        it('have names', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('the menu', function() {

       const body = document.querySelector('body');

       it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

       it('changes visibility when clicked', function() {
            var menuIcon = document.querySelector(".menu-icon-link");
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('initial entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
          });

        it('have at least one entry', function(done) {
            const listOfEntries = document.querySelectorAll('.feed .entry');
            expect(listOfEntries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('new feed selection', function() {

        beforeEach(function() {
            loadFeed(0, function(done) {
                entryItems1 = document.querySelector('.entry').innerHTML;

                loadFeed(1, function(done) {
                    done();
                })
            });
        });

        it('updates the feed', function(done) {
            entryItems2 = document.querySelector('.entry').innerHTML;
            expect(entryItems1 === entryItems2).toBe(false);
            done();
        });
    });



}());
