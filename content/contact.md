---
title: "Skontaktuj się ze mną!"
draft: false
_build:
  render: true
  list: false
---

<!-- Formularz Netlify w języku polskim -->
<form name="kontakt" method="POST" data-netlify="true" class="measure center">
  <input type="hidden" name="form-name" value="kontakt" />

  <fieldset class="ba b--transparent ph0 mh0">
    <div class="mt3">
      <label class="db fw6 lh-copy f6" for="email-address">
        Twój email:
      </label>
      <input
        class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email"
        name="email"
        id="email-address"
        required
      />
    </div>

    <div class="mv3">
      <label class="db fw6 lh-copy f6" for="message">
        Twoja wiadomość:
      </label>
      <textarea
        class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        name="message"
        id="message"
        rows="5"
        required
      ></textarea>
    </div>
  </fieldset>

  <div>
    <button
      class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      type="submit"
    >
      Wyślij
    </button>
  </div>
</form>
