---
title: "Feel free to reach out!"
draft: false
---

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <!-- hidden field required by Netlify -->
  <input type="hidden" name="form-name" value="contact" />

  <p>
    <label>Your email: <input type="email" name="email" required style="width:100%; padding:8px;"/></label>
  </p>



  <p>
    <label>Message:
      <textarea name="message" required style="width:100%; padding:8px; height:120px;"></textarea>
    </label>
  </p>

  <p>
    <button type="submit" style="padding:10px 20px; cursor:pointer;">Send</button>
  </p>
</form>
