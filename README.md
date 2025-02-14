#  Remote App

This is the remote application for the wall project. It is designed to be used as a microfrontend and can be consumed by a host application using Webpack Module Federation.

## Prerequisites

-   Node.js (>= 20.x)
-   pnpm (>= 9.x)

## Running the Application in docker

```
## Running the Application
docker-compose up -d --build

visit: http://localhost:5000/campaign/new


## ui-issues-after-Fix

```

This is a demo project to show common UI issues which we will be checking in real projects.

## Feedback on Campaign
```
1. Crash on country field when all the selectable is empty.

2. Add asterisk (*) -> red marked on the mandatory fields.

3. Placeholder text needs to be more professional.

4. Country name should be in ascending order.

5. Amount fields needs to have frontend validation.

6. Text field needs to have frontend validation as well.

7. Negative amount should not be accepted in number field eg "Bid" and "Lifetime Budget".

8. Need to change the error message on violating mandatory fields.

9. Need Confirmation message on "save changes" [Fixed]

10. Alignment issue on the form (expected to be left aligned)

11. Using keyboard arrow, currently not possible to select "country" field.

12. Field validation Error is causing the whole form to shift down.

13. "No results found" window in "country" field blocking "Headline" input field. use tab to go from country to headline.

14. "save changes" button should clear the form after submission.
    
15. After form clears on "save changes" button, focus/cursor should be on Account to allow continuous fillup. 


checked responsiveness

and checked navigation

and checked with accessibility point of view

and finally security 

and performance point of view.

Overall looks clean and we need to further check after integrating with the whole project.

```
