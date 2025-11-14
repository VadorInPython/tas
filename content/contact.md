---
title: "Zapraszam do kontaktu!"
draft: false
_build:
  render: true
  list: false
---

<form name="contact" method="POST" data-netlify="true">
  <!-- hidden field required by Netlify -->
  <input type="hidden" name="form-name" value="contact" />

  <p>
    <label>Twój Email: <input type="email" name="email" required /></label>
  </p>
  <p>
    <label>Twoja wiadomość: <textarea name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Wyślij</button>
  </p>
</form>
