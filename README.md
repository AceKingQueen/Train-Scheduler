# Train-Tracker
This is a train schedule application that incorporates Firebase to host arrival and departure data.

As the user enters train info into the form and submits using the button, the entered info is saved in a Firebase database and then sent back to display on the page. [Firebase](https://firebase.google.com/) is a great tool for getting an app up and running quickly.

I also utilized [Moment](https://momentjs.com/) for the first time while building this app. I naively assumed writing code for working with time would be straightforward. It is not. [This video](https://www.youtube.com/watch?v=-5wpm-gesOY) walks through this coding complexity and will convince you to explore tools like Moment.

Oddly, _my biggest problem_ with building this website was that it worked sooner than I expected it to. I kept testing the code I had written for the next arrival column and thought there were errors in my logic, even though when I looked through the code, I thought I had it right.  

Eventually I realized it wasn't my code that was wrong, it was how I was testing it. I needed to input trains that were coming more frequently to see the change happen. Lesson learned. 

[See my Train Tracker here](https://acekingqueen.github.io/Train-Tracker/)
