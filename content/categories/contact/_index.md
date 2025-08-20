---
title: "Contact"
date: 2024-01-01T00:00:00+01:00 # Możesz tu zostawić swoją oryginalną datę
draft: false
_build:
  render: true
  list: false
---

<!-- Poniżej jest formularz, który zostaje bez zmian -->

<form
  action="https://formspree.io/f/movlokoq"
  method="POST"
  class="measure center"
>
  <fieldset class="ba b--transparent ph0 mh0">
    <div class="mt3">
      <label class="db fw6 lh-copy f6" for="email-address">
        Your email address:
      </label>
      <input
        class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email"
        name="email"
        id="email-address"
      />
    </div>
    <div class="mv3">
      <label class="db fw6 lh-copy f6" for="message">Your message:</label>
      <textarea
        class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        name="message"
        id="message"
        rows="5"
      ></textarea>
    </div>
  </fieldset>
  <div>
    <button
      class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      type="submit"
    >
      Send
    </button>
  </div>
</form>