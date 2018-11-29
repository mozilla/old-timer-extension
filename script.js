# SCRIPT

## manifest.json

```json
{
  "manifest_version": 2,
  "name": "Oldtimer",
  "version": "1.0.0",

  "content_scripts": [
    {
      "matches": [ "<all_urls>" ],
      "js": [ "/content_script.js" ]
    }
  ],

  "browser_action": {
    "browser_style": true,
    "default_icon": {
      "48": "/palette.svg"
    },
    "default_title": "Oldtimer",
    "default_popup": "/popup.html"
  },

  "permissions": [ "storage" ]
}
```

## popup.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <style>
      body {
        padding: 1.5em;
      }
      input {
        margin-left: 1em;
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <label>
      Sepia Level
      <input width="100" type="range" min="0" max="100" value="100">
    </label>
    <script src="/popup.js"></script>
  </body>
</html>
```

## popup.js

```js
let input = document.querySelector('input');

async function init() {
  let { value } = await browser.storage.local.get('value');
  if (!value) {
    value = 0;
  }
  setValue(value);
}

async function setValue(value) {
  if (input.value != value) {
    input.value = value;
  }
  await browser.storage.local.set({ value });
}

input.addEventListener('change', e => setValue(e.target.value));

init().catch(e => console.error(e));
```

## content_script.js

```js
let style = document.createElement('style');
document.body.appendChild(style);

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'value' in changes) {
    update(changes.value.newValue)
  }
});

function update(value) {
  style.innerText = `html { filter: sepia(${value}%) !important; }`;
}

browser.storage.local.get('value')
  .then(result => update(result.value));
```
