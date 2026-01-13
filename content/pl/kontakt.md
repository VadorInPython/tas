---
title: "Zapraszam do kontaktu!"
draft: false
_build:
  render: true
  list: false
---

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <!-- hidden field required by Netlify -->
  <input type="hidden" name="form-name" value="contact" />

  <p>
    <label>Twój email: <input type="email" name="email" required style="width:100%; padding:8px;"/></label>
  </p>



  <p>
    <label>Wiadomość:
      <textarea name="message" required style="width:100%; padding:8px; height:120px;"></textarea>
    </label>
  </p>

  <p>
    <button type="submit" style="padding:10px 20px; cursor:pointer;">Wyślij</button>
  </p>
</form>
