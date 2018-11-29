let styleEl = document.createElement('style');
document.body.appendChild(styleEl);

browser.storage.onChanged.addListener(function (changes, area) {
  if (area === 'local' && 'value' in changes) {
    update(changes.value.newValue)
  }
});

function update(value) {
  styleEl.innerText = `html { filter: sepia(${value}%) !important; }`;
}

browser.storage.local.get(['value']).then(result => update(result.value));
