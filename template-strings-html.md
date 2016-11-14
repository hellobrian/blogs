# Using Template Strings with HTML

I've been used to using an assortment of JavaScript stuff for creating HTML and manipulating DOM. Things like `createElement()` and `classList()`: 

```js
const p = document.createElement('p');
p.classList.add('text');
p.textContent('this is text');
const targetContainer = document.querySelector('.container');
container.appendChild(p);

// resulting HTML Document looks like...
// <div>
// 	<p class="text">this is text</p>
// </div>
```

But like a lot of other people these days, I've been using React and so far it's been great! It's been really nice to write my HTML and manipulate its content and attributes in the same place. It's very WYSIWYG.

This is a lot more readable.

```jsx
...

render() {
	const p = '<div><p className="text">this is text</p></div>'
 	return p;
}
```

But I don't work in React all the time. 
I've got some projects that are using ES2015.

To my surprise...we can use Template Strings to do the same thing and it's still going to result in valid HTML.

```js
const data = {
  className: 'text',
  name: 'Brian',
  occupation: 'front-end developer',
};

const btn = document.querySelector('#btn');
const container = document.querySelector('.container');

const HTMLString = `<p class=${data.className}>Hello! my name is ${data.name}. I'm a ${data.occupation}</p>`

btn.addEventListener('click', (evt) => {
  container.insertAdjacentHTML('afterbegin', HTMLString);
  console.log(container);
});


```

<p data-height="265" data-theme-id="0" data-slug-hash="Vmjbde" data-default-tab="js,result" data-user="brianhan" data-embed-version="2" data-pen-title="Alternative to appendChild" class="codepen">See the Pen <a href="http://codepen.io/brianhan/pen/Vmjbde/">Alternative to appendChild</a> by Brian Han (<a href="http://codepen.io/brianhan">@brianhan</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>




