let valueEl = document.querySelector('.value');

async function init() {
  let { value } = await browser.storage.local.get(['value']);
  if (!value) {
    value = 0;
  }
  setValue(value);
}

async function setValue(value) {
  await browser.storage.local.set({ value });
  valueEl.value = value;
}

valueEl.addEventListener('change', e => setValue(e.target.value));

init().catch(e => console.error(e));
