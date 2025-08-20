---
title: "Contact Me"
description: "Get in touch with us through this form."
date: 2025-08-20T15:42:03+02:00
draft: false
menu: "main"
_build:
  list: 'never'
---

Have a question or want to work together? Fill out the form below, and I'll get back to you as soon as possible.

<form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  
  <p hidden>
    <label>
      Don’t fill this out if you’re human: <input name="bot-field" />
    </label>
  </p>

  <p class="mb3">
    <label class="db" for="name">Your Name:</label>
    <input class="w-100 pa2 ba" type="text" name="name" id="name" required />
  </p>
  <p class="mb3">
    <label class="db" for="email">Your Email:</label>
    <input class="w-100 pa2 ba" type="email" name="email" id="email" required />
  </p>
  <p class="mb3">
    <label class="db" for="message">Message:</label>
    <textarea class="w-100 pa2 ba" name="message" id="message" rows="5" required></textarea>
  </p>
  <p>
    <button class="pa2 bn bg-dark-gray white" type="submit">Send</button>
  </p>
</form>