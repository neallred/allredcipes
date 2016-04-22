make recipes route
recipes?filter=apple


recipes?author=xxx




egghead.io redux,
30 videos


edit button:
display none rather than visibility hidden.



visibility hidden.




react
don't query elements 
evy once in awhile.
pass in a propr or a state

collapsed: true;, and reset to false


dumb component recipe display infor, do callbacks.


use arrow functions, you know its referencing sthe react component class


redner display the smart component, and recipe is dumb




callbacks
pass in function
when clicked, call this function

so recipedisplay as main smart.
that, or bubble it up to Apps
list as main, even though two more above
bubbling up two mor etimes, not a lot of benefit


pulling info off the DOM,
  harder to reason about
have recipe, click on edit recipe, go into the recipe component and see where clicking on edit.

as many stateless as possible



isSelected()
  for the class of hide/select

what othe rfunctions were created?

recipe display has them.

arrow functions

(e) => 
...



just do pagination if it starts getting too big















Structure for this app.
Should still use local storage for own recipes.
should use fixtures for other recipes.
should have contributor for each recipe



No. Go bigger.
Have a big pot of recipes and no local storage -> use redux for storing state
have contributors.
have a filter by whichever characteristics you desire
  name, instructions, ingredients, contributor




20160421
do not use localStorage at all
just one ginormous file?
  it wouldn't be too ginormous
