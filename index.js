const R = require("ramda");

// Our data
const user = {
  id: 1,
  name: "foo",
  company: {
    id: 12,
    name: "bar",
    address: {
      street: "randomstreet",
    },
  },
  comments: [
    { id: 2, text: "yes, this could work.", to: { id: 4 } },
    { id: 3, text: "not sure.", to: { id: 12 } },
    { id: 4, text: "well, maybe", to: { id: 4 } },
  ],
};

console.log(">>>> Example 1");
// Setting a lens for the Id
const idLens = R.lensProp("id");

// Now it is possible to view the content of this prop with...
console.log(R.view(idLens, user));

// And to set a new value to this prop (actualy creates a copy, it does
// not mutate the original)...
console.log(R.set(idLens, 2, user));

console.log("\n>>>> Example 2");

// A new lens now inside with nested props
const userCoStrLens = R.lensPath(["company", "address", "street"]);

// Showing the value
console.log(R.view(userCoStrLens, user));

// Updating the value
console.log(R.set(userCoStrLens, "Foobarstreet", user));

console.log("\n>>>> Example 3");

// A lens to nested props with an array
const firstCommentLensId = R.lensPath(["comments", 0, "id"]);
console.log(R.view(firstCommentLensId, user));

// Updating the value
console.log(R.set(firstCommentLensId, 12, user));

console.log("\n>>>> Example 4");

// If we want to apply a function we should use "over"
const firstCommentTextLens = R.lensPath(["comments", 0, "text"]);
console.log(R.over(firstCommentTextLens, R.toUpper, user));

console.log("\n>>>> Example 5");

// We can even use "compose"!
const companyLens = R.lensProp("company");
const addressLens = R.lensProp("address");
const streetLens = R.lensProp("street");
const addressStreetLens = R.compose(companyLens, addressLens, streetLens);
console.log(R.view(addressStreetLens, user));

console.log("\n>>>> Example 6");

// Or compose like this
const commentLens = R.lensProp("comments");
const firstIndexLens = R.lensIndex(0);
const idLens2 = R.lensProp("id");
const composedLens = R.compose(commentLens, firstIndexLens, idLens2);
console.log(R.view(composedLens, user));

console.log("\n>>>> Example7");
const textLens = R.lensProp("text");
console.log(R.over(commentLens, R.map(R.over(textLens, R.toUpper)), user));
